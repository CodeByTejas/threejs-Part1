import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GrassProps {
  position: [number, number, number];
}

export const Grass: React.FC<GrassProps> = ({ position }) => {
  const grassRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (grassRef.current) {
      // Gentle grass movement
      grassRef.current.rotation.z = Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <mesh ref={grassRef} position={position}>
      <cylinderGeometry args={[0.02, 0, 0.3, 4]} />
      <meshStandardMaterial color="#3b7834" />
    </mesh>
  );
};