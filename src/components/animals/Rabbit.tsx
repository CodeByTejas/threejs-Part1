import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Rabbit = ({ startPosition }: { startPosition: [number, number, number] }) => {
  const rabbitRef = useRef<THREE.Group>(null);
  const hopProgress = useRef(0);
  const isHopping = useRef(false);

  useFrame((state) => {
    if (rabbitRef.current) {
      if (!isHopping.current && Math.random() < 0.02) {
        isHopping.current = true;
      }

      if (isHopping.current) {
        hopProgress.current += 0.1;
        const hopHeight = Math.sin(hopProgress.current) * 0.3;
        rabbitRef.current.position.y = startPosition[1] + Math.max(0, hopHeight);
        
        if (hopProgress.current >= Math.PI) {
          hopProgress.current = 0;
          isHopping.current = false;
        }
      }

      // Rotate slightly based on time
      rabbitRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <group ref={rabbitRef} position={startPosition}>
      {/* Body */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#E5E5E5" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#E5E5E5" />
      </mesh>
      {/* Ears */}
      {[[-0.05, 0.6, 0], [0.05, 0.6, 0]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.02, 0.02, 0.2]} />
          <meshStandardMaterial color="#E5E5E5" />
        </mesh>
      ))}
    </group>
  );
};