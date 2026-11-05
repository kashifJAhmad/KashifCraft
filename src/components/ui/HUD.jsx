import React, { useEffect } from 'react'
import useGameStore from '../../store/gameStore'
import InventoryBar from './InventoryBar'
import SoundToggle from './SoundToggle'
import NavigationMenu from './NavigationMenu'
import { BLOCK_TYPES } from '../../data/blockTypes'

export default function HUD({ onTogglePortfolioView, isPortfolioView }) {
  const toast = useGameStore((s) => s.toast)
  const clearToast = useGameStore((s) => s.clearToast)
  const discoveredJourney = useGameStore((s) => s.discoveredJourney)

  // Auto clear toast after 3.5 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        clearToast()
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [toast, clearToast])

  const discoveredCount = Object.keys(discoveredJourney).length

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 sm:p-5 select-none overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex items-start justify-between w-full">
        {/* Navigation Menu (Top Left) */}
        <NavigationMenu
          onTogglePortfolioView={onTogglePortfolioView}
          isPortfolioView={isPortfolioView}
        />

        {/* Center Hint & Progress Banner */}
        <div className="hidden md:flex flex-col items-center pointer-events-auto bg-black/75 px-4 py-2 rounded border border-gray-600 shadow-xl max-w-md text-center">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-yellow-400">🔨</span>
            <span className="font-pixel text-[9px] text-yellow-300">
              BUILD MY DEVELOPER JOURNEY
            </span>
          </div>
          <p className="text-[10px] text-gray-300 font-sans leading-tight">
            Place blocks in the center build zone to reveal milestones. Click buildings to explore portfolio sections.
          </p>

          {/* Milestone Badges */}
          <div className="flex items-center gap-1.5 mt-2">
            <span className="font-pixel text-[8px] text-gray-400 mr-1">
              {discoveredCount}/{BLOCK_TYPES.length} Unlocked:
            </span>
            {BLOCK_TYPES.map((b) => (
              <span
                key={b.id}
                className={`text-xs px-1 rounded transition-opacity ${
                  discoveredJourney[b.id]
                    ? 'opacity-100 bg-green-900/80 border border-green-500 scale-110'
                    : 'opacity-35 grayscale'
                }`}
                title={`${b.name} (${b.journeyLabel}): ${
                  discoveredJourney[b.id] ? 'Unlocked!' : 'Locked - Place in build area'
                }`}
              >
                {b.emoji}
              </span>
            ))}
          </div>
        </div>

        {/* Sound Toggle (Top Right) */}
        <div className="flex items-center gap-2">
          <SoundToggle />
        </div>
      </div>

      {/* Center Reticle / Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="relative w-5 h-5 flex items-center justify-center">
          <div className="absolute w-[2px] h-4 bg-white/70 shadow-sm" />
          <div className="absolute w-4 h-[2px] bg-white/70 shadow-sm" />
          <div className="w-1 h-1 bg-white/90 rounded-full" />
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-auto animate-slide-up z-40">
          <div className="flex items-center gap-2 bg-[#1b5e20] text-white px-4 py-2.5 rounded border-2 border-[#4caf50] shadow-2xl">
            <span className="text-base animate-bounce">✨</span>
            <span className="font-pixel text-xs text-yellow-200">{toast}</span>
          </div>
        </div>
      )}

      {/* Bottom Inventory Bar */}
      <div className="w-full flex justify-center pb-1">
        <InventoryBar />
      </div>
    </div>
  )
}
