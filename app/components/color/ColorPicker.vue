<template>
  <UPopover :ui="{ content: 'w-64 p-4' }">
    <template #default="{ open }">
      <UButton
        icon="i-lucide-swatch-book"
        color="neutral"
        :variant="open ? 'soft' : 'ghost'"
        square
        aria-label="Accent color"
        :ui="{ leadingIcon: 'text-(--ui-primary)' }"
      />
    </template>

    <template #content>
      <fieldset>
        <legend class="mb-2 text-xs font-semibold text-highlighted">
          Accent color
        </legend>

        <div class="grid grid-cols-2 gap-1 -mx-2">
          <ColorPickerPill
            v-for="color in PRIMARY_COLORS"
            :key="color"
            :label="color"
            :chip="color"
            :selected="primary === color"
            @click="primary = color"
          />
        </div>
      </fieldset>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

const primary = computed({
  get: () => appConfig.ui.colors.primary,
  set: (option) => {
    appConfig.ui.colors.primary = option
    try {
      window.localStorage.setItem(PRIMARY_STORAGE_KEY, option)
    } catch {
      // Storage can be blocked; the choice still applies for this visit.
    }
  }
})
</script>
