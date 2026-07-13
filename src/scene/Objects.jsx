import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";
import * as THREE from "three";
import "./IridescentMaterial.js";

/* The living, iridescent hero core */
export function Core({ position = [0, 0, 0], scale = 1 }) {
  const mat = useRef();
  const group = useRef();
  useFrame((state) => {
    if (mat.current) mat.current.uTime = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.15;
  });
  return (
    <group ref={group} position={position} scale={scale}>
      <Icosahedron args={[2, 64]}>
        {/* @ts-ignore custom material registered via extend */}
        <iridescentMaterial ref={mat} uDisplace={0.45} />
      </Icosahedron>
    </group>
  );
}

/* A drifting field of points that gives the corridor depth */
export function Particles({ count = 1800, depth = 90 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 26;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 26;
      arr[i * 3 + 2] = -Math.random() * depth + 8;
    }
    return arr;
  }, [count, depth]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#c8a96e"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* Wireframe rings the camera passes through, like gates in space */
export function Gates() {
  const gates = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        z: -i * 6 - 4,
        r: 4 + Math.sin(i * 0.7) * 1.5,
        rot: i * 0.4,
        color: i % 2 === 0 ? "#c8a96e" : "#e8d5a3",
      })),
    []
  );
  const group = useRef();
  useFrame((state) => {
    if (group.current) {
      group.current.children.forEach((c, i) => {
        c.rotation.z = state.clock.elapsedTime * 0.1 + i;
      });
    }
  });
  return (
    <group ref={group}>
      {gates.map((g, i) => (
        <mesh key={i} position={[0, 0, g.z]} rotation={[0, 0, g.rot]}>
          <torusGeometry args={[g.r, 0.02, 8, 100]} />
          <meshBasicMaterial color={g.color} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* Small chapter markers — glowing shards floating beside the path */
export function Shards() {
  const shards = useMemo(
    () =>
      Array.from({ length: 40 }, () => ({
        pos: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 16,
          -Math.random() * 80,
        ],
        s: Math.random() * 0.4 + 0.1,
        color: ["#c8a96e", "#e8d5a3", "#b87428", "#d4b870"][
          Math.floor(Math.random() * 4)
        ],
      })),
    []
  );
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.children.forEach((c, i) => {
      c.rotation.x = state.clock.elapsedTime * 0.3 + i;
      c.rotation.y = state.clock.elapsedTime * 0.2 + i;
    });
  });
  return (
    <group ref={ref}>
      {shards.map((s, i) => (
        <mesh key={i} position={s.pos} scale={s.s}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={s.color}
            emissive={s.color}
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}
