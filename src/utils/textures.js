import * as THREE from 'three'

const cache = new Map()

function makePixelCanvas(baseColor, variation = 0.16, size = 64) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  const r = parseInt(baseColor.slice(1, 3), 16)
  const g = parseInt(baseColor.slice(3, 5), 16)
  const b = parseInt(baseColor.slice(5, 7), 16)

  let seed = [...baseColor].reduce((value, char) => (value * 31 + char.charCodeAt(0)) >>> 0, 2166136261)
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const v = 1 + (random() - 0.5) * variation * 2
      const pr = Math.min(255, Math.max(0, Math.round(r * v)))
      const pg = Math.min(255, Math.max(0, Math.round(g * v)))
      const pb = Math.min(255, Math.max(0, Math.round(b * v)))
      ctx.fillStyle = `rgb(${pr},${pg},${pb})`
      ctx.fillRect(x, y, 1, 1)
    }
  }

  // Crisp clustered pixels give each procedural tile a voxel texture.
  const cellSize = Math.max(2, Math.floor(size / 16))
  for (let x = 0; x < size; x += cellSize) {
    for (let y = 0; y < size; y += cellSize) {
      if (random() > 0.72) {
        ctx.fillStyle = random() > 0.5 ? 'rgba(255,255,255,0.13)' : 'rgba(0,0,0,0.13)'
        ctx.fillRect(x, y, cellSize, cellSize)
      }
    }
  }

  return canvas
}

export function getTexture(color, variation = 0.16, size = 64) {
  const key = `${color}_${variation}_${size}`
  if (!cache.has(key)) {
    const canvas = makePixelCanvas(color, variation, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.magFilter = THREE.NearestFilter
    tex.minFilter = THREE.NearestFilter
    tex.colorSpace = THREE.SRGBColorSpace
    cache.set(key, tex)
  }
  return cache.get(key)
}

export function getMultiMaterial(topColor, sideColor) {
  const key = `multi_${topColor}_${sideColor}`
  if (!cache.has(key)) {
    const sideTex = getTexture(sideColor)
    const topTex = getTexture(topColor)
    cache.set(key, [
      new THREE.MeshLambertMaterial({ map: sideTex }),  // +X
      new THREE.MeshLambertMaterial({ map: sideTex }),  // -X
      new THREE.MeshLambertMaterial({ map: topTex }),   // +Y
      new THREE.MeshLambertMaterial({ map: sideTex }),  // -Y
      new THREE.MeshLambertMaterial({ map: sideTex }),  // +Z
      new THREE.MeshLambertMaterial({ map: sideTex }),  // -Z
    ])
  }
  return cache.get(key)
}
