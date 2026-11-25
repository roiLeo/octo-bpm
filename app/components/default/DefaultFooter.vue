<template>
  <footer class="mt-auto border-t border-default">
    <UContainer class="flex h-14 items-center justify-between">
      <span class="text-sm text-muted">© {{ year }} roiLeo</span>
      <UButton color="neutral" variant="subtle" size="md" label="View on GitHub" icon="i-simple-icons-github" to="https://github.com/roiLeo/octo-bpm" target="_blank" />
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
// useState keeps the server-rendered year, so hydration can't drift around New Year.
const year = useState('footer-year', () => new Date().getFullYear())
</script>
