import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Deer = ({ startPosition }: { startPosition: [number, number, number] }) => {
  const deerRef = useRef<THREE.Group>(null);
  const direction = useRef(1);
  const speed = 0.02;

  useFrame((state) => {
    if (deerRef.current) {
      // Move deer back and forth
      deerRef.current.position.x += speed * direction.current;
      
      // Change direction at boundaries
      if (deerRef.current.position.x > startPosition[0] + 5) {
        direction.current = -1;
        deerRef.current.rotation.y = Math.PI;
      } else if (deerRef.current.position.x < startPosition[0] - 5) {
        direction.current = 1;
        deerRef.current.rotation.y = 0;
      }
      
      // Add slight bobbing motion
      deerRef.current.position.y = startPosition[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group ref={deerRef} position={startPosition}>
      {/* Body */}
      <mesh position={[0, 0.8, 0]}>
        <capsuleGeometry args={[0.3, 0.8, 8, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Head */}
      <mesh position={[0.4, 1.2, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Legs */}
      {[[-0.2, 0, -0.2], [-0.2, 0, 0.2], [0.2, 0, -0.2], [0.2, 0, 0.2]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.05, 0.05, 0.8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      ))}
    </group>
  );
};