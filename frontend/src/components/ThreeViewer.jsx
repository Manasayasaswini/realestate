import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const PlotMesh = ({ dimensions }) => {
  const width = dimensions?.width || 10;
  const length = dimensions?.length || 10;
  const height = dimensions?.height || 6;

  return (
    <mesh position={[0, height / 2, 0]}>
      <boxGeometry args={[width, height, length]} />
      <meshStandardMaterial color="#41a85f" />
    </mesh>
  );
};

const ThreeViewer = ({ dimensions }) => {
  return (
    <div className="card" style={{ height: '460px', overflow: 'hidden' }}>
      <Canvas camera={{ position: [18, 14, 18], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 12, 8]} intensity={1.1} />
        <gridHelper args={[40, 40, '#99b6dd', '#d8e5f5']} />
        <PlotMesh dimensions={dimensions} />
        <OrbitControls enablePan enableZoom />
      </Canvas>
    </div>
  );
};

export default ThreeViewer;
