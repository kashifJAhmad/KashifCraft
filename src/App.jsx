import React, { useState, useEffect } from 'react'
import useGameStore from './store/gameStore'
import WelcomeScreen from './components/WelcomeScreen'
import GameWorld from './components/world/GameWorld'
import HUD from './components/ui/HUD'
import InfoPanel from './components/ui/InfoPanel'
import ProfessionalPortfolio from './components/portfolio/ProfessionalPortfolio'

export default function App() {
  const screen = useGameStore((s) => s.screen)
  const [isPortfolioView, setIsPortfolioView] = useState(false)

  // Detect mobile device on mount: on very small mobile screens, default portfolio view option is available
  useEffect(() => {
    if (window.innerWidth < 640) {
      // Keep in game screen if user hits explore, but enable easy switching
    }
  }, [])

  if (screen === 'welcome') {
    return <WelcomeScreen />
  }

  if (isPortfolioView) {
    return (
      <ProfessionalPortfolio
        onBackToGame={() => setIsPortfolioView(false)}
      />
    )
  }

  return (
    <div className="game-app relative w-full h-full overflow-hidden bg-[#87CEEB]">
      <main className="game-world-viewport" aria-label="Interactive 3D portfolio world">
        <GameWorld />
      </main>

      <HUD
        onTogglePortfolioView={() => setIsPortfolioView(true)}
        isPortfolioView={isPortfolioView}
      />
      <InfoPanel />
    </div>
  )
}
