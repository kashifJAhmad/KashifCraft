import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useReducedMotion from '../../utils/useReducedMotion'

function Cloud({ position, scale = [4, 1, 3] }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={scale} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.82} />
      </mesh>
      <mesh position={[-scale[0] * 0.24, scale[1] * 0.35, 0]}>
        <boxGeometry args={[scale[0] * 0.42, scale[1] * 1.25, scale[2] * 0.78]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.88} />
      </mesh>
      <mesh position={[scale[0] * 0.25, scale[1] * 0.25, 0]}>
        <boxGeometry args={[scale[0] * 0.38, scale[1] * 1.1, scale[2] * 0.72]} />
        <meshBasicMaterial color="#f6fbff" transparent opacity={0.86} />
      </mesh>
    </group>
  )
}

export default function SkyEnvironment() {
  const cloudsRef = useRef()
  const reducedMotion = useReducedMotion()

  useFrame((_, delta) => {
    if (!reducedMotion && cloudsRef.current) {
      cloudsRef.current.position.x += delta * 0.8
      if (cloudsRef.current.position.x > 50) {
        cloudsRef.current.position.x = -50
      }
    }
  })

  return (
    <group>
      {/* Sun - iconic Minecraft cubic sun */}
      <group position={[35, 45, -35]}>
        <mesh>
          <boxGeometry args={[6, 6, 6]} />
          <meshBasicMaterial color="#FFF9C4" />
        </mesh>
        {/* Sun corona glow */}
        <mesh>
          <boxGeometry args={[7.2, 7.2, 7.2]} />
          <meshBasicMaterial color="#FFEB3B" transparent opacity={0.25} />
        </mesh>
      </group>

      {/* Drifting Clouds */}
      <group ref={cloudsRef}>
        <Cloud position={[-30, 28, -20]} scale={[10, 1.2, 6]} />
        <Cloud position={[-10, 30, 15]} scale={[12, 1.2, 8]} />
        <Cloud position={[20, 27, -10]} scale={[9, 1.2, 5]} />
        <Cloud position={[35, 31, 25]} scale={[14, 1.2, 7]} />
        <Cloud position={[0, 29, -35]} scale={[11, 1.2, 6]} />
        <Cloud position={[-25, 26, 30]} scale={[8, 1.2, 5]} />
      </group>
    </group>
  )
}
