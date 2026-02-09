import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";

const MiniOrb = ({ position, color, size = 0.4 }: {
  position: [number, number, number];
  color: string;
  size?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
      <Sphere ref={ref} args={[size, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.25}
          distort={0.35}
          speed={3}
          metalness={0.7}
          roughness={0.3}
        />
      </Sphere>
    </Float>
  );
};

const MiniRing = ({ position, color, size = 0.6 }: {
  position: [number, number, number];
  color: string;
  size?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.8;
    ref.current.rotation.z = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.8}>
      <Torus ref={ref} args={[size, 0.03, 16, 64]} position={position}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.2}
          emissive={color}
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </Torus>
    </Float>
  );
};

const MiniParticles = ({ count = 30 }: { count?: number }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#2dd4a8" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
};

type Variant = "left" | "right" | "center";

const SectionScene = ({ variant = "center", className = "" }: { variant?: Variant; className?: string }) => {
  const configs: Record<Variant, { orbs: [number, number, number][]; rings: [number, number, number][] }> = {
    left: {
      orbs: [[-3, 0, -1], [-2, 1.5, -2]],
      rings: [[-2.5, -1, 0]],
    },
    right: {
      orbs: [[3, 0.5, -1], [2, -1.5, -2]],
      rings: [[2.5, 1, 0]],
    },
    center: {
      orbs: [[-2, 1, -1], [2, -1, -1]],
      rings: [[0, 0, -1]],
    },
  };

  const config = configs[variant];

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 3, 3]} intensity={0.3} color="#2dd4a8" />

        {config.orbs.map((pos, i) => (
          <MiniOrb key={`orb-${i}`} position={pos} color={i % 2 === 0 ? "#2dd4a8" : "#14b8a6"} />
        ))}
        {config.rings.map((pos, i) => (
          <MiniRing key={`ring-${i}`} position={pos} color="#2dd4a8" />
        ))}

        <MiniParticles count={40} />
      </Canvas>
    </div>
  );
};

export default SectionScene;
