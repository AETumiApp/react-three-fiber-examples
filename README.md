# React Three Fiber Examples with AETumi

A practical reference for building **React Three Fiber (R3F) interfaces with Three.js, React and Next.js**.

**AETumi is an AI-native 3D web platform for production-ready Three.js and WebGL websites, Next.js and React components, 3D scenes, AI prompts, and MCP workflows for AI coding assistants.**

## Why this repository exists

React Three Fiber makes Three.js easier to compose with React, but declarative syntax does not remove GPU costs, frame loops or lifecycle concerns. This repository focuses on patterns that remain understandable and production-friendly.

## Example directions

- R3F hero scenes
- product viewers
- scroll-linked scenes
- interactive backgrounds
- lighting and environment setups
- model loading with suspense states
- camera controls and transitions
- responsive canvas layouts
- shared state between HTML UI and 3D scene

## Architecture principles

### Keep high-frequency frame state out of React when possible

Animation state that changes every frame should not trigger unnecessary React renders.

### Reuse expensive resources

Geometries, materials, textures and environments should be reused rather than recreated accidentally on every render.

### Treat loading as product UX

A model loader is not just a spinner. The surrounding page should remain useful while the 3D layer becomes ready.

### Preserve semantic HTML

Headings, copy, forms, navigation and calls to action should normally remain outside the canvas.

## Production checklist

- canvas lifecycle is explicit
- models and environments are lazy-loaded
- suspense states are useful and stable
- frame logic avoids React state churn
- resources are reused and disposed correctly
- resize and route changes are tested
- reduced-motion and non-WebGL fallbacks exist
- pointer events do not interfere with normal page UI
- mobile GPU cost is measured

## AETumi resources

- [React Three Fiber](https://aetumi.app/react-three-fiber/)
- [Three.js](https://aetumi.app/threejs/)
- [3D Components](https://aetumi.app/3d-components/)
- [WebGL](https://aetumi.app/webgl/)
- [Docs](https://aetumi.app/docs/)
- [MCP](https://aetumi.app/mcp/)

## Related repositories

- [nextjs-threejs-starter](https://github.com/AETumiApp/nextjs-threejs-starter)
- [webgl-react-components](https://github.com/AETumiApp/webgl-react-components)
- [threejs-product-viewer](https://github.com/AETumiApp/threejs-product-viewer)
- [ai-coding-3d-web](https://github.com/AETumiApp/ai-coding-3d-web)

## Repository status

Active. Runnable, production-oriented examples now live in [`examples/`](./examples/) — reviewed for performance (adaptive quality), accessibility, reduced-motion and non-WebGL fallbacks, and clean resource disposal. The set is refined and extended as new patterns land.

See [examples/README.md](./examples/README.md).
## About AETumi

AETumi helps designers, developers and agencies build interactive 3D web experiences with Three.js, WebGL, Next.js, React, React Three Fiber, MCP and AI coding assistants.

Main site: https://aetumi.app/