import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, Scroll, Environment } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
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

  useFrame((state, delta) => {
    const offset = scroll.offset; // 0 -> 1
    // Fly forward through the corridor
    const z = 8 - offset * 74;
    // Gentle mouse parallax + idle sway
    const swayX = Math.sin(state.clock.elapsedTime * 0.3) * 0.6;
    const swayY = Math.cos(state.clock.elapsedTime * 0.2) * 0.4;
    const targetPos = new THREE.Vector3(
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
  return (
    <>
      <color attach="background" args={["#05060a"]} />
      <fog attach="fog" args={["#05060a", 12, 55]} />

      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 4]} intensity={30} color="#7b5cff" distance={30} />
      <pointLight position={[6, 4, -20]} intensity={20} color="#ff5cf0" distance={40} />
      <Environment preset="night" />

      <Rig />

      <Core position={[0, 0, 0]} scale={1} />
      <Gates />
      <Shards />
      <Particles />

      {/* HTML chapters scroll in sync with the 3D offset */}
      <Scroll html>
        <Overlay />
      </Scroll>

      <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={0.7}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.6}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0004, 0.0004]}
        />
        <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.08} />
        <Vignette eskil={false} offset={0.15} darkness={0.9} />
      </EffectComposer>
    </>
  );
}
