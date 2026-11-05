import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useReducedMotion from '../../utils/useReducedMotion'

export default function Water() {
  const waterRef = useRef()
  const reducedMotion = useReducedMotion()

  useFrame(({ clock }) => {
    if (!reducedMotion && waterRef.current) {
      waterRef.current.position.y = -0.15 + Math.sin(clock.getElapsedTime() * 1.5) * 0.04
    }
  })

  return (
    <group position={[19, 0, 19]}>
      {/* Animated Water Surface */}
      <mesh ref={waterRef} position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9, 9]} />
        <meshStandardMaterial
          color="#2980b9"
          roughness={0.1}
          metalness={0.1}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Water bed / sandy basin floor */}
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[9, 0.4, 9]} />
        <meshLambertMaterial color="#c2b280" />
      </mesh>

      {/* Lily pads */}
      <mesh position={[-1.5, -0.1, 1]} rotation={[-Math.PI / 2, 0, 0.4]}>
        <circleGeometry args={[0.6, 7]} />
        <meshLambertMaterial color="#27ae60" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[2, -0.1, -1]} rotation={[-Math.PI / 2, 0, 1.2]}>
        <circleGeometry args={[0.5, 7]} />
        <meshLambertMaterial color="#27ae60" side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
