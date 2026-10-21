import { useRef } from 'react'
import { useAnimationFrame } from '../../hooks/useAnimationFrame'
import { usePointer } from '../../hooks/usePointer'
import { angleDelta, clamp, damp, idleSeconds } from '../../lib/motion'

const VIEW = { width: 320, height: 180 }
const HINGE = { x: 150, y: 72 } // where the shade pivots
const FOLLOW_RATE = 6.7

const aimAt = (x: number, y: number) => (Math.atan2(y - HINGE.y, x - HINGE.x) * 180) / Math.PI

/** Light cone from the shade's lip toward (x, y), in the head's rotated frame; widens with reach. */
function beamPoints(x: number, y: number) {
  const reach = clamp(Math.hypot(x - HINGE.x, y - HINGE.y) - 24, 30, 220)
  const end = (24 + reach).toFixed(1)
  const halfWidth = (15 + reach * 0.38).toFixed(1)
  return `24,-15 24,15 ${end},${halfWidth} ${end},-${halfWidth}`
}

/** A desk lamp whose head tracks the pointer, and idly wanders when there isn't one. */
export default function LampPreview() {
  const root = useRef<HTMLDivElement>(null)
  const spot = useRef<SVGCircleElement>(null)
  const head = useRef<SVGGElement>(null)
  const beam = useRef<SVGPolygonElement>(null)
  const { pointer, handlers } = usePointer()
  const lamp = useRef({ x: 230, y: 140, angle: aimAt(230, 140) }).current

  useAnimationFrame(root, (dt, now) => {
    const t = idleSeconds(now)
    const targetX = pointer.inside ? pointer.x * VIEW.width : 230 + 45 * Math.sin(t * 0.7)
    const targetY = pointer.inside ? pointer.y * VIEW.height : 140 + 14 * Math.sin(t * 1.1)
    lamp.x = damp(lamp.x, targetX, FOLLOW_RATE, dt)
    lamp.y = damp(lamp.y, targetY, FOLLOW_RATE, dt)
    lamp.angle = damp(lamp.angle, lamp.angle + angleDelta(lamp.angle, aimAt(lamp.x, lamp.y)), FOLLOW_RATE, dt)

    spot.current!.setAttribute('cx', lamp.x.toFixed(1))
    spot.current!.setAttribute('cy', lamp.y.toFixed(1))
    head.current!.setAttribute('transform', `translate(${HINGE.x} ${HINGE.y}) rotate(${lamp.angle.toFixed(1)})`)
    beam.current!.setAttribute('points', beamPoints(lamp.x, lamp.y))
  })

  return (
    <div ref={root} className="preview preview--lamp" {...handlers}>
      <div className="dots preview__dots" />
      <svg viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}>
        <defs>
          <linearGradient id="lamp-beam">
            <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="lamp-spot">
            <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle ref={spot} cx={lamp.x} cy={lamp.y} r="34" fill="url(#lamp-spot)" />
        <ellipse cx="96" cy="164" rx="30" ry="6" fill="var(--ink)" opacity="0.85" />
        <path d="M96 160 L118 112 L150 72" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="118" cy="112" r="4.5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
        <g ref={head} transform={`translate(${HINGE.x} ${HINGE.y}) rotate(${lamp.angle})`}>
          <polygon ref={beam} points={beamPoints(lamp.x, lamp.y)} fill="url(#lamp-beam)" />
          <path d="M-4 -5 L24 -16 L24 16 L-4 5 Z" fill="var(--ink)" />
          <circle r="5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
          <ellipse cx="25" rx="2.5" ry="14" fill="#fff" />
        </g>
      </svg>
    </div>
  )
}
