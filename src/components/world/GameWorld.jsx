import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Terrain from './Terrain'
import Water from './Water'
import Trees from './Trees'
import SkyEnvironment from './SkyEnvironment'
import Structures from './Structures'
import BlockManager from '../blocks/BlockManager'

function Loader() {
  return (
    <mesh position={[0, 2, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color="#5da832" />
    </mesh>
  )
}

export default function GameWorld() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 20, 30], fov: 55, near: 0.1, far: 250 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      onCreated={({ gl }) => {
        gl.setClearColor('#87CEEB')
      }}
    >
      <fog attach="fog" args={['#87CEEB', 50, 120]} />

      {/* Lighting */}
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[30, 40, 20]}
        intensity={0.85}
        color="#fff8e7"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={100}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-bias={-0.0001}
      />
      <hemisphereLight args={['#87CEEB', '#5da832', 0.3]} />

      <Suspense fallback={<Loader />}>
        <SkyEnvironment />
        <Terrain />
        <Water />
        <Trees />
        <Structures />
        <BlockManager />
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan
        enableZoom
        enableRotate
        minDistance={8}
        maxDistance={65}
        maxPolarAngle={Math.PI / 2.15}
        minPolarAngle={0.2}
        target={[0, 1, 0]}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  )
}
