# react-three-fiber-examples — examples

A floating, distorted torus knot with orbit controls and image-based lighting —
in two forms: an idiomatic R3F component, and a dependency-free vanilla-Three.js
version that runs by just opening it.

| File | Description |
| --- | --- |
| [`FloatingKnot.jsx`](./FloatingKnot.jsx) | Idiomatic React Three Fiber component — a distorted torus knot lit by an environment, floating and orbitable, with `<PerformanceMonitor>` + `<AdaptiveDpr>` quality scaling and reduced-motion handling. Needs the npm setup below. |
| [`vanilla-fallback.html`](./vanilla-fallback.html) | Dependency-free plain Three.js r160 version of the same scene. **Runs by just opening it** — no build step. Adaptive DPR, capability fallback, and strict cleanup. |

## Why two files?

A pure-CDN React Three Fiber setup (React UMD + Babel standalone + R3F/drei from
a CDN) is fragile: the reconciler, JSX pragma, and peer-version matching between
`three`, `@react-three/fiber`, and `@react-three/drei` break easily across
versions. So `FloatingKnot.jsx` is written to run in a real bundler, and
`vanilla-fallback.html` guarantees there is always something you can open and
see immediately.

## Run FloatingKnot.jsx with Vite

```bash
npm create vite@latest r3f-knot -- --template react
cd r3f-knot
npm i three@0.160.0 @react-three/fiber@8.15.19 @react-three/drei@9.99.0
# copy examples/FloatingKnot.jsx into src/
```

Then render it from `src/main.jsx`:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import FloatingKnot from "./FloatingKnot.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(<FloatingKnot />);
```

```bash
npm run dev
```

These versions are mutually compatible: `@react-three/fiber@8` and
`@react-three/drei@9` both target `three` r160.

## Production notes

- **`FloatingKnot.jsx`** scales quality at runtime: `<PerformanceMonitor>` raises
  or lowers a DPR ceiling (kept within `[1, 2]`) from the measured frame rate,
  while `<AdaptiveDpr>` and `<AdaptiveEvents>` drop resolution and raycast cost
  during interaction and restore them when idle. Reduced-motion viewers get a
  static scene on a `frameloop="demand"` loop (renders only when the camera
  moves) with baked shadows.
- **`vanilla-fallback.html`** loads three r160 **only** via a jsdelivr importmap
  (never the UMD build), checks WebGL support with a styled fallback, caps DPR at
  2 with rolling-FPS adaptive scaling, pauses when hidden or offscreen, and on
  `pagehide` (or via `window.__floatingKnotDispose`) disposes geometry, material,
  environment, controls and renderer and removes every listener.

Part of AETumi's React Three Fiber examples hub: https://aetumi.app/r3f
