import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Cloud } from '@react-three/drei';
import * as THREE from 'three';

export const BeachScene = () => {
  const waterRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
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
      <mesh
        ref={waterRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
      >
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshStandardMaterial
          color="#0077be"
          metalness={0.8}
          roughness={0.2}
          wireframe
        />
      </mesh>
      <mesh position={[0, -2.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#c2b280" />
      </mesh>
    </>
  );
};