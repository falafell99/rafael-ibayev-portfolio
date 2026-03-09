import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import * as THREE from "three";

const techLabels = [
  "Python", "C#", "Java", "React", "AI", "ML",
  "Robotics", "OpenCV", "Three.js", "TypeScript",
];

function TechNode({ position, label }: { position: [number, number, number]; label: string }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.08, 6, 6]} />
        <meshBasicMaterial color="#10b981" />
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

  const lineData = useMemo(() => {
    const lines: THREE.Line[] = [];
    const mat = new THREE.LineBasicMaterial({ color: "#10b981", transparent: true, opacity: 0.15 });
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = new THREE.Vector3(...positions[i]).distanceTo(new THREE.Vector3(...positions[j]));
        if (dist < 2.2) {
          const geo = new THREE.BufferGeometry();
          geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([...positions[i], ...positions[j]]), 3));
          lines.push(new THREE.Line(geo, mat));
        }
      }
    }
    return lines;
  }, [positions]);

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <TechNode key={techLabels[i]} position={pos} label={techLabels[i]} />
      ))}
      {lineData.map((line, i) => (
        <primitive key={`line-${i}`} object={line} />
      ))}
      <mesh>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

const TechSphere = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[300px] md:h-[400px] relative">
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          dpr={1}
          frameloop="always"
          gl={{ antialias: false, powerPreference: "low-power" }}
        >
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <RotatingGroup />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default TechSphere;
