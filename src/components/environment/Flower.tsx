import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FlowerProps {
  position: [number, number, number];
  color?: string;
}

export const Flower: React.FC<FlowerProps> = ({ position, color = '#ff69b4' }) => {
  const flowerRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (flowerRef.current) {
      // Gentle swaying
      flowerRef.current.rotation.z = Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <group ref={flowerRef} position={position}>
      {/* Stem */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3]} />
        <meshStandardMaterial color="#4caf50" />
      </mesh>
      
      {/* Petals */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, 0.3, 0]}
          rotation={[0, (i * Math.PI) / 3, Math.PI / 6]}
        >
          <planeGeometry args={[0.1, 0.2]} />
          <meshStandardMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
      ))}
      
      {/* Center */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#ffeb3b" />
      </mesh>
    </group>
  );
};