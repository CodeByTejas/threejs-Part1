import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ForestScene } from './scenes/ForestScene';

function App() {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [15, 15, 15], fov: 75 }}
        style={{ background: '#87CEEB' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <ForestScene />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;