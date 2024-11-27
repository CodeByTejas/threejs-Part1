import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Fox = ({ startPosition }: { startPosition: [number, number, number] }) => {
  const foxRef = useRef<THREE.Group>(null);
  const direction = useRef(1);
  const speed = 0.03;

  useFrame((state) => {
    if (foxRef.current) {
      // Smooth prowling movement
      foxRef.current.position.x += speed * direction.current;
      foxRef.current.position.z = startPosition[2] + Math.sin(state.clock.elapsedTime * 2) * 2;
      
      // Change direction at boundaries
      if (foxRef.current.position.x > startPosition[0] + 8) {
        direction.current = -1;
        foxRef.current.rotation.y = Math.PI;
      } else if (foxRef.current.position.x < startPosition[0] - 8) {
        direction.current = 1;
        foxRef.current.rotation.y = 0;
      }
      
      // Subtle body movement
      foxRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.05;
    }
  });

  return (
    <group ref={foxRef} position={startPosition}>
      {/* Body */}
      <mesh position={[0, 0.4, 0]}>
        <capsuleGeometry args={[0.2, 0.6, 8, 8]} />
        <meshStandardMaterial color="#d35f2a" />
      </mesh>
      {/* Head */}
      <mesh position={[0.3, 0.5, 0]}>
        <coneGeometry args={[0.15, 0.3, 8]} rotation={[0, 0, -Math.PI / 2]} />
        <meshStandardMaterial color="#d35f2a" />
      </mesh>
      {/* Ears */}
      {[[-0.1, 0.6, 0.1], [-0.1, 0.6, -0.1]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <coneGeometry args={[0.05, 0.1, 4]} />
          <meshStandardMaterial color="#d35f2a" />
        </mesh>
      ))}
      {/* Tail */}
      <mesh position={[-0.4, 0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.02, 0.4]} />
        <meshStandardMaterial color="#d35f2a" />
      </mesh>
    </group>
  );
};