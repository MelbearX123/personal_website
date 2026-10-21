import { type PointerEvent, useRef } from 'react'
import { useAnimationFrame } from '../../hooks/useAnimationFrame'
import type { Turntable } from './turntable'

const SCRATCH_DEGREES = 18 // drag distance per emitted note

interface Grip {
  centerX: number
  centerY: number
  angle: number // deg, pointer angle around the center at the last move
  travel: number // deg dragged since the last scratch
}

interface DiscProps {
  turntable: Turntable
  onScratch: () => void
}

/** The draggable platter. Rotation comes from the shared turntable; this only renders it and feeds it drags. */
export default function Disc({ turntable, onScratch }: DiscProps) {
  const platter = useRef<HTMLDivElement>(null)
  const grip = useRef<Grip | null>(null)

  useAnimationFrame(platter, (_, now) => {
    turntable.advance(now)
    platter.current!.style.transform = `rotate(${turntable.rotation}deg)`
  })

  const angleTo = (e: PointerEvent, { centerX, centerY }: Grip) =>
    (Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180) / Math.PI

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const g = { centerX: rect.left + rect.width / 2, centerY: rect.top + rect.height / 2, angle: 0, travel: 0 }
    g.angle = angleTo(e, g)
    grip.current = g
    e.currentTarget.setPointerCapture(e.pointerId)
    turntable.grab(e.timeStamp)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const g = grip.current
    if (!g) return
    const angle = angleTo(e, g)
    // Shortest signed difference, so crossing the ±180° seam doesn't jump.
    const delta = ((angle - g.angle + 540) % 360) - 180
    g.angle = angle
    turntable.drag(delta, e.timeStamp)

    g.travel += Math.abs(delta)
    if (g.travel > SCRATCH_DEGREES) {
      g.travel = 0
      onScratch()
    }
  }

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!grip.current) return
    grip.current = null
    turntable.release(e.timeStamp)
  }

  return (
    <div
      ref={platter}
      className="disc"
      aria-hidden="true"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="disc__label" />
    </div>
  )
}
