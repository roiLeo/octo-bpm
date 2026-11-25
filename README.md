# Octo-bpm 🎵

A simple, responsive BPM (Beats Per Minute) calculator built with Nuxt and TypeScript. This application allows users to tap a rhythm using either a button or spacebar to calculate the BPM of music or any rhythmic pattern.

<details>
  <summary>Screenshot</summary>
  
![Screenshot 2025-06-05 at 16-57-30 Next](https://github.com/user-attachments/assets/bb501e52-62cc-44a5-9414-8eb6b4a62613)

</details>

## Features

- Real-time BPM from a rolling window of the last 12 taps, ignoring missed or doubled taps
- Tap input via button or spacebar
- "Settling" and "Steady" status, with a fresh start after a pause in tapping
- Reading stays on screen until you reset (button or `R`)
- Responsive design for mobile and desktop
- Built with TypeScript for type safety
- Modular architecture with Vue 3 Composition API

## Tech Stack

- [x] 🪲 [Typescript](https://www.typescriptlang.org/)
- [x] 💚 [Nuxt](https://nuxt.com//)
- [x] 🌊 [Nuxt UI](https://ui.nuxt.com/)
- [x] ✨ [Eslint](https://eslint.org/) & [Prettier](https://prettier.io/)
- [x] 🐕 [Husky](https://github.com/typicode/husky) git hooks

## Getting Started

Make sure to install the dependencies with [pnpm](https://pnpm.io/installation#using-corepack)

### 1. Clone the Repo

Start by cloning this repo to your local machine and navigating into the directory.

```bash
git clone https://github.com/roiLeo/octo-bpm
cd octo-bpm
```

### 2. Install Dependencies

Then, install the project dependencies:

```bash
pnpm install
```

### 3. Run the development server

```bash
pnpm dev
```

### 4. Build for production

```bash
pnpm build
```

## Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/roiLeo/octo-bpm) [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/roiLeo/octo-bpm)

Checkout the [deployment documentation](https://nuxt.com//guide/deploy/presets) for more information.
