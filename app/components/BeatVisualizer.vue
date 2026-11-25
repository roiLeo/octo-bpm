<template>
  <div class="flex items-center justify-center gap-6" aria-hidden="true">
    <div v-for="bar in 2" :key="bar" class="flex items-center gap-3">
      <span
        v-for="beat in 4"
        :key="`${bar}-${beat}-${isCurrent(position(bar, beat)) ? beatCount : 0}`"
        class="beat-pip rounded-full transition-colors duration-150"
        :class="[
          beat === 1 ? 'size-4' : 'size-3',
          isLit(position(bar, beat)) ? 'bg-primary' : 'bg-accented',
          isCurrent(position(bar, beat)) ? 'beat-pip--current' : ''
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  beatCount: number
}

const props = withDefaults(defineProps<Props>(), {
  beatCount: 0
})

/** Eight pips: two bars of four. The lit run loops every eight taps. */
const BEATS_PER_LOOP = 8

const position = (bar: number, beat: number): number => (bar - 1) * 4 + (beat - 1)

const current = computed((): number => (props.beatCount === 0 ? -1 : (props.beatCount - 1) % BEATS_PER_LOOP))

const isLit = (index: number): boolean => index <= current.value
const isCurrent = (index: number): boolean => index === current.value
</script>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .beat-pip--current {
    animation: beat-hit 220ms cubic-bezier(0.16, 1, 0.3, 1);
  }
}

@keyframes beat-hit {
  from {
    transform: scale(1.7);
  }
  to {
    transform: scale(1);
  }
}
</style>
