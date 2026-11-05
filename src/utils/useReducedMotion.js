import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function getMediaQuery() {
  return typeof window !== 'undefined' ? window.matchMedia(QUERY) : null
}

function subscribe(callback) {
  const mediaQuery = getMediaQuery()
  if (!mediaQuery) return () => {}

  mediaQuery.addEventListener('change', callback)
  return () => mediaQuery.removeEventListener('change', callback)
}

function getSnapshot() {
  return getMediaQuery()?.matches ?? false
}

export default function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
