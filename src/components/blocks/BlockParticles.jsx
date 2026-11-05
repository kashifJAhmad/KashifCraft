import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import useReducedMotion from '../../utils/useReducedMotion'

export default function BlockParticles({ position, color, onComplete }) {
  const groupRef = useRef()
  const startTime = useRef(Date.now())
  const completed = useRef(false)
  const reducedMotion = useReducedMotion()

  const particles = useMemo(() => {
    return Array.from({ length: 16 }, () => ({
      offset: [
        (Math.random() - 0.5) * 0.6,
        (Math.random() - 0.5) * 0.6,
        (Math.random() - 0.5) * 0.6,
      ],
      velocity: [
        (Math.random() - 0.5) * 4,
        Math.random() * 4 + 1.5,
        (Math.random() - 0.5) * 4,
      ],
      size: 0.12 + Math.random() * 0.08,
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
    }))
  }, [])

  useFrame((_, delta) => {
    const elapsed = (Date.now() - startTime.current) / 1000
    const lifetime = reducedMotion ? 0.15 : 0.8
    if (elapsed > lifetime) {
      if (completed.current) return
      completed.current = true
      onComplete?.()
      return
    }

    if (reducedMotion) return
    if (!groupRef.current) return
    groupRef.current.children.forEach((child, i) => {
      const p = particles[i]
      if (!p) return
      p.velocity[1] -= 12 * delta // gravity
      child.position.x += p.velocity[0] * delta
      child.position.y += p.velocity[1] * delta
      child.position.z += p.velocity[2] * delta
      child.rotation.x += delta * 5
      child.rotation.y += delta * 5
      if (child.material) {
        child.material.opacity = Math.max(0, 1 - elapsed / lifetime)
      }
    })
  })

  return (
    <group ref={groupRef} position={position}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.offset} scale={p.size}>
          <boxGeometry />
          <meshLambertMaterial color={color} transparent opacity={1} />
        </mesh>
      ))}
    </group>
  )
}
