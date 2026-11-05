import { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
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

function ResponsiveCamera() {
  const { camera, size } = useThree()

  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1)
    const target = [0, 2, 0]
    const portrait = aspect < 0.65
    const tablet = aspect < 0.95
    const compact = aspect < 1.25
    const fov = portrait ? 78 : tablet ? 70 : compact ? 62 : 54
    const distance = portrait ? 37 : tablet ? 39 : compact ? 41 : 39
    const horizontalFov = 2 * Math.atan(Math.tan((fov * Math.PI) / 360) * aspect)
    const widthFit = 34 / Math.max(2 * Math.tan(horizontalFov / 2), 0.1)
    const depthFit = 37 / Math.max(2 * Math.tan((fov * Math.PI) / 360), 0.1)
    const fitDistance = Math.max(distance, Math.min(Math.max(widthFit, depthFit), distance + 8))

    camera.fov = fov
    camera.position.set(0, target[1] + fitDistance * 0.48, target[2] + fitDistance * 0.88)
    camera.lookAt(target)
    camera.updateProjectionMatrix()
  }, [camera, size.width, size.height])

  return null
}

function ResponsiveOrbitControls() {
  const { size } = useThree()
  const aspect = size.width / Math.max(size.height, 1)
  const compact = aspect < 1.2

  return (
    <OrbitControls
      makeDefault
      enablePan
      enableZoom
      enableRotate
      minDistance={compact ? 12 : 10}
      maxDistance={compact ? 62 : 58}
      maxPolarAngle={Math.PI / 2.15}
      minPolarAngle={0.2}
      target={[0, 1, 0]}
      enableDamping
      dampingFactor={0.08}
    />
  )
}

export default function GameWorld() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 20, 30], fov: 55, near: 0.1, far: 250 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
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

      <ResponsiveCamera />
      <ResponsiveOrbitControls />
    </Canvas>
  )
}
