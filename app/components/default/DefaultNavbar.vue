<template>
  <header class="bg-background/75 border-b border-gray-200 dark:border-gray-800">
    <UContainer class="flex h-14 items-center justify-between">
      <NuxtLink to="/" class="text-primary font-bold">Octo-BPM</NuxtLink>
      <div class="flex gap-1.5">
        <ColorPicker />
        <ColorModeButton />
      </div>
    </UContainer>
  </header>
</template>
