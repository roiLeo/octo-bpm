# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Musicians and DJs working out the tempo of a song or groove while practicing, rehearsing, mixing, or producing. They tap along with music they are hearing and want a number fast, on a phone or at a desktop. Other people with a rhythm (runners, dancers) can use it, but they do not shape decisions.

## Product Purpose

Octo-BPM is a tap-tempo BPM calculator. The user taps a button or presses the spacebar in time with the music, and the app shows the running BPM, beat count, measuring time, and a beat-strength indicator. The BPM stays on screen until the user resets. Success is a trustworthy tempo reading reached in a few taps, with no friction.

## Positioning

Simple and instant: no account, no ads, no setup. Open it and tap. It works by button or spacebar, on phone or desktop. A generic tap-tempo page that asks for sign-in or clutters the screen could not truthfully make this claim.

## Operating Context

Used alongside live or recorded music, often one-handed, in rehearsal rooms, studios, or DJ booths. Sessions are short and repeated: tap, read the number, reset, move to the next song.

## Capabilities and Constraints

- Tap input via on-screen button or spacebar.
- BPM is the average of the last 12 tap intervals, ignoring missed or doubled taps. It starts a fresh session after a pause, keeping the previous reading dimmed until a new one exists. Tap count, elapsed time to the last tap, and a Settling/Steady status are shown.
- A BeatVisualizer (two bars of four pips) gives visual feedback on each tap.
- Reset (button or `R`) clears the session.
- Color picker and light/dark color mode (dark by default).
- Single-screen tool: one tap surface, no accounts, backend, or multi-page flows.
- Stack: Nuxt 4, Nuxt UI, TypeScript, Tailwind. `@nuxtjs/i18n` is installed but only English copy exists. Whether to localize is undecided.

## Brand Commitments

The name "Octo-BPM" and its musical-note mark (heroicons musical-note in the navbar, primary-colored) stay.

## Evidence on Hand

- README with a screenshot of the current app (hosted on GitHub).
- No testimonials, usage numbers, press, or case studies exist. Do not fabricate any.

## Product Principles

1. Speed to first reading. Nothing stands between opening the page and tapping.
2. The tempo number is the hero. Every other element is secondary to reading it at a glance.
3. Reliable under repetition. Tapping the same surface hundreds of times must stay comfortable and accurate.
4. Stay a single-screen tool. Resist accounts, settings sprawl, and extra pages.

## Accessibility & Inclusion

Accessibility is required. Spacebar and keyboard operation, sufficient contrast, and reduced-motion support are non-negotiable. A specific WCAG level has not been chosen.
