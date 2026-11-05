import React, { useMemo } from 'react'
import { getTexture } from '../../utils/textures'

function Tree({ position, height = 4, leafColor = '#2e7d32', trunkColor = '#5c4033', variant = 0 }) {
  const [x, z] = position
  const canopyLayers = [
    [[3, 1, 3], [2.5, 1, 2.5], [1.5, 0.8, 1.5]],
    [[3.6, 1, 3.6], [2.8, 1, 2.8], [1.8, 0.8, 1.8]],
    [[2.5, 1, 2.5], [2.2, 1, 2.2], [2, 0.8, 2]],
  ][variant % 3]

  return (
    <group position={[x, 0.5, z]}>
      {/* Trunk */}
      <mesh position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[variant === 2 ? 0.75 : 0.9, height, variant === 2 ? 0.75 : 0.9]} />
        <meshLambertMaterial map={getTexture(trunkColor, 0.2)} color="white" />
      </mesh>

      {/* Canopy Layer 1 (Lower broad leaves) */}
      <mesh position={[0, height - 0.5, 0]} castShadow>
        <boxGeometry args={canopyLayers[0]} />
        <meshLambertMaterial map={getTexture(leafColor, 0.12)} color="white" />
      </mesh>

      {/* Canopy Layer 2 (Middle leaves) */}
      <mesh position={[0, height + 0.5, 0]} castShadow>
        <boxGeometry args={canopyLayers[1]} />
        <meshLambertMaterial map={getTexture(leafColor, 0.12)} color="white" />
      </mesh>

      {/* Canopy Layer 3 (Top leaves) */}
      <mesh position={[0, height + 1.3, 0]} castShadow>
        <boxGeometry args={canopyLayers[2]} />
        <meshLambertMaterial map={getTexture(leafColor, 0.12)} color="white" />
      </mesh>
    </group>
  )
}

export default function Trees() {
  const treePositions = useMemo(() => [
    { pos: [-8, -4], h: 4, leaves: '#2e7d32' },
    { pos: [-20, -10], h: 5, leaves: '#1b5e20' },
    { pos: [-18, 5], h: 4, leaves: '#388e3c' },
    { pos: [-7, 14], h: 5, leaves: '#2e7d32' },
    { pos: [8, -15], h: 4, leaves: '#2e7d32' },
    { pos: [20, -4], h: 4, leaves: '#388e3c' },
    { pos: [7, 7], h: 4, leaves: '#1b5e20' },
    { pos: [-10, 8], h: 5, leaves: '#2e7d32' },
    { pos: [10, -12], h: 4, leaves: '#43a047' },
    { pos: [-20, 18], h: 5, leaves: '#2e7d32' },
    { pos: [18, -12], h: 4, leaves: '#1b5e20' },
    { pos: [-7, -19], h: 4, leaves: '#2e7d32' },
    { pos: [8, 18], h: 4, leaves: '#388e3c' },
    { pos: [-18, -6], h: 5, leaves: '#1b5e20' },
    { pos: [20, 10], h: 4, leaves: '#2e7d32' },
    { pos: [12, 5], h: 5, leaves: '#43a047' },
    { pos: [-12, -18], h: 4, leaves: '#2e7d32' },
    { pos: [5, -20], h: 4, leaves: '#1b5e20' },
  ], [])

  return (
    <group>
      {treePositions.map((t, idx) => (
        <Tree
          key={idx}
          position={t.pos}
          height={t.h}
          leafColor={t.leaves}
          variant={idx % 3}
        />
      ))}
    </group>
  )
}
