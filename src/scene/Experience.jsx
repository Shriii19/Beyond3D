import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, Scroll, Environment } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { Core, Particles, Gates, Shards } from "./Objects.jsx";
import Overlay from "../components/Overlay.jsx";

function Rig() {
  const scroll = useScroll();
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3());
  const targetPos = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const offset = scroll.offset; // 0 -> 1
    // Fly forward through the corridor
    const z = 8 - offset * 74;
    // Gentle mouse parallax + idle sway
    const swayX = Math.sin(state.clock.elapsedTime * 0.3) * 0.6;
    const swayY = Math.cos(state.clock.elapsedTime * 0.2) * 0.4;
    targetPos.set(
      pointer.x * 1.2 + swayX,
      pointer.y * 1.2 + swayY + 0.2,
      z
    );
    camera.position.lerp(targetPos, 1 - Math.pow(0.001, delta));
    // Always look a little further down the tunnel
    target.current.set(0, 0, z - 10);
    camera.lookAt(target.current);
  });

  return null;
}

export default function Experience() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  return (
    <>
      <color attach="background" args={["#080705"]} />
      <fog attach="fog" args={["#080705", 14, 60]} />

      <ambientLight intensity={0.12} />
      <pointLight position={[0, 1, 4]} intensity={50} color="#f0c060" distance={35} />
      <pointLight position={[8, 4, -20]} intensity={30} color="#c87020" distance={50} />
      <Environment preset="night" />

      <Rig />

      <Core position={[0, 0, 0]} scale={1} />
      <Gates />
      <Shards />
      <Particles count={isMobile ? 1000 : 1800} />

      {/* HTML chapters scroll in sync with the 3D offset */}
      <Scroll html>
        <Overlay />
      </Scroll>

      <EffectComposer multisampling={isMobile ? 0 : 8}>
        <Bloom
          mipmapBlur
          intensity={0.25}
          luminanceThreshold={0.65}
          luminanceSmoothing={0.8}
        />
        <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.04} />
        <Vignette eskil={false} offset={0.2} darkness={0.75} />
      </EffectComposer>
    </>
  );
}
