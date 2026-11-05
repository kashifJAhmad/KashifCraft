import React from 'react'
import useGameStore from '../../store/gameStore'
import { soundManager } from '../../utils/sounds'

export default function SoundToggle() {
  const isMuted = useGameStore((s) => s.isMuted)
  const toggleMute = useGameStore((s) => s.toggleMute)

  const handleToggle = () => {
    soundManager.init()
    toggleMute()
    soundManager.setMuted(!isMuted)
    if (isMuted) {
      soundManager.play('select')
    }
  }

  return (
    <button
      onClick={handleToggle}
      className="mc-btn flex items-center gap-2 bg-gray-800/90 hover:bg-gray-700 text-white px-3 py-2 rounded text-xs select-none pointer-events-auto shadow-md"
      title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
    >
      <span className="text-base">{isMuted ? '🔇' : '🔊'}</span>
      <span className="font-pixel text-[9px] hidden sm:inline">
        {isMuted ? 'SOUND: OFF' : 'SOUND: ON'}
      </span>
    </button>
  )
}
