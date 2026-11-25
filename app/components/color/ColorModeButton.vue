<template>
  <ClientOnly>
    <UButton
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      color="neutral"
      variant="ghost"
      square
      :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
      @click="isDark = !isDark"
    />
    <template #fallback>
      <div class="size-10" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>
