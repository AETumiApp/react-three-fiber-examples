import React, { useRef, useReducer, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  MeshDistortMaterial,
  Float,
  AdaptiveDpr,
  AdaptiveEvents,
  PerformanceMonitor,
  BakeShadows,
} from "@react-three/drei";

/**
 * FloatingKnot — an idiomatic, production-grade React Three Fiber scene.
 *
 * A distorted, slowly floating torus knot with a metallic material lit by an
 * image-based environment, orbitable with the mouse. Built with three r160,
 * @react-three/fiber v8, and @react-three/drei v9.
 *
 * Production behavior:
 *   - <PerformanceMonitor> lowers/raises a DPR ceiling based on real frame rate,
 *     and <AdaptiveDpr>/<AdaptiveEvents> drop resolution and event cost while
 *     the user is interacting, then restore it when idle.
 *   - `frameloop="demand"` for reduced-motion viewers so the scene renders only
 *     when the camera actually moves (OrbitControls invalidates on change),
 *     saving battery; full `always` loop otherwise.
 *   - <Environment> provides IBL; <OrbitControls> uses damping.
 *
 * See examples/README.md for `npm i` + Vite instructions. A dependency-free
 * plain-Three.js version of the same scene lives in examples/vanilla-fallback.html.
 *
 * https://aetumi.app/r3f  (AETumi — AI-native 3D web platform)
 */

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function Knot({ animate }) {
  const ref = useRef();

  // Rotate a touch every frame; <Float> handles the bobbing translation.
  // Delta-based so speed is frame-rate independent. Skipped for reduced motion.
  useFrame((_, delta) => {
    if (!animate || !ref.current) return;
    ref.current.rotation.x += delta * 0.3;
    ref.current.rotation.y += delta * 0.15;
  });

  return (
    <Float speed={animate ? 2 : 0} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} castShadow receiveShadow>
        <torusKnotGeometry args={[1, 0.32, 220, 40]} />
        <MeshDistortMaterial
          color="#8a6cff"
          metalness={0.9}
          roughness={0.15}
          distort={animate ? 0.28 : 0}
          speed={1.6}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingKnot() {
  const reduce = prefersReducedMotion();
  const animate = !reduce;

  // PerformanceMonitor nudges a DPR ceiling up/down as the frame rate allows.
  const [dpr, setDpr] = useReducer(
    (prev, next) => Math.max(1, Math.min(2, next)),
    Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2)
  );

  const glOptions = useMemo(
    () => ({ antialias: true, powerPreference: "high-performance", alpha: false }),
    []
  );

  return (
    <Canvas
      dpr={dpr} /* driven by PerformanceMonitor below, always within [1, 2] */
      frameloop={animate ? "always" : "demand"}
      shadows
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={glOptions}
      style={{ position: "fixed", inset: 0, background: "#0a0a10" }}
    >
      <PerformanceMonitor
        onIncline={() => setDpr(2)}
        onDecline={() => setDpr(1)}
      />

      <ambientLight intensity={0.6} color="#404060" />
      <directionalLight position={[4, 6, 5]} intensity={2.2} castShadow />

      <Knot animate={animate} />

      <Environment preset="city" />

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={4}
        maxDistance={10}
        autoRotate={animate}
        autoRotateSpeed={1.0}
      />

      {/* Adaptive quality: drop DPR + throttle raycasting during interaction. */}
      <AdaptiveDpr pixelated={false} />
      <AdaptiveEvents />
      {/* Shadows are static here — bake them so they cost nothing per frame. */}
      {reduce && <BakeShadows />}
    </Canvas>
  );
}
