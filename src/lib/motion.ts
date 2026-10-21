export const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export const clamp01 = (value: number) => clamp(value, 0, 1)

/** Frame-rate independent exponential smoothing of `current` toward `target`. Higher `rate` is snappier. */
export const damp = (current: number, target: number, rate: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-rate * dt))

/** Signed shortest turn (deg, −180–180) from angle `from` to angle `to`. */
export const angleDelta = (from: number, to: number) => ((((to - from) % 360) + 540) % 360) - 180

/** Clock (s) for ambient, non-interactive motion; frozen when the user prefers reduced motion. */
export const idleSeconds = (now: number) => (prefersReducedMotion ? 0 : now / 1000)

export const pick =<T,>(items: readonly T[]): T => items[Math.floor(Math.random() * items.length)]
