# react-three-fiber-examples — examples

A floating, distorted torus knot with orbit controls and image-based lighting.

| File | Description |
| --- | --- |
| [`FloatingKnot.jsx`](./FloatingKnot.jsx) | Idiomatic React Three Fiber component — a distorted torus knot lit by an environment, floating and orbitable. Needs the npm setup below. |
| [`vanilla-fallback.html`](./vanilla-fallback.html) | Dependency-free plain Three.js r160 version of the same scene. **Runs by just opening it** — no build step. |

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
`@react-three/drei@9` both target `three` r160. The component caps DPR at 2 and
disables auto-rotation when the viewer prefers reduced motion.

Part of AETumi's React Three Fiber examples hub: https://aetumi.app/r3f

---

## Example backlog / roadmap

# React Three Fiber Example Backlog

## Planned examples

### R3F hero scene

A small responsive hero with semantic HTML content outside the canvas and an explicit loading state.

### Product viewer

Use shared application state for variants while keeping per-frame animation state inside the scene.

### Suspense + model loading

Document what should happen before, during and after GLTF loading, including failure behavior.

### Scroll-linked camera

Connect normalized scroll progress to scene state without causing React re-render churn.

### Shared WebGL effect component

Compare a direct Three.js implementation with an equivalent React Three Fiber composition.

## Quality bar

Every example should document:

- React state boundary
- frame state boundary
- resource reuse
- cleanup
- responsive behavior
- reduced-motion fallback
- mobile performance notes

## AETumi links

- https://aetumi.app/react-three-fiber/
- https://aetumi.app/threejs/
- https://aetumi.app/docs/
