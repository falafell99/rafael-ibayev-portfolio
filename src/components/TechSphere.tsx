import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

const techLabels = [
  "Python", "C#", "Java", "React", "AI", "ML",
  "Robotics", "OpenCV", "Three.js", "TypeScript",
];

function TechNode({ position, label }: { position: [number, number, number]; label: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1
      );
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#ff6600" />
      </mesh>
      <Text
        position={[0, 0.18, 0]}
        fontSize={0.12}
        color="#999999"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function RotatingGroup() {
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const pts: [number, number, number][] = [];
    const phi = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < techLabels.length; i++) {
      const y = 1 - (2 * i) / (techLabels.length - 1);
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = 2 * Math.PI * i / phi;
      pts.push([
        radiusAtY * Math.cos(theta) * 1.5,
        y * 1.5,
        radiusAtY * Math.sin(theta) * 1.5,
      ]);
    }
    return pts;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  const lineGeometries = useMemo(() => {
    const lines: { points: Float32Array }[] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = new THREE.Vector3(...positions[i]).distanceTo(new THREE.Vector3(...positions[j]));
        if (dist < 2.2) {
          const pts = new Float32Array([...positions[i], ...positions[j]]);
          lines.push({ points: pts });
        }
      }
    }
    return lines;
  }, [positions]);

  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: "#ff6600", transparent: true, opacity: 0.15 }), []);

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <TechNode key={techLabels[i]} position={pos} label={techLabels[i]} />
      ))}
      {lineGeometries.map((line, i) => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(line.points, 3));
        return (
          <primitive key={`line-${i}`} object={new THREE.Line(geo, lineMaterial)} />
        );
      })}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

const TechSphere = () => {
  return (
    <div className="w-full h-[300px] md:h-[400px] relative">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ antialias: false, powerPreference: "low-power" }}
      >
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <RotatingGroup />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TechSphere;
