import { type PointerEvent, useRef } from 'react'
import { clamp01 } from '../lib/motion'

export interface PointerState {
  inside: boolean
  x: number // 0–1 across the element
  y: number // 0–1 down the element
  movedAt: number // event timestamp (ms), same clock as requestAnimationFrame
}

/** Tracks the pointer over an element for a render loop to read, without re-rendering. */
export function usePointer() {
  const pointer = useRef<PointerState>({ inside: false, x: 0.5, y: 0.5, movedAt: 0 }).current

  const handlers = {
    onPointerMove(e: PointerEvent<Element>) {
      const rect = e.currentTarget.getBoundingClientRect()
      pointer.inside = true
      pointer.x = clamp01((e.clientX - rect.left) / rect.width)
      pointer.y = clamp01((e.clientY - rect.top) / rect.height)
      pointer.movedAt = e.timeStamp
    },
    onPointerLeave() {
      pointer.inside = false
    },
  }

  return { pointer, handlers }
}
