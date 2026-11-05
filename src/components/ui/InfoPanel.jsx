import React, { useCallback, useEffect, useRef, useState } from 'react'
import useGameStore from '../../store/gameStore'
import portfolioData from '../../data/portfolioData'
import { soundManager } from '../../utils/sounds'

const SECTION_ANIMATIONS = {
  about: 'section-motion-door',
  skills: 'section-motion-mining',
  projects: 'section-motion-build',
  achievements: 'section-motion-treasure',
  education: 'section-motion-book',
  contact: 'section-motion-gate',
  goals: 'section-motion-goals',
}

export default function InfoPanel() {
  const activePanel = useGameStore((s) => s.activePanel)
  const setActivePanel = useGameStore((s) => s.setActivePanel)
  const [isClosing, setIsClosing] = useState(false)
  const closeTimer = useRef(null)

  const handleClose = useCallback(() => {
    if (!activePanel || isClosing) return
    soundManager.play('close')
    setIsClosing(true)
    closeTimer.current = window.setTimeout(() => {
      setActivePanel(null)
      setIsClosing(false)
      closeTimer.current = null
    }, 180)
  }, [activePanel, isClosing, setActivePanel])

  useEffect(() => {
    setIsClosing(false)
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
  }, [activePanel])

  useEffect(() => () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
  }, [])

  // Listen to Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activePanel) handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePanel, handleClose])

  if (!activePanel) return null

  const data = portfolioData[activePanel]
  if (!data) return null

  const renderContent = () => {
    switch (activePanel) {
      case 'about':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-gray-900/60 p-3 rounded border border-gray-700">
              <div className="w-12 h-12 bg-mc-green rounded flex items-center justify-center text-2xl border-2 border-white">
                👤
              </div>
              <div>
                <h3 className="font-pixel text-sm text-yellow-300">
                  {data.content.name}
                </h3>
                <p className="text-xs text-green-400 font-mono mt-0.5">
                  {data.content.role}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-200 leading-relaxed bg-black/40 p-4 rounded border border-gray-800">
              {data.content.description}
            </p>

            <div>
              <h4 className="font-pixel text-xs text-yellow-300 mb-2">Key Highlights</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {data.content.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-gray-800/80 p-2.5 rounded border-l-4 border-mc-green text-xs text-gray-200"
                  >
                    <span>✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'skills':
        return (
          <div className="space-y-4">
            {data.categories.map((cat, idx) => (
              <div key={idx} className="bg-gray-900/70 p-3.5 rounded border border-gray-700">
                <h4 className="font-pixel text-[11px] text-yellow-300 mb-2.5">
                  {cat.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded bg-gray-800 text-xs font-mono text-cyan-300 border border-gray-600 shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )

      case 'projects':
        return (
          <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
            {data.items.map((proj, idx) => (
              <div
                key={idx}
                className="bg-gray-900/80 p-4 rounded border-2 border-gray-700 hover:border-mc-green transition-all"
              >
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-pixel text-xs text-yellow-300">
                    {proj.name}
                  </h4>
                  <span className="text-[10px] bg-mc-green/30 text-green-300 px-2 py-0.5 rounded border border-green-600 font-mono">
                    Project #{idx + 1}
                  </span>
                </div>
                <div className="mt-2 space-y-2">
                  <p className="text-xs text-gray-300 leading-relaxed"><strong className="text-gray-100">Overview:</strong> {proj.overview}</p>
                  <p className="text-xs text-gray-400 leading-relaxed"><strong className="text-gray-200">Problem:</strong> {proj.problem}</p>
                  <div>
                    <h5 className="font-pixel text-[8px] text-green-300 mb-1">Main features</h5>
                    <ul className="list-disc list-inside space-y-1 text-xs text-gray-300">
                      {proj.features.map((feature) => <li key={feature}>{feature}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {proj.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="bg-black/60 text-[10px] text-yellow-200 px-2 py-0.5 rounded border border-gray-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )

      case 'achievements':
        return (
          <div className="space-y-3">
            {data.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-gray-900/80 p-3.5 rounded border-2 border-yellow-500/50 hover:border-yellow-400"
              >
                <span className="text-2xl filter drop-shadow">{item.badge}</span>
                <div>
                  <h4 className="font-pixel text-xs text-yellow-300">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )

      case 'education':
        return (
          <div className="space-y-4">
            <div className="bg-gray-900/80 p-5 rounded border-2 border-blue-500/50">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🎓</span>
                <div>
                  <h4 className="font-pixel text-sm text-yellow-300">
                    {data.content.degree}
                  </h4>
                  <span className="inline-block bg-blue-900/60 text-blue-300 text-[10px] font-pixel px-2 py-0.5 rounded border border-blue-600 mt-1">
                    {data.content.status}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                {data.content.description}
              </p>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed">{data.content.institution}</p>
              <p className="text-[10px] text-gray-400 mt-1">{data.content.department}</p>
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="space-y-4">
            <p className="text-xs text-gray-300 leading-relaxed bg-black/40 p-3.5 rounded border border-gray-800">
              {data.note}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-200">
              <p><span className="text-gray-400">Name:</span> {data.name}</p>
              <p><span className="text-gray-400">Location:</span> {data.location}</p>
              <a className="hover:text-yellow-300" href={data.links.email.url}>Email: {data.email}</a>
              <a className="hover:text-yellow-300" href={data.links.phone.url}>Phone: {data.phone}</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={data.links.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mc-btn flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-center py-3 rounded"
              >
                <span>💻</span>
                <span>GitHub</span>
              </a>
              <a
                href={data.links.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mc-btn flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-700 text-center py-3 rounded"
              >
                <span>🔗</span>
                <span>LinkedIn</span>
              </a>
              <a
                href={data.links.email.url}
                className="mc-btn flex items-center justify-center gap-2 bg-red-800 hover:bg-red-700 text-center py-3 rounded"
              >
                <span>✉️</span>
                <span>Email</span>
              </a>
            </div>
          </div>
        )

      case 'goals':
        return (
          <div className="space-y-3">
            {data.items.map((goal, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-gray-900/80 p-3 rounded border-l-4 border-emerald-500 text-xs text-gray-200"
              >
                <span className="font-pixel text-emerald-400">0{idx + 1}</span>
                <span>{goal}</span>
              </div>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4 bg-black/70 backdrop-blur-sm pointer-events-auto select-none animate-fade-in">
      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-panel-title"
        className={`relative w-full max-w-xl max-h-[calc(100dvh-2rem)] overflow-y-auto bg-[#2d2d2d] border-4 border-t-[#ffffff] border-l-[#ffffff] border-b-[#111111] border-r-[#111111] shadow-2xl p-4 sm:p-6 text-white ${isClosing ? 'animate-modal-out' : 'animate-bounce-in'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-gray-700">
          <div className="flex items-center gap-2">
            <span className={`text-2xl ${SECTION_ANIMATIONS[activePanel] || ''}`} aria-hidden="true">{data.icon}</span>
            <h2 id="info-panel-title" className="font-pixel text-sm sm:text-base text-yellow-300">
              {data.title}
            </h2>
          </div>
          <button
            onClick={handleClose}
            aria-label={`Close ${data.title} panel`}
            className="mc-btn px-2.5 py-1 bg-red-800 hover:bg-red-700 text-white font-pixel text-xs rounded"
            title="Close (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Dynamic Body Content */}
        <div className="my-2 space-y-3">
          <p className="text-xs text-gray-400 leading-relaxed">{data.description}</p>
          {renderContent()}
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-gray-700 flex justify-between items-center text-[9px] font-pixel text-gray-400">
          <span>Kashif Ahmad • Portfolio</span>
          <span className="text-gray-500">Press ESC or ✕ to exit</span>
        </div>
      </div>
    </div>
  )
}
