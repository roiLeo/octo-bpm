interface Bpm {
  beatCount: Ref<number>
  bpm: Ref<number>
  lastBeatTime: Ref<number | null>
  beatStrength: Ref<number>
  measuringTimeFormatted: Ref<string>
  recordBpm: () => void
  resetBpm: () => void
  cleanup: () => void
}

export function useBpm(): Bpm {
  // State
  const beats: Ref<number[]> = ref([])
  const beatCount: Ref<number> = ref(0)
  const bpm: Ref<number> = ref(0)
  const lastBeatTime: Ref<number | null> = ref(null)
  const startTime: Ref<number | null> = ref(null)
  const beatStrength: Ref<number> = ref(0)
  const resetInterval: Ref<number> = ref(200)
  let decayInterval: number | null = null

  // Computed
  const measuringTimeFormatted = computed((): string => {
    if (!startTime.value) return '0:00'

    const elapsed = Math.floor((Date.now() - startTime.value) / 1000)
    const minutes = Math.floor(elapsed / 60)
    const seconds = elapsed % 60

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  })

  // Methods
  const recordBpm = (): void => {
    const now = Date.now()

    // Initialize startTime if this is the first beat
    if (!startTime.value) {
      startTime.value = now
    }

    beats.value.push(now)
    beatCount.value++
    lastBeatTime.value = now

    // Visual feedback
    beatStrength.value = 100
    if (decayInterval !== null) {
      clearInterval(decayInterval)
    }

    decayInterval = window.setInterval(() => {
      beatStrength.value = Math.max(0, beatStrength.value - 5)
      if (beatStrength.value <= 0 && decayInterval !== null) {
        clearInterval(decayInterval)
        decayInterval = null
      }
    }, resetInterval.value)

    calculateBPM()
  }

  const calculateBPM = (): void => {
    if (beats.value.length < 2) return

    // Calculate based on the last 8 beats or all beats if less than 8
    const beatsToConsider = beats.value.slice(-Math.min(8, beats.value.length))

    // Calculate time differences between consecutive beats
    const intervals: number[] = []
    for (let i = 1; i < beatsToConsider.length; i++) {
      intervals.push(beatsToConsider[i] - beatsToConsider[i - 1])
    }

    // Calculate average interval in milliseconds
    const averageInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length

    // Convert to BPM (60000 ms = 1 minute)
    bpm.value = Math.round(60000 / averageInterval)
  }

  const resetBpm = (): void => {
    beats.value = []
    beatCount.value = 0
    bpm.value = 0
    lastBeatTime.value = null
    startTime.value = null
    beatStrength.value = 0

    if (decayInterval !== null) {
      clearInterval(decayInterval)
      decayInterval = null
    }
  }

  const cleanup = (): void => {
    if (decayInterval !== null) {
      clearInterval(decayInterval)
      decayInterval = null
    }
  }

  onBeforeUnmount(() => {
    cleanup()
  })

  return {
    beatCount,
    bpm,
    lastBeatTime,
    beatStrength,
    measuringTimeFormatted,

    recordBpm,
    resetBpm,
    cleanup
  }
}
