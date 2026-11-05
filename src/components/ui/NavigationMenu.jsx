import React, { useState } from 'react'
import useGameStore from '../../store/gameStore'
import { soundManager } from '../../utils/sounds'

const NAV_ITEMS = [
  { id: 'about', label: 'About', icon: '🏠' },
  { id: 'skills', label: 'Skills', icon: '⛏️' },
  { id: 'projects', label: 'Projects', icon: '🏗️' },
  { id: 'achievements', label: 'Achievements', icon: '💎' },
  { id: 'education', label: 'Education', icon: '📚' },
  { id: 'contact', label: 'Contact', icon: '🏘️' },
  { id: 'goals', label: 'Goals', icon: '🎯' },
]

export default function NavigationMenu({ onTogglePortfolioView, isPortfolioView }) {
  const setActivePanel = useGameStore((s) => s.setActivePanel)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (panelId) => {
    soundManager.play('open')
    setActivePanel(panelId)
    setMobileMenuOpen(false)
  }

  return (
    <div className="pointer-events-auto select-none">
      {/* Desktop Navigation Bar */}
      <div className="hidden lg:flex items-center gap-1.5 p-1.5 bg-black/80 backdrop-blur-md rounded border-2 border-gray-600 shadow-xl">
        <span className="font-pixel text-[9px] text-green-400 px-2 border-r border-gray-600">
          KashifCraft
        </span>

        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className="mc-btn flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-800/80 hover:bg-gray-700 text-white rounded text-[9px] font-pixel transition-all hover:scale-105"
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}

        {/* 2D / 3D Mode Toggle */}
        <button
          onClick={onTogglePortfolioView}
          className="mc-btn ml-2 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded text-[9px] font-pixel border border-emerald-400 shadow-sm"
        >
          <span>{isPortfolioView ? '🎮 3D World' : '📄 2D Portfolio'}</span>
        </button>
      </div>

      {/* Mobile / Tablet Compact Bar */}
      <div className="lg:hidden flex items-center gap-2">
        <button
          onClick={() => setMobileMenuOpen((o) => !o)}
          className="mc-btn flex items-center gap-1.5 px-3 py-2 bg-black/80 text-white rounded font-pixel text-xs border border-gray-600 shadow-lg"
        >
          <span>☰</span>
          <span>MENU</span>
        </button>

        <button
          onClick={onTogglePortfolioView}
          className="mc-btn flex items-center gap-1 px-3 py-2 bg-emerald-800 text-white rounded font-pixel text-[9px] border border-emerald-400 shadow-lg"
        >
          <span>{isPortfolioView ? '🎮 3D' : '📄 2D'}</span>
        </button>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-14 left-4 z-50 flex flex-col gap-1.5 p-2 bg-black/90 backdrop-blur-md rounded border-2 border-gray-600 shadow-2xl min-w-[180px]">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="mc-btn flex items-center gap-2 px-3 py-2 text-left bg-gray-800 hover:bg-gray-700 text-white rounded text-[10px] font-pixel"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
