export type BpmStatus = 'idle' | 'settling' | 'steady'

interface Bpm {
  beatCount: Ref<number>
  bpm: Ref<number>
  /** The reading from the session an idle pause just ended; 0 when there is none. */
  previousBpm: Ref<number>
  status: ComputedRef<BpmStatus>
  elapsedFormatted: ComputedRef<string>
  recordBpm: (timeStamp?: number) => void
  resetBpm: () => void
}

/** Number of most recent taps the average is computed from. */
const WINDOW_SIZE = 12
/** Taps needed before the reading can count as steady. */
const MIN_STEADY_TAPS = 6
/** A pause this much longer than the current beat starts a new session. */
const IDLE_FACTOR = 2.5
/** A pause this long always starts a new session, even before a tempo exists. */
const IDLE_MAX_MS = 3000
/** Intervals outside this band around the median are treated as missed or double taps. */
const OUTLIER_LOW = 0.6
const OUTLIER_HIGH = 1.6
/** Relative interval spread below which the reading counts as steady. Human tapping jitters 4-6%. */
const STEADY_SPREAD = 0.08

const median = (values: number[]): number => {
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid]! : (sorted[mid - 1]! + sorted[mid]!) / 2
}

export function useBpm(): Bpm {
  const beats: Ref<number[]> = ref([])
  const beatCount: Ref<number> = ref(0)
  const bpm: Ref<number> = ref(0)
  const previousBpm: Ref<number> = ref(0)
  const spread: Ref<number> = ref(1)
  const startTime: Ref<number | null> = ref(null)
  const elapsedSeconds: Ref<number> = ref(0)

  const status = computed((): BpmStatus => {
    if (beatCount.value < 2) return 'idle'
    return beatCount.value >= MIN_STEADY_TAPS && spread.value <= STEADY_SPREAD ? 'steady' : 'settling'
  })

  // Elapsed time is measured to the last tap, so it freezes when tapping stops instead of drifting.
  const elapsedFormatted = computed((): string => {
    const minutes = Math.floor(elapsedSeconds.value / 60)
    const seconds = elapsedSeconds.value % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  })

  const calculateBPM = (): void => {
    const recent = beats.value.slice(-WINDOW_SIZE)
    if (recent.length < 2) return

    const intervals = recent.slice(1).map((time, i) => time - recent[i]!)
    const mid = median(intervals)
    const kept = intervals.filter(i => i >= mid * OUTLIER_LOW && i <= mid * OUTLIER_HIGH)
    const usable = kept.length ? kept : intervals

    const mean = usable.reduce((sum, i) => sum + i, 0) / usable.length
    const deviation = Math.sqrt(usable.reduce((sum, i) => sum + (i - mean) ** 2, 0) / usable.length)

    bpm.value = Math.round((60000 / mean) * 10) / 10
    spread.value = mean > 0 ? deviation / mean : 1
  }

  const clearSession = (): void => {
    beats.value = []
    beatCount.value = 0
    bpm.value = 0
    spread.value = 1
    startTime.value = null
    elapsedSeconds.value = 0
  }

  const resetBpm = (): void => {
    clearSession()
    previousBpm.value = 0
  }

  const isIdleGap = (now: number): boolean => {
    const last = beats.value[beats.value.length - 1]
    if (last === undefined) return false
    const gap = now - last
    if (gap > IDLE_MAX_MS) return true
    if (beats.value.length < 3) return false
    const recent = beats.value.slice(-WINDOW_SIZE)
    const mid = median(recent.slice(1).map((time, i) => time - recent[i]!))
    return gap > mid * IDLE_FACTOR
  }

  const recordBpm = (timeStamp: number = performance.now()): void => {
    // A long pause means a new song or a lost place: start fresh instead of poisoning the average,
    // but keep the old reading visible until the new one exists.
    if (isIdleGap(timeStamp)) {
      if (bpm.value > 0) previousBpm.value = bpm.value
      clearSession()
    }

    if (startTime.value === null) startTime.value = timeStamp

    beats.value.push(timeStamp)
    if (beats.value.length > WINDOW_SIZE) beats.value.shift()
    beatCount.value++
    elapsedSeconds.value = Math.floor((timeStamp - startTime.value) / 1000)
    calculateBPM()

    if (bpm.value > 0) previousBpm.value = 0
  }

  return {
    beatCount,
    bpm,
    previousBpm,
    status,
    elapsedFormatted,
    recordBpm,
    resetBpm
  }
}
