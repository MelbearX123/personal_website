import { clamp, prefersReducedMotion } from '../../lib/motion'

const IDLE_SPIN = 27 // deg/s
const KICK = 480 // deg/s added by the "spin the disc" button
const MAX_FLICK = 900 // deg/s, cap on the speed a drag can release with
const FLICK_WINDOW = 100 // ms; holding still longer than this before letting go releases with no spin
const DECAY_PER_SECOND = 0.2 // fraction of velocity and energy left after one second
const FULL_ENERGY_SPEED = 600 // deg/s at which the waveform is fully excited

/**
 * Shared simulation behind the hero: the disc's rotation and momentum, and
 * the "energy" those produce, which drives the waveform. Plain mutable state,
 * read by render loops, so animating it never re-renders React.
 */
export class Turntable {
  rotation = 0 // deg
  velocity = 0 // deg/s
  energy = 0 // 0–1
  phase = 0 // waveform phase; advances faster with energy

  private held = false
  private lastTime = 0
  private flick = 0
  private lastDragAt = 0

  /**
   * Advances the simulation to `now` (ms). Several render loops may call
   * this in the same frame; only the first call per timestamp steps it.
   */
  advance(now: number) {
    if (now === this.lastTime) return
    const dt = this.lastTime ? Math.min((now - this.lastTime) / 1000, 0.1) : 0
    this.lastTime = now

    const decay = DECAY_PER_SECOND ** dt
    this.velocity *= decay
    this.energy = Math.max(this.energy * decay, Math.min(1, Math.abs(this.velocity) / FULL_ENERGY_SPEED))

    const ambient = prefersReducedMotion ? 0 : 1
    const idleSpin = this.held ? 0 : IDLE_SPIN * ambient
    this.rotation = (this.rotation + (this.velocity + idleSpin) * dt) % 360
    this.phase += (ambient + this.energy * 7) * dt
  }

  /** `at` here and below is the pointer event's timestamp (ms). */
  grab(at: number) {
    this.held = true
    this.velocity = 0
    this.lastDragAt = at
  }

  /** Turns the held disc by `degrees`. */
  drag(degrees: number, at: number) {
    const elapsed = (at - this.lastDragAt) / 1000
    this.flick = elapsed > 0 ? degrees / elapsed : 0
    this.lastDragAt = at
    this.rotation += degrees
    this.energy = Math.min(1, this.energy + Math.abs(degrees) / 45)
  }

  release(at: number) {
    this.held = false
    const stillMoving = at - this.lastDragAt < FLICK_WINDOW
    this.velocity = stillMoving ? clamp(this.flick, -MAX_FLICK, MAX_FLICK) : 0
  }

  kick() {
    this.velocity += KICK
    this.energy = 1
  }
}
