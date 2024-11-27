import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Cloud, Stars, useHelper } from '@react-three/drei';
import * as THREE from 'three';
import { Tree } from '../components/environment/Tree';
import { Grass } from '../components/environment/Grass';
import { Deer } from '../components/animals/Deer';
import { Rabbit } from '../components/animals/Rabbit';
import { Fox } from '../components/animals/Fox';
import { Butterfly } from '../components/animals/Butterfly';
import { Flower } from '../components/environment/Flower';

export const ForestScene = () => {
  const forestRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useHelper(lightRef, THREE.DirectionalLightHelper);

  useFrame((state) => {
    if (forestRef.current) {
      forestRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <>
      <Environment preset="forest" />
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
      
      <directionalLight
        ref={lightRef}
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <ambientLight intensity={0.5} />
      
      {/* Clouds */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Cloud
          key={i}
          opacity={0.5}
          speed={0.4}
          width={10}
          depth={1.5}
          segments={20}
          position={[i * 10 - 30, 8 + Math.random() * 2, -10 - Math.random() * 5]}
        />
      ))}

      <group ref={forestRef}>
        {/* Trees */}
        {Array.from({ length: 40 }).map((_, i) => (
          <Tree
            key={i}
            position={[
              Math.random() * 50 - 25,
              0,
              Math.random() * 50 - 25,
            ]}
            scale={0.8 + Math.random() * 0.4}
          />
        ))}

        {/* Grass and Flowers */}
        {Array.from({ length: 300 }).map((_, i) => (
          <group key={i}>
            <Grass
              position={[
                Math.random() * 50 - 25,
                0,
                Math.random() * 50 - 25,
              ]}
            />
            {Math.random() > 0.8 && (
              <Flower
                position={[
                  Math.random() * 50 - 25,
                  0,
                  Math.random() * 50 - 25,
                ]}
                color={['#ff69b4', '#ff4081', '#e91e63', '#9c27b0'][Math.floor(Math.random() * 4)]}
              />
            )}
          </group>
        ))}

        {/* Animals */}
        <Deer startPosition={[-5, 0, -5]} />
        <Deer startPosition={[5, 0, 5]} />
        <Rabbit startPosition={[-3, 0, 2]} />
        <Rabbit startPosition={[4, 0, -3]} />
        <Fox startPosition={[0, 0, 0]} />
        <Fox startPosition={[-8, 0, 8]} />
        {Array.from({ length: 5 }).map((_, i) => (
          <Butterfly
            key={i}
            startPosition={[
              Math.random() * 20 - 10,
              1 + Math.random() * 2,
              Math.random() * 20 - 10,
            ]}
          />
        ))}
      </group>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#2d5a27" />
      </mesh>
    </>
  );
};