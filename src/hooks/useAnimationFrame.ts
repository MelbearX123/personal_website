import { type RefObject, useEffect, useRef } from 'react'

export type FrameCallback = (dt: number, now: number) => void

/**
 * Runs `onFrame` once per animation frame while `target` is on screen, so
 * off-screen animations cost nothing. `dt` is in seconds (capped to avoid a
 * jump after the loop resumes); `now` is the rAF timestamp in milliseconds.
 *
 * Callbacks should write to the DOM directly rather than set React state.
 */
export function useAnimationFrame(target: RefObject<Element>, onFrame: FrameCallback) {
  const callback = useRef(onFrame)
  callback.current = onFrame

  useEffect(() => {
    const element = target.current
    if (!element) return

    let frame = 0
    let last = 0
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      callback.current(dt, now)
      frame = requestAnimationFrame(loop)
    }

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame)
      if (entry.isIntersecting) {
        last = performance.now()
        frame = requestAnimationFrame(loop)
      }
    })
    observer.observe(element)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target])
}
