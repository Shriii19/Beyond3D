import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import "./IridescentMaterial.js";

export function Core({ position = [0, 0, 0], scale = 1 }) {
  const group = useRef();
  const ringGroup = useRef();

  const rings = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        radius: 0.42 + i * 0.26,
        speed: (i % 2 === 0 ? 1 : -1) * (0.18 + i * 0.05),
        tilt: [
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.5,
        ],
      })),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.04;
    if (ringGroup.current) {
      ringGroup.current.children.forEach((child, i) => {
        child.rotation.x += rings[i].speed * 0.012;
        child.rotation.z += rings[i].speed * 0.009;
      });
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      <group ref={ringGroup}>
        {rings.map((r, i) => (
          <mesh key={i} rotation={r.tilt}>
            <torusGeometry args={[r.radius, 0.004, 10, 120]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#c8a96e" : "#5a4a3d"} toneMapped transparent opacity={0.55} />
          </mesh>
        ))}
      </group>

      <mesh scale={1.65}>
        <icosahedronGeometry args={[0.19, 1]} />
        <meshStandardMaterial
          color="#f7dca1"
          emissive="#f3c96b"
          emissiveIntensity={0.32}
          metalness={0.9}
          roughness={0.2}
          toneMapped
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[0.07, 0]} />
        <meshBasicMaterial color="#f0d399" toneMapped transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

export function Particles({ count = 1800, depth = 90 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 28;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 28;
      arr[i * 3 + 2] = -Math.random() * depth + 8;
    }
    return arr;
  }, [count, depth]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#f1c878"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function Gates() {
  const gates = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        z: -i * 5.5 - 4,
        r: 3.8 + Math.sin(i * 0.8) * 1.8,
        rot: i * 0.38,
        opacity: 0.25 + (i % 5) * 0.08,
      })),
    []
  );

  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.children.forEach((child, i) => {
        child.rotation.z = state.clock.elapsedTime * 0.14 + i * 0.35;
      });
    }
  });

  return (
    <group ref={group}>
      {gates.map((g, i) => (
        <mesh key={i} position={[0, 0, g.z]} rotation={[0, 0, g.rot]}>
          <torusGeometry args={[g.r, 0.012, 8, 120]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#866c3d" : "#a57b42"} toneMapped transparent opacity={g.opacity} />
        </mesh>
      ))}
    </group>
  );
}

export function Shards() {
  const shards = useMemo(
    () =>
      Array.from({ length: 44 }, () => ({
        pos: [
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 18,
          -Math.random() * 80,
        ],
        s: Math.random() * 0.55 + 0.12,
        color: ["#8d7756", "#c79d53", "#6d5842", "#d9b972", "#8a7048"][
          Math.floor(Math.random() * 5)
        ],
      })),
    []
  );

  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.children.forEach((c, i) => {
      c.rotation.x = state.clock.elapsedTime * 0.35 + i * 0.45;
      c.rotation.y = state.clock.elapsedTime * 0.22 + i * 0.32;
      c.position.y += Math.sin(state.clock.elapsedTime + i) * 0.0006;
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
            emissiveIntensity={0.45}
            metalness={0.8}
            roughness={0.35}
            toneMapped
          />
        </mesh>
      ))}
    </group>
  );
}
