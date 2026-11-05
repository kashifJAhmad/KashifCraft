import { create } from 'zustand'

const useGameStore = create((set) => ({
  // Screen state
  screen: 'welcome', // 'welcome' | 'game'
  setScreen: (screen) => set({ screen }),

  // Selected block type index (0-5 maps to BLOCK_TYPES)
  selectedBlock: 0,
  setSelectedBlock: (idx) => set({ selectedBlock: idx }),

  // Currently open info panel
  activePanel: null, // null | 'about' | 'skills' | 'projects' | 'achievements' | 'education' | 'contact' | 'goals'
  setActivePanel: (panel) => set({ activePanel: panel }),

  // Blocks broken by the player (Set of "x,y,z" position keys)
  brokenBlocks: new Set(),
  breakBlock: (key) => set((state) => {
    const next = new Set(state.brokenBlocks)
    next.add(key)
    return { brokenBlocks: next }
  }),

  // Blocks placed by the player (Map of "x,y,z" → block type index)
  placedBlocks: {},
  placeBlock: (key, typeIdx) => set((state) => ({
    placedBlocks: { ...state.placedBlocks, [key]: typeIdx }
  })),
  removeBlock: (key) => set((state) => {
    const next = { ...state.placedBlocks }
    delete next[key]
    return { placedBlocks: next }
  }),

  // Sound
  isMuted: false,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  // Build Area journey discovery
  discoveredJourney: {},
  discoverJourney: (blockId) => set((state) => {
    if (state.discoveredJourney[blockId]) return state
    return { discoveredJourney: { ...state.discoveredJourney, [blockId]: true } }
  }),

  // Toast notifications
  toast: null,
  showToast: (msg) => set({ toast: msg }),
  clearToast: () => set({ toast: null }),
}))

export default useGameStore
