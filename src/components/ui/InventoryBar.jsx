import React, { useEffect } from 'react'
import useGameStore from '../../store/gameStore'
import { BLOCK_TYPES } from '../../data/blockTypes'
import { soundManager } from '../../utils/sounds'

export default function InventoryBar() {
  const selectedBlock = useGameStore((s) => s.selectedBlock)
  const setSelectedBlock = useGameStore((s) => s.setSelectedBlock)
  const discoveredJourney = useGameStore((s) => s.discoveredJourney)
  const activePanel = useGameStore((s) => s.activePanel)

  // Listen to keyboard numbers 1 to 6
  useEffect(() => {
    const handleKeyDown = (e) => {
      const target = e.target
      if (
        activePanel ||
        target?.isContentEditable ||
        ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(target?.tagName) ||
        target?.closest?.('[role="dialog"]')
      ) return

      const num = parseInt(e.key, 10)
      if (num >= 1 && num <= BLOCK_TYPES.length) {
        const idx = num - 1
        setSelectedBlock(idx)
        soundManager.play('select')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePanel, setSelectedBlock])

  const handleSelect = (idx) => {
    setSelectedBlock(idx)
    soundManager.play('select')
  }

  const activeDef = BLOCK_TYPES[selectedBlock] || BLOCK_TYPES[0]

  return (
    <div className="flex max-w-full flex-col items-center pointer-events-auto select-none" role="group" aria-label="Block inventory">
      <div className="mb-2 text-center">
        <p className="font-pixel text-[8px] sm:text-[9px] text-yellow-300">BUILD YOUR JOURNEY</p>
        <p className="font-sans text-[11px] sm:text-xs text-white/90 mt-1">Select a block → Place it → Discover your story.</p>
      </div>
      {/* Selected Block Info / Tooltip Banner */}
      <div className="mb-2 max-w-full bg-black/75 px-3 py-1 rounded text-center border border-gray-600 shadow-md" aria-live="polite">
        <span className="font-pixel text-[10px] text-yellow-300">
          [{selectedBlock + 1}] {activeDef.name} Block
        </span>
        <span className="font-pixel text-[9px] text-gray-300 ml-2">
          → Unlocks: {activeDef.journeyLabel}
        </span>
      </div>

      {/* Hotbar Container */}
      <div className="flex items-center gap-0.5 sm:gap-1.5 p-1 bg-[#8b8b8b] border-4 border-t-[#ffffff] border-l-[#ffffff] border-b-[#373737] border-r-[#373737] shadow-2xl rounded-sm">
        {BLOCK_TYPES.map((block, idx) => {
          const isSelected = selectedBlock === idx
          const isDiscovered = discoveredJourney[block.id]

          return (
            <button
              type="button"
              key={block.id}
              onClick={() => handleSelect(idx)}
              aria-label={`Select ${block.name} block, unlocks ${block.journeyLabel}`}
              aria-pressed={isSelected}
              className={`relative mc-slot cursor-pointer transition-all duration-100 ${
                isSelected
                  ? 'border-2 border-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.7)] z-10'
                  : 'hover:border-gray-300'
              }`}
              style={{
                backgroundColor: block.color,
              }}
                title={`[${idx + 1}] ${block.name}: ${block.journeyLabel}`}
            >
              {/* Slot Number in top-left */}
              <span className="absolute top-0.5 left-1 font-pixel text-[8px] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
                {idx + 1}
              </span>

              {/* Icon Emoji */}
              <span className="text-xl filter drop-shadow" aria-hidden="true">{block.emoji}</span>

              {/* Journey Unlocked Indicator */}
              {isDiscovered && (
                <span
                  className="absolute bottom-0.5 right-0.5 text-[8px] text-yellow-300 font-bold"
                  title="Journey milestone unlocked!"
                >
                  ★
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
