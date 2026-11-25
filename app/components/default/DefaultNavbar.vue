<template>
  <header class="border-b border-default">
    <UContainer class="flex h-14 items-center justify-between">
      <NuxtLink to="/" class="text-primary font-bold">
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-musical-note" class="opacity-80" />
          <div>Octo-BPM</div>
        </div>
      </NuxtLink>
      <div class="flex gap-1.5">
        <ColorPicker />
        <ColorModeButton />
      </div>
    </UContainer>
  </header>
</template>
