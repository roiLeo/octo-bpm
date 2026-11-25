// Restore the accent color the user picked on a previous visit.
export default defineNuxtPlugin(() => {
  try {
    const saved = window.localStorage.getItem(PRIMARY_STORAGE_KEY)
    if (saved && (PRIMARY_COLORS as readonly string[]).includes(saved)) {
      useAppConfig().ui.colors.primary = saved
    }
  } catch {
    // Storage can be blocked; the default accent is fine.
  }
})
