---
target: app/pages/index.vue
total_score: 19
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 2
target_identity: "file:/Users/edics-osx2/Desktop/wip/octo-bpm/app/pages/index.vue"
target_fingerprint: "sha256:c530138a6ac41e690b60d1c2b55307764f85bd1b46bee90137d56865ee52db48"
target_path: /Users/edics-osx2/Desktop/wip/octo-bpm/app/pages/index.vue
timestamp: 2026-11-25T15-44-02Z
slug: app-pages-index-vue
---
Method: dual-agent (source-only; no browser available). Detector: 0 findings.

# Critique: app/pages/index.vue (Operate)
Score 19/40 (Poor). H1 2, H2 2, H3 2, H4 2, H5 1, H6 3, H7 2, H8 1, H9 2, H10 2.

Verdict: interchangeable, a Nuxt UI starter card with a tap button. Authored ideas: musical-note mark and the 4-beat measure grid (hard-coded yellow, ignores theme).

Priority issues
- [P0] BPM engine untrustworthy (bpm.ts:66-85): averages all taps forever, no idle reset, no event.repeat guard, integer only, first tap shows 0. Fix: rolling window, outlier rejection, idle new session, "keep tapping" state, 1 decimal. -> harden
- [P0] Keyboard/screen-reader broken (index.vue:72-77, :11, ColorPicker, ColorModeButton:3): global Space handler hijacks all controls, no aria-live on BPM, no h1, toggle label unhelpful. -> audit, harden
- [P1] Contrast/glare (index.vue:16,35; DefaultFooter:4; BeatVisualizer:20,27): neutral-500 text below AA, white meter track in dark mode, yellow notes ignore theme. -> colorize
- [P1] Tap surface not the hero; mobile one-handed (index.vue:24; BeatVisualizer:4): ordinary button mid-card, click not pointerdown, Reset beneath it, grid-cols-4 likely overflows at 375px, dead props. -> layout, adapt
- [P2] Information overload (index.vue:6,26-37,49-56; BeatVisualizer:100-139): beat count x4, wall-clock last beat, repeated copy, settings sprawl in header. -> distill

Personas: Alex (no Reset key, key repeat, integer BPM), Sam (no live region, contrast, no reduced-motion), Casey (button mid-card, Reset adjacent, SPACE BAR hint), DJ in a dim booth (glare, sticky 0, silent corruption).

Minor: typos (rythm, item-center, space-between), no tabular-nums, red Reset vs rose primary, isRecentBeat non-reactive, i18n with no locales, footer year hydration, no theme-color.

Questions: why a history, four counts and a wall-clock time? What does "Octo" promise? What should a first tap do?
