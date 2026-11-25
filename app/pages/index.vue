<template>
  <div class="flex min-h-[calc(100dvh-7rem)] flex-col gap-5 py-4 sm:py-8">
    <h1 class="sr-only">Tap tempo</h1>

    <section class="flex flex-col items-center gap-1 pt-2" aria-label="Tempo">
      <div
        class="flex items-baseline font-bold leading-none tabular-nums transition-colors duration-200"
        :class="numberClass"
      >
        <span class="text-7xl sm:text-8xl">{{ whole }}</span>
        <span v-if="decimal" class="text-3xl sm:text-4xl">.{{ decimal }}</span>
      </div>
      <div class="text-lg text-muted">BPM</div>

      <div class="mt-2 flex min-h-10 items-center justify-center gap-3">
        <p class="text-base" :class="status === 'steady' ? 'text-primary' : 'text-toned'">
          {{ statusText }}
        </p>
        <UButton
          color="neutral"
          variant="ghost"
          size="md"
          icon="i-lucide-rotate-ccw"
          :disabled="beatCount === 0 && previousBpm === 0"
          aria-label="Reset"
          aria-keyshortcuts="R"
          @click="resetBpm"
        >
          <span aria-hidden="true">Reset</span>
          <kbd class="hint-key rounded border border-default px-1 text-[0.7rem] leading-4 text-muted" aria-hidden="true">R</kbd>
        </UButton>
      </div>
      <p class="sr-only" role="status">{{ announcement }}</p>
    </section>

    <BeatVisualizer :beat-count="beatCount" />

    <button
      type="button"
      class="tap-pad flex min-h-48 flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-accented bg-elevated text-highlighted select-none hover:bg-accented/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:bg-accented motion-safe:transition-transform motion-safe:duration-100 motion-safe:active:scale-[0.99]"
      aria-keyshortcuts="Space"
      @pointerdown.prevent="onPadPointer"
      @keydown.space.enter.prevent="onPadKey"
      @keyup.space.enter.prevent
      @click="onPadClick"
    >
      <span class="text-4xl font-extrabold tracking-wide text-primary">TAP</span>
      <span class="hint-key text-sm text-muted">
        or press
        <kbd class="rounded border border-accented px-1.5 py-0.5 text-xs">Space</kbd>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
const { beatCount, bpm, previousBpm, status, elapsedFormatted, recordBpm, resetBpm } = useBpm()

// While there is no reading of its own yet, show the last one dimmed rather than a blank.
const shownBpm = computed(() => (bpm.value > 0 ? bpm.value : previousBpm.value))
const parts = computed(() => (shownBpm.value > 0 ? shownBpm.value.toFixed(1).split('.') : ['--', '']))
const whole = computed(() => parts.value[0])
const decimal = computed(() => parts.value[1])

// Trust cue: the number only earns full emphasis once it has settled.
const numberClass = computed(() => {
  if (status.value === 'steady') return 'text-primary'
  if (bpm.value > 0 && beatCount.value >= 4) return 'text-highlighted'
  return 'text-muted'
})

const statusText = computed(() => {
  if (beatCount.value === 0) {
    return previousBpm.value > 0 ? 'Last reading · tap to start a new one' : 'Tap in time with the music'
  }
  if (beatCount.value === 1) return 'Keep tapping'
  const taps = `${beatCount.value} taps · ${elapsedFormatted.value}`
  return status.value === 'steady' ? `Steady · ${taps}` : `Settling · ${taps}`
})

// Announce for screen readers every fourth tap, not on every tap.
const announcement = computed(() =>
  beatCount.value >= 4 && beatCount.value % 4 === 0
    ? `${bpm.value.toFixed(1)} beats per minute after ${beatCount.value} taps`
    : ''
)

const tap = (event?: Event): void => {
  recordBpm(event?.timeStamp)
}

// Pointer taps are handled on pointerdown for lowest latency. Keyboard activation is handled
// on the pad itself and ignores key repeat; a click with no pointer (detail 0) is an assistive
// technology activation and is the only click that should count.
const onPadPointer = (event: PointerEvent): void => {
  if (event.button === 0) tap(event)
}
const onPadKey = (event: KeyboardEvent): void => {
  if (!event.repeat) tap(event)
}
const onPadClick = (event: MouseEvent): void => {
  if (event.detail === 0) tap()
}

// Never steal keys from text entry or an open popover.
const TEXT_ENTRY = 'input, textarea, select, [contenteditable="true"], [role="dialog"], [role="menu"], [role="listbox"]'
// Space also activates a focused control, so leave it alone there.
const ACTIVATABLE = `${TEXT_ENTRY}, button, a, summary`

const handleKeyDown = (event: KeyboardEvent): void => {
  if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return
  const target = event.target as HTMLElement | null

  if (event.code === 'Space') {
    if (target?.closest(ACTIVATABLE)) return
    event.preventDefault()
    tap(event)
  } else if (event.code === 'KeyR') {
    if (target?.closest(TEXT_ENTRY)) return
    resetBpm()
  }
}

onMounted(() => window.addEventListener('keydown', handleKeyDown))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeyDown))
</script>

<style scoped>
.tap-pad {
  touch-action: manipulation;
}

/* Keyboard hints mean nothing on touch-only devices. */
@media (hover: none) and (pointer: coarse) {
  .hint-key {
    display: none;
  }
}
</style>
