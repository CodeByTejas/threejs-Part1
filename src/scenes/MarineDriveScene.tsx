import { Environment, Cloud } from '@react-three/drei';

export const MarineDriveScene = () => {
  return (
    <>
      <Environment preset="night" />
      <Cloud
        opacity={0.5}
        speed={0.4}
        width={10}
        depth={1.5}
        segments={20}
        position={[0, 8, -10]}
      />
      {/* Buildings */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[i * 2 - 20, 2 + Math.random() * 3, -10]}
        >
          <boxGeometry args={[1.5, 4 + Math.random() * 4, 1.5]} />
          <meshStandardMaterial
            color="#ffeb3b"
            emissive="#ffeb3b"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
      {/* Water */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#001f3f"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -5]}>
        <planeGeometry args={[50, 5]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </>
  );
};