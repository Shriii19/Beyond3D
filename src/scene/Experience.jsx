import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { Core, Particles, Gates, Shards } from "./Objects.jsx";

const palette = {
  ocean: { background: "#070a12", fog: "#070a12", glow: "#8ec5ff", warm: "#f7dca1", accent: "#8ec5ff" },
  desert: { background: "#150d08", fog: "#150d08", glow: "#f5b76c", warm: "#f5d3a6", accent: "#f5b76c" },
  forest: { background: "#070d0d", fog: "#070d0d", glow: "#9fe7a4", warm: "#e0dcbc", accent: "#9fe7a4" },
  city: { background: "#080b12", fog: "#080b12", glow: "#b28ef6", warm: "#f0d9ff", accent: "#b28ef6" },
  gallery: { background: "#0d0a09", fog: "#0d0a09", glow: "#d7b576", warm: "#f4dfb1", accent: "#d7b576" },
  space: { background: "#05070e", fog: "#05070e", glow: "#8ef7d7", warm: "#d5f7ff", accent: "#8ef7d7" },
};

function Rig({ scrollProgressRef }) {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3());
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const reducedMotion = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  useFrame((state, delta) => {
    const offset = scrollProgressRef?.current ?? 0;
    // Keep the camera inside the generated tunnel through the final chapter.
    const z = 8 - offset * 72;
    const swayX = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.3) * 0.7;
    const swayY = reducedMotion ? 0 : Math.cos(state.clock.elapsedTime * 0.25) * 0.52 + 0.25;
    const pointerX = reducedMotion ? 0 : pointer.x;
    const pointerY = reducedMotion ? 0 : pointer.y;

    targetPos.set(pointerX * 1.6 + swayX, pointerY * 1.5 + swayY, z);
    camera.position.lerp(targetPos, 1 - Math.exp(-7 * delta));

    target.current.set(pointerX * 1.4, pointerY * 0.8, z - 10);
    camera.lookAt(target.current);
  });

  return null;
}

export default function Experience({ sceneState = { environment: "ocean", mood: "cinematic", particleLevel: 0.8, density: 0.72, energy: 1, accent: "#d7b576" }, scrollProgressRef }) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const paletteData = palette[sceneState.environment] || palette.ocean;
  const particleCount = isMobile ? 1000 : Math.round(1400 + (sceneState.particleLevel || 0.8) * 1200);

  return (
    <>
      <color attach="background" args={[paletteData.background]} />
      <fog attach="fog" args={[paletteData.fog, 12, 72]} />

      <ambientLight intensity={0.14 + (sceneState.energy || 1) * 0.08} />
      <pointLight position={[0, 1.5, 4]} intensity={30 * (sceneState.energy || 1)} color={paletteData.warm} distance={36} />
      <pointLight position={[7, 3, -12]} intensity={28 * (sceneState.energy || 1)} color={paletteData.glow} distance={56} />
      <pointLight position={[-8, -2, -18]} intensity={20 * (sceneState.energy || 1)} color={sceneState.accent || paletteData.accent} distance={60} />
      <Environment preset="night" background={false} />

      <Rig scrollProgressRef={scrollProgressRef} />

      <Core position={[0, 0, -3.5]} scale={1.26} tint={sceneState.accent || paletteData.accent} />
      <Gates intensity={sceneState.energy || 1} />
      <Shards />
      <Particles count={particleCount} tint={sceneState.accent || paletteData.accent} density={sceneState.density || 0.72} />

      <EffectComposer multisampling={isMobile ? 0 : 8}>
        <Bloom
          mipmapBlur
          intensity={0.1 + (sceneState.energy || 1) * 0.08}
          luminanceThreshold={0.88}
          luminanceSmoothing={0.9}
        />
        <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.04 + (sceneState.density || 0.72) * 0.03} />
        <Vignette eskil={false} offset={0.2} darkness={0.8} />
      </EffectComposer>
    </>
  );
}
