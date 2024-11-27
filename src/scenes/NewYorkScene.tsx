import { Environment } from '@react-three/drei';

const Building = ({ position, height }: { position: [number, number, number], height: number }) => {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[1, height, 1]} />
        <meshStandardMaterial color="#404040" />
      </mesh>
    </group>
  );
};

export const NewYorkScene = () => {
  return (
    <>
      <Environment preset="city" />
      <group>
        {Array.from({ length: 50 }).map((_, i) => (
          <Building
            key={i}
            position={[
              Math.random() * 20 - 10,
              0,
              Math.random() * 20 - 10,
            ]}
            height={5 + Math.random() * 15}
          />
        ))}
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </>
  );
};