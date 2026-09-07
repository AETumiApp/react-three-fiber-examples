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