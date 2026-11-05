import { useState, useEffect, useMemo } from 'react'
import useGameStore from '../store/gameStore'
import { soundManager } from '../utils/sounds'

const BLOCK_COLORS = ['#5da832', '#8B6914', '#C0C0C0', '#FFD700', '#4AEDD9', '#50C878']

function FloatingBlock({ color, style }) {
  return (
    <div
      className="absolute w-8 h-8 rounded-sm opacity-30"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 15px ${color}50`,
        ...style,
      }}
    />
  )
}

export default function WelcomeScreen() {
  const setScreen = useGameStore((s) => s.setScreen)
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)

  const floatingBlocks = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        color: BLOCK_COLORS[i % BLOCK_COLORS.length],
        style: {
          left: `${5 + Math.random() * 90}%`,
          top: `${5 + Math.random() * 90}%`,
          animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 3}s`,
          transform: `rotate(${Math.random() * 30 - 15}deg) scale(${0.5 + Math.random() * 1})`,
        },
      })),
    []
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 2 + Math.random() * 8
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => setReady(true), 300)
          return 100
        }
        return next
      })
    }, 150)
    return () => clearInterval(interval)
  }, [])

  const handleStart = () => {
    soundManager.init()
    soundManager.play('open')
    setScreen('game')
  }

  return (
    <div className="fixed inset-0 bg-mc-dark flex flex-col items-center justify-center z-50 overflow-hidden select-none">
      {/* Animated background blocks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingBlocks.map((b, i) => (
          <FloatingBlock key={i} color={b.color} style={b.style} />
        ))}
      </div>

      {/* Dirt pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(139,105,20,0.3) 15px, rgba(139,105,20,0.3) 16px), repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(139,105,20,0.3) 15px, rgba(139,105,20,0.3) 16px)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-lg">
        {/* Logo area */}
        <div className="mb-2">
          <div className="flex justify-center gap-1 mb-4">
            {BLOCK_COLORS.map((c, i) => (
              <div
                key={i}
                className="w-5 h-5 md:w-7 md:h-7 rounded-sm animate-float"
                style={{
                  backgroundColor: c,
                  animationDelay: `${i * 0.15}s`,
                  boxShadow: `0 2px 8px ${c}40`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Title */}
        <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-mc-green animate-pulse-glow leading-relaxed">
          KashifCraft
        </h1>
        <p className="font-pixel text-[9px] md:text-xs text-gray-400 mt-2 tracking-wider">
          Build My Journey
        </p>

        {/* Author */}
        <div className="my-8 md:my-10">
          <h2 className="font-pixel text-sm md:text-base text-white mb-3">Kashif Ahmad</h2>
          <p className="font-pixel text-[7px] md:text-[8px] text-gray-400 leading-relaxed">
            Computer Engineering Student
            <br />
            Developer | AI Enthusiast
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs mx-auto mb-8">
          <div className="mc-panel-dark h-7 p-[3px] rounded-sm">
            <div
              className="h-full rounded-sm transition-all duration-200 ease-out"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: 'linear-gradient(180deg, #5da832 0%, #4a8c2a 50%, #3d7522 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
            />
          </div>
          <p className="font-pixel text-[7px] text-gray-500 mt-2">
            {ready ? '✓ World ready!' : `Loading world... ${Math.min(Math.round(progress), 100)}%`}
          </p>
        </div>

        {/* Start button */}
        {ready && (
          <div className="animate-bounce-in">
            <button
              onClick={handleStart}
              className="mc-btn text-sm md:text-base px-8 md:px-12 py-3 
                         bg-mc-green hover:bg-green-500
                         border-t-[3px] border-l-[3px] border-b-[3px] border-r-[3px]
                         border-t-green-400 border-l-green-400 border-b-green-900 border-r-green-900
                         shadow-lg hover:shadow-green-500/30 transition-shadow"
            >
              ⛏ Start Exploring
            </button>
          </div>
        )}

        {/* Footer hint */}
        <p className="font-pixel text-[6px] text-gray-600 mt-10 leading-relaxed">
          Best experienced on desktop
          <br />
          Click buildings to explore • Use hotbar to build
        </p>
      </div>
    </div>
  )
}
