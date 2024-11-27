import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TreeProps {
  position: [number, number, number];
  scale?: number;
}

export const Tree: React.FC<TreeProps> = ({ position, scale = 1 }) => {
  const treeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (treeRef.current) {
      // Gentle swaying motion
      treeRef.current.rotation.z = Math.sin(state.clock.elapsedTime + position[0]) * 0.02;
    }
  });

  return (
    <group ref={treeRef} position={position} scale={scale}>
      {/* Tree trunk */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 2]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>
      
      {/* Tree foliage layers */}
      {[2, 2.8, 3.6].map((height, i) => (
        <mesh key={i} position={[0, height, 0]}>
          <coneGeometry args={[1 - i * 0.2, 1.2, 8]} />
          <meshStandardMaterial color="#2d5a27" />
        </mesh>
      ))}
    </group>
  );
};