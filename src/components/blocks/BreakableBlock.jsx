import React, { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { soundManager } from '../../utils/sounds'
import useReducedMotion from '../../utils/useReducedMotion'

export default function BreakableBlock({ position, color, blockKey, onBreak, onPlaceAbove, onHoverAbove, onHoverOut }) {
  const [stage, setStage] = useState(0) // 0 to 3
  const [isHovered, setIsHovered] = useState(false)
  const meshRef = useRef()
  const groupRef = useRef()
  const reducedMotion = useReducedMotion()
  const scaleRef = useRef(reducedMotion ? 1 : 0.3)

  // Placement bounce animation
  useFrame((_, delta) => {
    if (!groupRef.current) return
    scaleRef.current = reducedMotion ? 1 : Math.min(1, scaleRef.current + delta * 5)
    groupRef.current.scale.setScalar(scaleRef.current)
  })

  const handleClick = (e) => {
    e.stopPropagation()

    if (e.shiftKey) {
      onPlaceAbove(position)
      return
    }

    const nextStage = stage + 1

    if (nextStage >= 3) {
      soundManager.play('break')
      onBreak(blockKey, position, color)
    } else {
      setStage(nextStage)
      soundManager.play('crack')
    }
  }

  // Visual darken as it cracks
  const displayColor = new THREE.Color(color)
  if (stage > 0) {
    displayColor.multiplyScalar(1 - stage * 0.15)
  }

  return (
    <group ref={groupRef} position={position} scale={reducedMotion ? 1 : scaleRef.current}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setIsHovered(true)
          document.body.style.cursor = 'crosshair'
        }}
        onPointerMove={(e) => {
          e.stopPropagation()
          onHoverAbove(position)
        }}
        onPointerOut={() => {
          setIsHovered(false)
          document.body.style.cursor = 'auto'
          onHoverOut()
        }}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.98, 0.98, 0.98]} />
        <meshLambertMaterial
          color={displayColor}
          emissive={isHovered ? displayColor : '#000000'}
          emissiveIntensity={isHovered ? 0.2 : 0}
        />

        {/* Crack lines overlay when damaged */}
        {stage > 0 && (
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.99, 0.99, 0.99)]} />
            <lineBasicMaterial
              color="#000000"
              linewidth={stage * 2}
              transparent
              opacity={0.3 + stage * 0.25}
            />
          </lineSegments>
        )}
      </mesh>
    </group>
  )
}
