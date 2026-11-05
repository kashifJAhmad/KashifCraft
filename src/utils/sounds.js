class SoundManager {
  constructor() {
    this.ctx = null
    this.muted = false
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)()
    }
  }

  setMuted(val) {
    this.muted = val
  }

  play(type) {
    if (this.muted) return
    if (!this.ctx) this.init()
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      const t = this.ctx.currentTime

      switch (type) {
        case 'break': {
          osc.type = 'square'
          osc.frequency.setValueAtTime(200, t)
          osc.frequency.exponentialRampToValueAtTime(80, t + 0.15)
          gain.gain.setValueAtTime(0.25, t)
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15)
          osc.start(t)
          osc.stop(t + 0.15)
          break
        }
        case 'place': {
          osc.type = 'square'
          osc.frequency.setValueAtTime(300, t)
          osc.frequency.exponentialRampToValueAtTime(500, t + 0.08)
          gain.gain.setValueAtTime(0.2, t)
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08)
          osc.start(t)
          osc.stop(t + 0.08)
          break
        }
        case 'crack': {
          osc.type = 'sawtooth'
          osc.frequency.setValueAtTime(150, t)
          osc.frequency.exponentialRampToValueAtTime(100, t + 0.06)
          gain.gain.setValueAtTime(0.15, t)
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.06)
          osc.start(t)
          osc.stop(t + 0.06)
          break
        }
        case 'discover': {
          osc.type = 'sine'
          osc.frequency.setValueAtTime(523, t)
          osc.frequency.setValueAtTime(659, t + 0.1)
          osc.frequency.setValueAtTime(784, t + 0.2)
          gain.gain.setValueAtTime(0.2, t)
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4)
          osc.start(t)
          osc.stop(t + 0.4)
          // Harmony
          const o2 = this.ctx.createOscillator()
          const g2 = this.ctx.createGain()
          o2.connect(g2)
          g2.connect(this.ctx.destination)
          o2.type = 'sine'
          o2.frequency.setValueAtTime(784, t + 0.1)
          o2.frequency.setValueAtTime(988, t + 0.2)
          o2.frequency.setValueAtTime(1047, t + 0.3)
          g2.gain.setValueAtTime(0.1, t + 0.1)
          g2.gain.exponentialRampToValueAtTime(0.01, t + 0.5)
          o2.start(t + 0.1)
          o2.stop(t + 0.5)
          break
        }
        case 'open': {
          osc.type = 'triangle'
          osc.frequency.setValueAtTime(250, t)
          osc.frequency.exponentialRampToValueAtTime(400, t + 0.1)
          gain.gain.setValueAtTime(0.15, t)
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12)
          osc.start(t)
          osc.stop(t + 0.12)
          break
        }
        case 'close': {
          osc.type = 'triangle'
          osc.frequency.setValueAtTime(400, t)
          osc.frequency.exponentialRampToValueAtTime(200, t + 0.1)
          gain.gain.setValueAtTime(0.15, t)
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12)
          osc.start(t)
          osc.stop(t + 0.12)
          break
        }
        case 'select': {
          osc.type = 'square'
          osc.frequency.setValueAtTime(600, t)
          gain.gain.setValueAtTime(0.08, t)
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.04)
          osc.start(t)
          osc.stop(t + 0.04)
          break
        }
        default:
          osc.disconnect()
          gain.disconnect()
          return
      }
    } catch {
      // Sound is non-critical — fail silently
    }
  }
}

export const soundManager = new SoundManager()
