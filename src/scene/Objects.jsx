import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";
import * as THREE from "three";
import "./IridescentMaterial.js";

/* A subtle wireframe astrolabe — dark, quiet, and readable behind text */
export function Core({ position = [0, 0, 0], scale = 1 }) {
  const group = useRef();
  const ringGroup = useRef();

  const rings = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        radius: 0.45 + i * 0.28,
        speed: (i % 2 === 0 ? 1 : -1) * (0.15 + i * 0.04),
        tilt: [
          (Math.random() - 0.5) * 1.2,
          (Math.random() - 0.5) * 1.2,
          (Math.random() - 0.5) * 1.2,
        ],
      })),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.03;
    if (ringGroup.current) {
      ringGroup.current.children.forEach((child, i) => {
        child.rotation.x += rings[i].speed * 0.01;
        child.rotation.z += rings[i].speed * 0.008;
      });
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      <group ref={ringGroup}>
        {rings.map((r, i) => (
          <mesh key={i} rotation={r.tilt}>
            <torusGeometry args={[r.radius, 0.0025, 5, 80]} />
            <meshBasicMaterial color="#5c4d32" toneMapped transparent opacity={0.45} />
          </mesh>
        ))}
      </group>

      {/* Faint center seed */}
      <mesh>
        <icosahedronGeometry args={[0.06, 0]} />
        <meshBasicMaterial color="#4a4030" toneMapped transparent opacity={0.5} />
      </mesh>
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

/* Subtle wireframe rings the camera passes through, like gates in space */
export function Gates() {
  const gates = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        z: -i * 6 - 4,
        r: 4 + Math.sin(i * 0.7) * 1.5,
        rot: i * 0.4,
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
          <torusGeometry args={[g.r, 0.012, 8, 100]} />
          <meshBasicMaterial color="#6a5a3a" toneMapped transparent opacity={0.45} />
        </mesh>
      ))}
    </group>
  );
}

/* Small chapter markers — quiet shards floating beside the path */
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
        color: ["#7a6540", "#8a7048", "#6a5a3a", "#5c4d32"][
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
            emissiveIntensity={0.35}
            toneMapped
          />
        </mesh>
      ))}
    </group>
  );
}
