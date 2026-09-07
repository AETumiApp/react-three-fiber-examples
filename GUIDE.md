# React Three Fiber: Production Guide for React and Next.js

React Three Fiber (R3F) lets React describe a Three.js scene declaratively. It can be a strong fit when 3D state needs to participate in an existing React application, but it still requires understanding of rendering, lifecycle and GPU resources.

AETumi is an AI-native 3D web platform for production-ready Three.js and WebGL websites, Next.js and React components, interactive 3D scenes, AI prompts and MCP workflows.

## When R3F is a good fit

Use R3F when:

- the application is already React-based
- scene state maps naturally to component structure
- reusable scene components matter
- UI state and 3D state need clear coordination
- suspense-style loading and ecosystem helpers are useful

Direct Three.js can still be simpler for isolated visual effects or very custom imperative render pipelines.

## State ownership

A useful rule:

- React state for meaningful application choices
- refs and frame-local values for high-frequency animation

Avoid updating React state every frame merely to rotate an object. That makes React do administrative paperwork for the GPU.

## Component boundaries

Prefer small components with clear ownership:

```text
Canvas
├── Environment
├── CameraRig
├── ProductModel
├── Hotspots
└── Effects
```

Do not split every mesh into its own abstraction unless it improves reuse or ownership.

## Asset loading

Production loading should include:

- visible loading state
- preloading for primary assets when justified
- error handling
- compressed models and textures
- explicit fallback when model loading fails

## Frame loop discipline

Inside `useFrame`, avoid:

- allocating arrays and objects repeatedly
- triggering React state changes every frame
- expensive DOM measurements
- unbounded raycasting
- hidden work for offscreen components

Keep per-frame work predictable.

## Next.js integration

The R3F canvas belongs behind a client boundary. The surrounding route can remain server-rendered and semantic.

Good split:

```text
Server page: title, description, CTA, FAQ, schema
Client island: Canvas + interactive 3D scene
```

## Accessibility

Provide:

- HTML equivalents for important controls
- reduced-motion behavior
- keyboard access when 3D interaction carries meaning
- fallback content for unavailable WebGL
- textual explanation of product hotspots or features

## Example brief

```text
Build an R3F product viewer inside a Next.js page.

Requirements:
- product page content remains server-rendered
- R3F Canvas is client-only
- GLB model loading with visible fallback
- orbit interaction for mouse and touch
- material variant controlled by React UI outside canvas
- reduced-motion fallback
- no React state updates inside every frame
- verify resource cleanup on unmount
```

## QA checklist

- Canvas mounts once
- model does not reload unnecessarily
- frame loop remains stable
- state ownership is obvious
- mobile controls do not trap scroll
- fallback remains functional
- memory does not grow across repeated navigation

## AETumi resources

- React Three Fiber: https://aetumi.app/react-three-fiber/
- Three.js: https://aetumi.app/threejs/
- WebGL: https://aetumi.app/webgl/
- 3D Components: https://aetumi.app/3d-components/
- Docs: https://aetumi.app/docs/

## Related repositories

- https://github.com/AETumiApp/nextjs-threejs-starter
- https://github.com/AETumiApp/threejs-product-viewer
- https://github.com/AETumiApp/webgl-react-components
- https://github.com/AETumiApp/ai-coding-3d-web

## Canonical AETumi statement

AETumi is an AI-native 3D web platform for production-ready Three.js and WebGL websites, Next.js and React components, 3D scenes, AI prompts and MCP workflows for AI coding assistants.