<template>
  <div class="min-h-[200px]">
    <!-- Beat Display -->
    <div class="grid grid-cols-4 gap-6 justify-center items-center p-6">
      <!-- Complete groups of 4 beats -->
      <div
        v-for="group in completeGroups"
        :key="`group-${group}`"
        class="flex items-center gap-3"
      >
        <!-- 4 notes per group -->
        <div
          v-for="beat in 4"
          :key="`${group}-${beat}`"
          class="flex flex-col items-center relative"
        >
          <UIcon
            name="i-lucide-music-2"
            :class="[
              'text-yellow-400 transition-all duration-300 drop-shadow-md',
              isRecentBeat((group - 1) * 4 + beat) ? 'animate-pulse scale-125 text-yellow-300' : 'scale-100'
            ]"
            :size="iconSize"
          />
          <span
            v-if="showBeatNumbers"
            class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-mono"
          >
            {{ (group - 1) * 4 + beat }}
          </span>

          <!-- Beat number indicator on first beat of each measure -->
          <div
            v-if="beat === 1"
            class="absolute -top-2 -left-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
          >
            {{ group }}
          </div>
        </div>

        <!-- Group separator -->
        <div v-if="group % 4 !== 0" class="flex flex-col items-center mx-2">
          <div class="w-px h-8 bg-neutral-300 dark:bg-neutral-600" />
        </div>
      </div>

      <!-- Remaining beats (incomplete group) -->
      <div v-if="remainingBeats > 0" class="flex items-center gap-3">
        <!-- Active remaining beats -->
        <div
          v-for="beat in remainingBeats"
          :key="`remaining-${beat}`"
          class="flex flex-col items-center relative"
        >
          <UIcon
            name="i-lucide-music-2"
            :class="[
              'text-yellow-400 transition-all duration-300 drop-shadow-md',
              isRecentBeat(completeGroups * 4 + beat) ? 'animate-pulse scale-125 text-yellow-300' : 'scale-100'
            ]"
            :size="iconSize"
          />
          <span
            v-if="showBeatNumbers"
            class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-mono"
          >
            {{ completeGroups * 4 + beat }}
          </span>

          <!-- Measure number indicator on first beat -->
          <div
            v-if="beat === 1"
            class="absolute -top-2 -left-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
          >
            {{ completeGroups + 1 }}
          </div>
        </div>

        <!-- Placeholder dots for incomplete group -->
        <div
          v-for="emptyBeat in (4 - remainingBeats)"
          :key="`empty-${emptyBeat}`"
          class="flex flex-col items-center"
        >
          <UIcon
            name="i-lucide-music-2"
            class="text-neutral-300 dark:text-neutral-600 opacity-30 transition-opacity duration-300"
            :size="iconSize"
          />
          <span
            v-if="showBeatNumbers"
            class="text-xs text-neutral-400 dark:text-neutral-500 mt-1 opacity-50 font-mono"
          >
            {{ completeGroups * 4 + remainingBeats + emptyBeat }}
          </span>
        </div>
      </div>
    </div>

    <div class="text-center text-sm py-2 text-neutral-500 dark:text-neutral-400">
      Each <UIcon name="i-lucide-music-2" /> represents a beat, grouped by measures of 4
    </div>

    <!-- Beat Counter and Info -->
    <div class="text-center space-y-3">
      <UButton
        :icon="showBeatNumbers ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
        variant="ghost"
        @click="showBeatNumbers = !showBeatNumbers"
        size="sm"
      >
        {{ showBeatNumbers ? 'Hide' : 'Show' }} Numbers
      </UButton>
      <div class="flex justify-center gap-2">
        <UBadge
          :label="`${beatCount} total beats`"
          color="primary"
          variant="subtle"
          size="lg"
        />
        <UBadge
          v-if="beatCount > 0"
          :label="`${Math.ceil(beatCount / 4)} measures`"
          color="neutral"
          variant="subtle"
          size="lg"
        />
      </div>

      <div v-if="beatCount > 0" class="flex justify-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
        <div class="flex items-center gap-1">
          <UIcon name="i-heroicons-squares-2x2" size="16" />
          <span>{{ completeGroups }} complete</span>
        </div>
        <div v-if="remainingBeats > 0" class="flex items-center gap-1">
          <UIcon name="i-heroicons-plus-circle" size="16" />
          <span>{{ remainingBeats }} extra</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  beatCount: number
  lastBeatTime?: number | null
  iconSize?: string | number
  maxVisible?: number
}

const props = withDefaults(defineProps<Props>(), {
  beatCount: 0,
  lastBeatTime: null,
  iconSize: 24,
  maxVisible: 32
})

// Local state
const showBeatNumbers = ref(false)

// Computed properties
const completeGroups = computed(() => Math.floor(props.beatCount / 4))
const remainingBeats = computed(() => props.beatCount % 4)

// Check if a beat is recent (for animation)
const isRecentBeat = (beatNumber: number): boolean => {
  if (!props.lastBeatTime) return false

  // Highlight the most recent beat for 600ms
  const timeSinceLastBeat = Date.now() - props.lastBeatTime
  return beatNumber === props.beatCount && timeSinceLastBeat < 600
}
</script>

<style scoped>
/* Custom pulse animation for recent beats */
@keyframes beat-glow {
  0%, 100% {
    filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.5));
  }
  50% {
    filter: drop-shadow(0 0 12px rgba(251, 191, 36, 0.8));
  }
}

.animate-pulse {
  animation: beat-glow 0.6s ease-in-out;
}
</style>
