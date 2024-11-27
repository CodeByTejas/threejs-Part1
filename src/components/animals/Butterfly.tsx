import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Butterfly = ({ startPosition }: { startPosition: [number, number, number] }) => {
  const butterflyRef = useRef<THREE.Group>(null);
  const wingAngle = useRef(0);

  useFrame((state) => {
    if (butterflyRef.current) {
      // Flutter wings
      wingAngle.current = Math.sin(state.clock.elapsedTime * 15) * Math.PI / 4;
      
      // Random flight path
      const time = state.clock.elapsedTime;
      butterflyRef.current.position.x = startPosition[0] + Math.sin(time * 0.5) * 3;
      butterflyRef.current.position.y = startPosition[1] + Math.sin(time * 0.7) * 0.5 + 1;
      butterflyRef.current.position.z = startPosition[2] + Math.cos(time * 0.3) * 3;
      
      // Rotate to face direction of movement
      butterflyRef.current.rotation.y = Math.sin(time * 0.5) * Math.PI / 2;
    }
  });

  return (
    <group ref={butterflyRef} position={startPosition}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.02, 0.1, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Wings */}
      {[[-0.1, 0, 0], [0.1, 0, 0]].map((pos, i) => (
        <group key={i} position={pos} rotation={[0, 0, i === 0 ? wingAngle.current : -wingAngle.current]}>
          <mesh>
            <planeGeometry args={[0.15, 0.2]} />
            <meshStandardMaterial color="#4a148c" side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
};