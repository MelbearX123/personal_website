import { useRef } from 'react'
import { useAnimationFrame } from '../../hooks/useAnimationFrame'
import { usePointer } from '../../hooks/usePointer'
import { idleSeconds } from '../../lib/motion'

const VIEW = { width: 320, height: 180 }
const TRAIL_MS = 700
const MAX_TRAIL_POINTS = 40
const PINCH_MS = 600
const REST_BEFORE_PINCH = 450 // ms the pointer must rest before the cursor "clicks"
const MIN_PINCH_GAP = 900
const IDLE_PINCH_GAP = 2200

interface TrailPoint {
  x: number
  y: number
  at: number
}

/** A hand-tracking cursor: follows the pointer with a fading trail and "pinches" when it rests. */
export default function CursorPreview() {
  const root = useRef<HTMLDivElement>(null)
  const trailPath = useRef<SVGPathElement>(null)
  const cursor = useRef<SVGGElement>(null)
  const ring = useRef<SVGCircleElement>(null)
  const ripple = useRef<SVGCircleElement>(null)
  const { pointer, handlers } = usePointer()
  const trail = useRef<TrailPoint[]>([]).current
  const pinchedAt = useRef(-Infinity)

  useAnimationFrame(root, (_, now) => {
    let x: number
    let y: number
    if (pointer.inside) {
      x = pointer.x * VIEW.width
      y = pointer.y * VIEW.height
      const resting = now - pointer.movedAt > REST_BEFORE_PINCH
      if (resting && now - pinchedAt.current > MIN_PINCH_GAP) pinchedAt.current = now
    } else {
      const t = idleSeconds(now)
      x = 160 + 92 * Math.sin(t * 1.3)
      y = 90 + 44 * Math.sin(t * 2.6)
      if (now - pinchedAt.current > IDLE_PINCH_GAP) pinchedAt.current = now
    }

    trail.push({ x, y, at: now })
    while (trail.length > MAX_TRAIL_POINTS || now - trail[0].at > TRAIL_MS) trail.shift()
    trailPath.current!.setAttribute('d', 'M' + trail.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L'))
    cursor.current!.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`)

    const pinch = (now - pinchedAt.current) / PINCH_MS // 0→1 while a pinch plays
    const pinching = pinch < 1
    ring.current!.setAttribute('r', pinching ? (9 - 4 * Math.sin(pinch * Math.PI)).toFixed(2) : '9')
    ripple.current!.setAttribute('r', pinching ? (9 + pinch * 28).toFixed(1) : '0')
    ripple.current!.setAttribute('opacity', pinching ? ((1 - pinch) * 0.9).toFixed(2) : '0')
  })

  return (
    <div ref={root} className="preview preview--cursor" {...handlers}>
      <svg viewBox={`0 0 ${VIEW.width} ${VIEW.height}`} fill="none">
        <path ref={trailPath} stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
        <g ref={cursor} transform="translate(160 90)">
          <circle ref={ripple} r="0" stroke="var(--accent)" strokeWidth="1.2" opacity="0" />
          <circle r="18" stroke="var(--ink)" strokeDasharray="2 4" opacity="0.5" />
          <circle ref={ring} r="9" stroke="var(--ink)" strokeWidth="1.4" />
          <circle r="1.6" fill="var(--ink)" />
        </g>
      </svg>
    </div>
  )
}
