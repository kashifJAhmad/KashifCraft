import React, { useState, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { STRUCTURE_INFO } from '../../data/blockTypes'
import useGameStore from '../../store/gameStore'
import { soundManager } from '../../utils/sounds'
import { getTexture } from '../../utils/textures'
import useReducedMotion from '../../utils/useReducedMotion'

// Floating Label for 3D structures
function FloatingLabel({ name, subtitle, emoji, isHovered }) {
  return (
    <Html
      position={[0, 5.2, 0]}
      center
      distanceFactor={18}
      zIndexRange={[20, 0]}
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: `scale(${isHovered ? 1.15 : 1})`,
      }}
    >
      <div className="flex flex-col items-center whitespace-nowrap">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-sm font-pixel text-[10px] text-white shadow-xl border-2 ${
            isHovered
              ? 'bg-mc-green/95 border-yellow-300 ring-2 ring-yellow-400'
              : 'bg-black/80 border-gray-400'
          }`}
          style={{ imageRendering: 'pixelated' }}
        >
          <span className="text-sm">{emoji}</span>
          <div className="text-left">
            <div className="font-bold text-yellow-300">{name}</div>
            <div className="text-[8px] text-gray-200">{subtitle}</div>
          </div>
        </div>
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black/80"></div>
      </div>
    </Html>
  )
}

// 1. Wooden House: About Me
function WoodenHouse({ isHovered }) {
  return (
    <group>
      {/* House Body (Oak Planks) */}
      <mesh position={[0, 1.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 3.5, 4.5]} />
        <meshLambertMaterial map={getTexture(isHovered ? '#a37a1e' : '#8B6914')} color="white" />
      </mesh>
      {/* Corner Log Pillars */}
      {[-2.2, 2.2].map((x) =>
        [-2.2, 2.2].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 1.75, z]}>
            <boxGeometry args={[0.7, 3.6, 0.7]} />
            <meshLambertMaterial color="#5c4033" />
          </mesh>
        ))
      )}
      {/* Pitched Roof */}
      <mesh position={[0, 3.9, 0]}>
        <coneGeometry args={[3.8, 1.8, 4]} />
        <meshLambertMaterial color="#4a3525" />
      </mesh>
      {/* Door */}
      <mesh position={[0, 1.1, 2.28]}>
        <boxGeometry args={[1, 2.2, 0.1]} />
        <meshLambertMaterial color="#332211" />
      </mesh>
      {/* Glass Windows */}
      <mesh position={[-1.3, 1.8, 2.28]}>
        <boxGeometry args={[0.9, 0.9, 0.05]} />
        <meshLambertMaterial color="#add8e6" transparent opacity={0.8} />
      </mesh>
      <mesh position={[1.3, 1.8, 2.28]}>
        <boxGeometry args={[0.9, 0.9, 0.05]} />
        <meshLambertMaterial color="#add8e6" transparent opacity={0.8} />
      </mesh>
      {/* Porch Torch */}
      <mesh position={[0.8, 2.3, 2.35]}>
        <boxGeometry args={[0.12, 0.45, 0.12]} />
        <meshLambertMaterial color="#ffaa00" />
      </mesh>
    </group>
  )
}

// 2. Mining Area: Technical Skills
function MiningArea({ isHovered }) {
  return (
    <group>
      {/* Cave rock mass */}
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[5, 4, 4.5]} />
        <meshLambertMaterial map={getTexture(isHovered ? '#95a5a6' : '#7f8c8d')} color="white" />
      </mesh>
      {/* Cave Opening Arch */}
      <mesh position={[0, 1.3, 1.8]}>
        <boxGeometry args={[2.4, 2.6, 1.2]} />
        <meshLambertMaterial color="#1c2833" />
      </mesh>
      {/* Wooden Arch Supports */}
      <mesh position={[-1.25, 1.3, 2.35]}>
        <boxGeometry args={[0.35, 2.7, 0.35]} />
        <meshLambertMaterial color="#5c4033" />
      </mesh>
      <mesh position={[1.25, 1.3, 2.35]}>
        <boxGeometry args={[0.35, 2.7, 0.35]} />
        <meshLambertMaterial color="#5c4033" />
      </mesh>
      <mesh position={[0, 2.6, 2.35]}>
        <boxGeometry args={[2.85, 0.35, 0.35]} />
        <meshLambertMaterial color="#5c4033" />
      </mesh>
      {/* Minecart Tracks extending out */}
      <mesh position={[0, 0.05, 2.5]}>
        <boxGeometry args={[1.4, 0.1, 1.8]} />
        <meshLambertMaterial color="#4a4a4a" />
      </mesh>
      {/* Ore veins (Iron / Redstone) */}
      <mesh position={[1.8, 3, 2.27]}>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshLambertMaterial color="#d4ac0d" />
      </mesh>
      <mesh position={[-1.7, 2.8, 2.27]}>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshLambertMaterial color="#e74c3c" />
      </mesh>
    </group>
  )
}

// 3. Construction Zone: Projects
function ConstructionZone({ isHovered }) {
  return (
    <group>
      {/* Building foundation */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[4.8, 2.4, 4.8]} />
        <meshLambertMaterial map={getTexture(isHovered ? '#e67e22' : '#d35400')} color="white" />
      </mesh>
      {/* Yellow Scaffolding Tower */}
      <mesh position={[1.6, 3.2, 1.6]}>
        <boxGeometry args={[1, 4.4, 1]} />
        <meshLambertMaterial color="#f1c40f" />
      </mesh>
      {/* Crane Boom Arm */}
      <mesh position={[0.8, 5.2, 1.6]}>
        <boxGeometry args={[3.2, 0.35, 0.35]} />
        <meshLambertMaterial color="#f39c12" />
      </mesh>
      {/* Suspended Hook/Crate */}
      <mesh position={[-0.6, 4.2, 1.6]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshLambertMaterial color="#8e44ad" />
      </mesh>
      {/* Warning Hazard Blocks */}
      {[-1.8, -0.6, 0.6, 1.8].map((x, i) => (
        <mesh key={i} position={[x, 0.3, 2.5]}>
          <boxGeometry args={[0.5, 0.6, 0.5]} />
          <meshLambertMaterial color={i % 2 === 0 ? '#f1c40f' : '#2c3e50'} />
        </mesh>
      ))}
    </group>
  )
}

// 4. Diamond Palace: Achievements
function DiamondPalace({ isHovered }) {
  const crystalRef = useRef()
  const reducedMotion = useReducedMotion()

  useFrame(({ clock }) => {
    if (!reducedMotion && crystalRef.current) {
      crystalRef.current.rotation.y = clock.getElapsedTime() * 1.5
    }
  })

  return (
    <group>
      {/* Grand Diamond Base */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[4.6, 3.6, 4.6]} />
        <meshLambertMaterial map={getTexture(isHovered ? '#6ef5e3' : '#4AEDD9')} color="white" />
      </mesh>
      {/* 4 Majestic Golden Corner Pillars */}
      {[-2.2, 2.2].map((x) =>
        [-2.2, 2.2].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 2.6, z]}>
            <boxGeometry args={[0.7, 5.2, 0.7]} />
            <meshLambertMaterial color="#f1c40f" />
          </mesh>
        ))
      )}
      {/* Roof Pedestal */}
      <mesh position={[0, 3.9, 0]}>
        <boxGeometry args={[3.2, 0.8, 3.2]} />
        <meshLambertMaterial color="#1abc9c" />
      </mesh>
      {/* Floating Trophy Crystal Beacon */}
      <mesh ref={crystalRef} position={[0, 5, 0]}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial color="#00ffff" roughness={0.1} metalness={0.8} />
      </mesh>
    </group>
  )
}

// 5. Library: Education
function Library({ isHovered }) {
  return (
    <group>
      {/* Library Structure */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[5, 4, 4.5]} />
        <meshLambertMaterial map={getTexture(isHovered ? '#ba7a47' : '#9c5b2a')} color="white" />
      </mesh>
      {/* Roof trim with dark logs */}
      <mesh position={[0, 4.2, 0]}>
        <boxGeometry args={[5.4, 0.6, 4.9]} />
        <meshLambertMaterial color="#4a2e18" />
      </mesh>
      {/* Bookshelf pattern visible on front */}
      <mesh position={[-1.4, 2, 2.28]}>
        <boxGeometry args={[1.2, 1.8, 0.05]} />
        <meshLambertMaterial color="#8a5a36" />
      </mesh>
      <mesh position={[1.4, 2, 2.28]}>
        <boxGeometry args={[1.2, 1.8, 0.05]} />
        <meshLambertMaterial color="#8a5a36" />
      </mesh>
      {/* Reading Lectern out front */}
      <mesh position={[0, 0.7, 2.6]}>
        <boxGeometry args={[0.6, 1.2, 0.6]} />
        <meshLambertMaterial color="#5c4033" />
      </mesh>
      {/* Open Book on Lectern */}
      <mesh position={[0, 1.35, 2.6]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.6]} />
        <meshLambertMaterial color="#e74c3c" />
      </mesh>
    </group>
  )
}

// 6. Village: Contact
function Village({ isHovered }) {
  return (
    <group>
      {/* Village Hut 1 */}
      <mesh position={[-1.5, 1.5, 0]}>
        <boxGeometry args={[3, 3, 3]} />
        <meshLambertMaterial map={getTexture(isHovered ? '#f39c12' : '#d68910')} color="white" />
      </mesh>
      <mesh position={[-1.5, 3.3, 0]}>
        <coneGeometry args={[2.5, 1.5, 4]} />
        <meshLambertMaterial color="#784212" />
      </mesh>
      {/* Village Hut 2 (smaller market stall) */}
      <mesh position={[1.8, 1.2, 0]}>
        <boxGeometry args={[2.2, 2.4, 2.2]} />
        <meshLambertMaterial color="#e59866" />
      </mesh>
      <mesh position={[1.8, 2.7, 0]}>
        <coneGeometry args={[1.8, 1.2, 4]} />
        <meshLambertMaterial color="#b9770e" />
      </mesh>
      {/* Street Lantern Post */}
      <mesh position={[0, 1.6, 2]}>
        <boxGeometry args={[0.2, 3.2, 0.2]} />
        <meshLambertMaterial color="#4a4a4a" />
      </mesh>
      <mesh position={[0, 3.2, 2]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial color="#f39c12" />
      </mesh>
    </group>
  )
}

// Player Character: Steve-inspired 3D Voxel Avatar
function PlayerCharacter({ labelVisible }) {
  const charRef = useRef()
  const reducedMotion = useReducedMotion()

  useFrame(({ clock }) => {
    if (!reducedMotion && charRef.current) {
      // Gentle idle breathing / bobbing
      charRef.current.position.y = 0.5 + Math.sin(clock.getElapsedTime() * 2) * 0.05
    }
  })

  return (
    <group ref={charRef} position={[0, 0.5, 5]} rotation={[0, Math.PI, 0]}>
      {/* Head */}
      <mesh position={[0, 2.4, 0]}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshLambertMaterial color="#b9770e" />
      </mesh>
      {/* Hair */}
      <mesh position={[0, 2.65, 0]}>
        <boxGeometry args={[0.72, 0.25, 0.72]} />
        <meshLambertMaterial color="#4a2e18" />
      </mesh>
      {/* Torso (Cyan Shirt) */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.7, 0.9, 0.4]} />
        <meshLambertMaterial color="#00bcd4" />
      </mesh>
      {/* Left Arm */}
      <mesh position={[-0.5, 1.45, 0]}>
        <boxGeometry args={[0.3, 0.85, 0.35]} />
        <meshLambertMaterial color="#00acc1" />
      </mesh>
      {/* Right Arm holding Pickaxe */}
      <group position={[0.5, 1.45, 0]} rotation={[0.4, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.3, 0.85, 0.35]} />
          <meshLambertMaterial color="#00acc1" />
        </mesh>
        {/* Diamond Pickaxe in hand */}
        <mesh position={[0, -0.4, 0.3]} rotation={[0.7, 0, 0]}>
          <boxGeometry args={[0.1, 0.8, 0.1]} />
          <meshLambertMaterial color="#5c4033" />
        </mesh>
        <mesh position={[0, -0.05, 0.6]}>
          <boxGeometry args={[0.12, 0.2, 0.5]} />
          <meshLambertMaterial color="#4AEDD9" />
        </mesh>
      </group>
      {/* Left Leg (Blue Jeans) */}
      <mesh position={[-0.2, 0.5, 0]}>
        <boxGeometry args={[0.32, 1, 0.35]} />
        <meshLambertMaterial color="#1a237e" />
      </mesh>
      {/* Right Leg (Blue Jeans) */}
      <mesh position={[0.2, 0.5, 0]}>
        <boxGeometry args={[0.32, 1, 0.35]} />
        <meshLambertMaterial color="#1a237e" />
      </mesh>
      {/* Name tag above player */}
      {labelVisible && (
        <Html position={[0, 3.2, 0]} center distanceFactor={14} zIndexRange={[20, 0]}>
          <div className="bg-black/80 px-2 py-0.5 rounded text-[8px] font-pixel text-green-400 whitespace-nowrap border border-green-500">
            Kashif Ahmad
          </div>
        </Html>
      )}
    </group>
  )
}

// Single Interactive Structure Container
function InteractiveStructure({ info, labelsVisible }) {
  const [isHovered, setIsHovered] = useState(false)
  const setActivePanel = useGameStore((s) => s.setActivePanel)

  useEffect(() => {
    if (!labelsVisible) {
      setIsHovered(false)
      document.body.style.cursor = 'auto'
    }
  }, [labelsVisible])

  const handleClick = (e) => {
    e.stopPropagation()
    soundManager.play('open')
    setActivePanel(info.panel)
  }

  const renderModel = () => {
    switch (info.id) {
      case 'about':
        return <WoodenHouse isHovered={isHovered} />
      case 'skills':
        return <MiningArea isHovered={isHovered} />
      case 'projects':
        return <ConstructionZone isHovered={isHovered} />
      case 'achievements':
        return <DiamondPalace isHovered={isHovered} />
      case 'education':
        return <Library isHovered={isHovered} />
      case 'contact':
        return <Village isHovered={isHovered} />
      default:
        return null
    }
  }

  return (
    <group
      position={info.position}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation()
        setIsHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setIsHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      {renderModel()}
      {labelsVisible && (
        <FloatingLabel
          name={info.name}
          subtitle={info.subtitle}
          emoji={info.emoji}
          isHovered={isHovered}
        />
      )}
      {/* Invisible bounding click box to ensure easy clicking */}
      <mesh position={[0, 2, 0]} visible={false}>
        <boxGeometry args={[6, 5, 6]} />
        <meshBasicMaterial />
      </mesh>
    </group>
  )
}

export default function Structures() {
  const activePanel = useGameStore((s) => s.activePanel)
  const labelsVisible = !activePanel

  return (
    <group>
      {STRUCTURE_INFO.map((info) => (
        <InteractiveStructure key={info.id} info={info} labelsVisible={labelsVisible} />
      ))}
      <PlayerCharacter labelVisible={labelsVisible} />
    </group>
  )
}
