import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Cloud } from '@react-three/drei';
import * as THREE from 'three';

export const RiverScene = () => {
  const waterRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <>
      <Environment preset="sunset" />
      <Cloud
        opacity={0.5}
        speed={0.4}
        width={10}
        depth={1.5}
        segments={20}
        position={[0, 8, -10]}
      />
      {/* River */}
      <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshStandardMaterial
          color="#4fc3f7"
          metalness={0.8}
          roughness={0.2}
          wireframe
        />
      </mesh>
      {/* Banks */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-30, -0.4, 0]}>
        <planeGeometry args={[40, 100]} />
        <meshStandardMaterial color="#4caf50" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[30, -0.4, 0]}>
        <planeGeometry args={[40, 100]} />
        <meshStandardMaterial color="#4caf50" />
      </mesh>
    </>
  );
};