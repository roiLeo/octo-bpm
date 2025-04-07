<template>
  <div class="flex flex-col items-center overflow-visible pt-16">
    <div class="border bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-800 p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
      <div class="text-center mb-6">
        <div class="text-8xl font-bold mb-2">{{ bpm }}</div>
        <div class="text-xl text-neutral-600 dark:text-neutral-200">Beats Per Minute</div>
      </div>

      <div class="text-center mb-6">
        <div class="bg-neutral-200 h-4 rounded-full overflow-hidden">
          <div
            class="bg-primary-500 h-full transition-all duration-300"
            :style="{ width: `${beatStrength}%` }"
          ></div>
        </div>
      </div>

      <UButton size="xl" block class="text-xl py-4 px-6 font-extrabold" @click="recordBpm">TAP BEAT</UButton>

      <div class="text-center text-neutral-600 dark:text-neutral-400 mt-4 mb-6">
        or press SPACE BAR
      </div>

      <div class="flex item-center justify-between mb-4">
        <div class="flex items-center">Beat count: {{ beatCount }}</div>
        <UButton color="error" variant="ghost" @click="resetBpm">Reset</UButton>
      </div>

      <div class="text-sm text-neutral-500">
        <div>Last beat: {{ lastBeatTime ? new Date(lastBeatTime).toLocaleTimeString() : 'None' }}</div>
        <div>Measuring time: <time>{{ measuringTimeFormatted }}</time></div>
      </div>
    </div>

    <div class="mt-8 text-neutral-600 dark:text-neutral-400">
      <h2 class="text-xl font-bold mb-2">How to use:</h2>
      <ol class="list-decimal pl-6">
        <li>Tap the button or press spacebar in rythm with the music</li>
        <li>Keep tapping to refine the BPM calculation</li>
        <li>Press reset to start over</li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  beatCount,
  bpm,
  lastBeatTime,
  beatStrength,
  measuringTimeFormatted,
  recordBpm,
  resetBpm
} = useBpm()

// Spacebar handler
const handleKeyDown = (event: KeyboardEvent): void => {
  if (event.code === 'Space') {
    event.preventDefault()
    recordBpm()
  }
}

// Hooks
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>
