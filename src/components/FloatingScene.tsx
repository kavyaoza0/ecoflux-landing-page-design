import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Torus, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

const FloatingOrb = ({ position, color, speed = 1, distort = 0.4, size = 1 }: {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
  size?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speed;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
  });

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.4} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.35}
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const EnergyRing = ({ position, color, size = 1 }: {
  position: [number, number, number];
  color: string;
  size?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5 + 0.5;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={1} rotationIntensity={0.8} floatIntensity={1}>
      <Torus ref={meshRef} args={[size, 0.04, 16, 100]} position={position}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </Torus>
    </Float>
  );
};

const GeoShape = ({ position, color }: {
  position: [number, number, number];
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={0.8} rotationIntensity={1.2} floatIntensity={0.8}>
      <Icosahedron ref={meshRef} args={[0.6, 1]} position={position}>
        <MeshWobbleMaterial
          color={color}
          transparent
          opacity={0.2}
          factor={0.3}
          speed={1.5}
          wireframe
        />
      </Icosahedron>
    </Float>
  );
};

const ParticleField = ({ count = 80 }: { count?: number }) => {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#2dd4a8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const FloatingScene = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#2dd4a8" />
        <pointLight position={[-5, -3, 3]} intensity={0.3} color="#14b8a6" />

        <FloatingOrb position={[-3, 1.5, -2]} color="#2dd4a8" speed={0.8} distort={0.5} size={0.9} />
        <FloatingOrb position={[3.5, -1, -1]} color="#14b8a6" speed={1.2} distort={0.3} size={0.7} />
        <FloatingOrb position={[0, 2.5, -3]} color="#0d9488" speed={0.6} distort={0.6} size={1.1} />

        <EnergyRing position={[-2, -1.5, 0]} color="#2dd4a8" size={1.2} />
        <EnergyRing position={[2.5, 1, -1]} color="#14b8a6" size={0.8} />

        <GeoShape position={[4, 2, -2]} color="#2dd4a8" />
        <GeoShape position={[-4, -2, -1]} color="#14b8a6" />

        <ParticleField count={100} />
      </Canvas>
    </div>
  );
};

export default FloatingScene;
