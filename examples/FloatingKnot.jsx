import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, MeshDistortMaterial, Float } from "@react-three/drei";

/**
 * FloatingKnot — an idiomatic React Three Fiber scene.
 *
 * A distorted, slowly floating torus knot with a metallic material lit by an
 * image-based environment, orbitable with the mouse. Built with three r160,
 * @react-three/fiber v8, and @react-three/drei v9.
 *
 * See examples/README.md for `npm i` + Vite run instructions. A dependency-free
 * plain-Three.js version of the same scene lives in examples/vanilla-fallback.html.
 *
 * https://aetumi.app/r3f  (AETumi — AI-native 3D web platform)
 */

function Knot() {
  const ref = useRef();

  // Rotate a touch every frame; <Float> handles the bobbing translation.
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.3;
    ref.current.rotation.y += delta * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} castShadow>
        <torusKnotGeometry args={[1, 0.32, 220, 40]} />
        <MeshDistortMaterial
          color="#8a6cff"
          metalness={0.9}
          roughness={0.15}
          distort={0.28}
          speed={1.6}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingKnot() {
  // Respect reduced-motion: disable auto-rotation for those viewers.
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      dpr={[1, 2]} /* cap device pixel ratio at 2 */
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true }}
      style={{ position: "fixed", inset: 0, background: "#0a0a10" }}
    >
      <ambientLight intensity={0.6} color="#404060" />
      <directionalLight position={[4, 6, 5]} intensity={2.2} />
      <Knot />
      <Environment preset="city" />
      <OrbitControls
        enablePan={false}
        enableDamping
        minDistance={4}
        maxDistance={10}
        autoRotate={!reduce}
        autoRotateSpeed={1.0}
      />
    </Canvas>
  );
}
