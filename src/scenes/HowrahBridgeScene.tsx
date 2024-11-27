import { Environment } from '@react-three/drei';

export const HowrahBridgeScene = () => {
  return (
    <>
      <Environment preset="night" />
      {/* Bridge Structure */}
      <group position={[0, 0, 0]}>
        {/* Main Bridge Deck */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[30, 0.5, 4]} />
          <meshStandardMaterial color="#555555" />
        </mesh>
        
        {/* Bridge Towers */}
        <group position={[-10, 5, 0]}>
          <mesh>
            <boxGeometry args={[1, 10, 1]} />
            <meshStandardMaterial color="#666666" />
          </mesh>
        </group>
        <group position={[10, 5, 0]}>
          <mesh>
            <boxGeometry args={[1, 10, 1]} />
            <meshStandardMaterial color="#666666" />
          </mesh>
        </group>
        
        {/* Cables */}
        {Array.from({ length: 10 }).map((_, i) => (
          <group key={i}>
            <mesh position={[-9 + i * 2, 3, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 8]} />
              <meshStandardMaterial
                color="#888888"
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          </group>
        ))}
      </group>
      
      {/* Water */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#001f3f"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </>
  );
};