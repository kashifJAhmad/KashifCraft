import React, { useState, useCallback, useEffect, useRef } from 'react'
import * as THREE from 'three'
import useGameStore from '../../store/gameStore'
import { BLOCK_TYPES, BUILD_AREA } from '../../data/blockTypes'
import { soundManager } from '../../utils/sounds'
import BreakableBlock from './BreakableBlock'
import BlockParticles from './BlockParticles'

export default function BlockManager() {
  const selectedBlock = useGameStore((s) => s.selectedBlock)
  const placedBlocks = useGameStore((s) => s.placedBlocks)
  const placeBlock = useGameStore((s) => s.placeBlock)
  const removeBlock = useGameStore((s) => s.removeBlock)
  const discoverJourney = useGameStore((s) => s.discoverJourney)
  const discoveredJourney = useGameStore((s) => s.discoveredJourney)
  const showToast = useGameStore((s) => s.showToast)
  const [hoverPos, setHoverPos] = useState(null)
  const [particles, setParticles] = useState([])
  const hasSeededStarterBlocks = useRef(false)

  // Seed a couple of initial starter blocks in the build area so the user immediately sees interactable blocks!
  useEffect(() => {
    if (!hasSeededStarterBlocks.current && Object.keys(placedBlocks).length === 0) {
      hasSeededStarterBlocks.current = true
      placeBlock('0,1,0', 4) // Diamond block in center
      placeBlock('1,1,0', 0) // Grass block next to it
      placeBlock('-1,1,0', 1) // Wood block
      placeBlock('0,1,1', 3) // Gold block
      ;[4, 0, 1, 3].forEach((typeIdx) => discoverJourney(BLOCK_TYPES[typeIdx].id))
    }
  }, [placeBlock, placedBlocks, discoverJourney])

  const unlockMilestone = useCallback((typeIdx) => {
    const blockDef = BLOCK_TYPES[typeIdx]
    if (!blockDef || discoveredJourney[blockDef.id]) return

    discoverJourney(blockDef.id)
    soundManager.play('discover')
    showToast(`${blockDef.emoji} Journey Unlocked: ${blockDef.journeyLabel}!`)
  }, [discoveredJourney, discoverJourney, showToast])

  // Handle pointer move over build floor for ghost placement
  const handlePointerMove = useCallback((e) => {
    e.stopPropagation()
    const point = e.point
    const x = Math.round(point.x)
    const z = Math.round(point.z)
    if (
      x >= BUILD_AREA.minX &&
      x <= BUILD_AREA.maxX &&
      z >= BUILD_AREA.minZ &&
      z <= BUILD_AREA.maxZ
    ) {
      setHoverPos([x, BUILD_AREA.y, z])
    } else {
      setHoverPos(null)
    }
  }, [])

  const handlePointerOut = useCallback(() => {
    setHoverPos(null)
  }, [])

  const handleHoverAbove = useCallback((position) => {
    const [x, y, z] = position
    setHoverPos(y + 1 < 6 ? [x, y + 1, z] : null)
  }, [])

  // Handle clicking on build floor to place a block
  const handleBuildFloorClick = useCallback(
    (e) => {
      e.stopPropagation()
      const point = e.point
      const x = Math.round(point.x)
      const z = Math.round(point.z)

      if (
        x < BUILD_AREA.minX ||
        x > BUILD_AREA.maxX ||
        z < BUILD_AREA.minZ ||
        z > BUILD_AREA.maxZ
      ) {
        return
      }

      // Check current height at this coordinate
      let targetY = BUILD_AREA.y
      while (placedBlocks[`${x},${targetY},${z}`] !== undefined && targetY < 6) {
        targetY += 1
      }
      if (targetY >= 6) return // Max height limit

      const key = `${x},${targetY},${z}`
      placeBlock(key, selectedBlock)
      soundManager.play('place')

      unlockMilestone(selectedBlock)
    },
    [selectedBlock, placedBlocks, placeBlock, unlockMilestone]
  )

  const handlePlaceAbove = useCallback((position) => {
    const [x, y, z] = position
    const targetY = y + 1
    if (targetY >= 6 || placedBlocks[`${x},${targetY},${z}`] !== undefined) return

    placeBlock(`${x},${targetY},${z}`, selectedBlock)
    soundManager.play('place')
    unlockMilestone(selectedBlock)
  }, [placedBlocks, placeBlock, selectedBlock, unlockMilestone])

  // Handle breaking a placed block
  const handleBreakBlock = useCallback(
    (key, position, color) => {
      removeBlock(key)

      // Add particle effect
      const particleId = `${Date.now()}-${Math.random()}`
      setParticles((prev) => [...prev, { id: particleId, position, color }])
    },
    [removeBlock]
  )

  const handleParticleComplete = useCallback((id) => {
    setParticles((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const activeColor = BLOCK_TYPES[selectedBlock]?.color || '#5da832'

  return (
    <group>
      {/* Placed blocks in the world */}
      {Object.entries(placedBlocks).map(([key, typeIdx]) => {
        const [x, y, z] = key.split(',').map(Number)
        const blockType = BLOCK_TYPES[typeIdx] || BLOCK_TYPES[0]
        return (
          <BreakableBlock
            key={key}
            blockKey={key}
            position={[x, y, z]}
            color={blockType.color}
            onBreak={handleBreakBlock}
            onPlaceAbove={handlePlaceAbove}
            onHoverAbove={handleHoverAbove}
            onHoverOut={handlePointerOut}
          />
        )
      })}

      {/* Ghost Preview Block when hovering in build area */}
      {hoverPos && (
        <mesh position={hoverPos}>
          <boxGeometry args={[1.01, 1.01, 1.01]} />
          <meshLambertMaterial
            color={activeColor}
            transparent
            opacity={0.4}
            wireframe={false}
          />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.02, 1.02, 1.02)]} />
            <lineBasicMaterial color="#ffffff" linewidth={2} />
          </lineSegments>
        </mesh>
      )}

      {/* Active Particle Systems */}
      {particles.map((p) => (
        <BlockParticles
          key={p.id}
          position={p.position}
          color={p.color}
          onComplete={() => handleParticleComplete(p.id)}
        />
      ))}

      {/* Invisible Build Area raycast plane at y=0.51 */}
      <mesh
        position={[-0.5, 0.52, -0.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        onClick={handleBuildFloorClick}
        visible={true}
      >
        <planeGeometry args={[8, 8]} />
        <meshBasicMaterial
          color="#f1c40f"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
