# SIGNAL — an insane 3D scrollytelling starter

A scroll-driven flythrough built with React Three Fiber. The camera flies
forward through a corridor of glowing gates toward an iridescent, living core,
with HTML chapters scrolling in sync. Dark void, bloom, chromatic aberration —
the "AI-generated" aesthetic, built to be extended.

## Run it

```bash
npm install
npm run dev      # open the printed localhost URL
npm run build    # production build into /dist
```

Requires Node 18+.

## What's where

- `src/App.jsx` — Canvas, ScrollControls (set `pages` = number of chapters), HUD.
- `src/scene/Experience.jsx` — lighting, fog, the scroll "Rig" (camera path), postprocessing.
- `src/scene/Objects.jsx` — Core (hero), Gates (rings), Shards, Particles.
- `src/scene/IridescentMaterial.js` — the custom GLSL shader (fresnel + noise). This is the "alive" look.
- `src/components/Overlay.jsx` — the text chapters. **Start editing here.**
- `src/index.css` — design tokens (`--cyan`, `--magenta`…), overlay + HUD styles.

## How the scroll works

`ScrollControls pages={5}` makes the page 5 viewport-heights tall. `useScroll().offset`
(0→1) drives the camera's z in `Rig`. To add a chapter: add one entry in
`Overlay.jsx` AND bump `pages` in `App.jsx` to match.

## Knobs to turn first

- Colors: the `--*` variables in `index.css` and the `uColorA/B/C` in `IridescentMaterial.js`.
- Intensity: `Bloom intensity` and `uDisplace` on the Core.
- Camera speed/path: the `z = 8 - offset * 74` line in `Experience.jsx`.

## Performance notes (do this before shipping)

- `dpr={[1, 1.75]}` already caps retina cost — lower the max for weak devices.
- Bloom + noise are the heaviest effects; drop `Noise` first if mobile struggles.
- Reduce `Particles count` and `Gates` length on mobile via a `window.innerWidth` check.
- Respect `prefers-reduced-motion` — reduce camera sway when set.

## Next ideas

- Swap the Icosahedron Core for an AI-generated model (Meshy / Luma) — drop a `.glb`
  in `/public` and load it with `useGLTF`.
- Add a real HDRI to `<Environment />` for richer reflections.
- Trigger per-chapter events off `scroll.offset` ranges (color shifts, object reveals).
