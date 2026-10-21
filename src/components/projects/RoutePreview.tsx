import { useRef } from 'react'
import { useAnimationFrame } from '../../hooks/useAnimationFrame'
import { clamp01 } from '../../lib/motion'

const CYCLE_MS = 4200
const TARGETS = [
  { y: 40, branch: 'V40 H272' },
  { y: 90, branch: 'H272' },
  { y: 140, branch: 'V140 H272' },
]

/**
 * A breadth-first search in miniature: the tree draws itself, the route to
 * this cycle's target lights up, the target pings, then everything fades.
 * Each cycle picks the next target; hovering restarts the sequence.
 */
export default function RoutePreview() {
  const svg = useRef<SVGSVGElement>(null)
  const trunk = useRef<SVGPathElement>(null)
  const branches = useRef<SVGGElement>(null)
  const junction = useRef<SVGCircleElement>(null)
  const leaves = useRef<SVGGElement>(null)
  const route = useRef<SVGPathElement>(null)
  const target = useRef<SVGGElement>(null)
  const targetDot = useRef<SVGCircleElement>(null)
  const ping = useRef<SVGCircleElement>(null)
  const startedAt = useRef(0)
  const shownCycle = useRef(-1)

  useAnimationFrame(svg, (_, now) => {
    // A hover can land a hair after this frame's timestamp; never run the clock backwards.
    const elapsed = Math.max(0, now - startedAt.current)
    const cycle = Math.floor(elapsed / CYCLE_MS)
    const t = elapsed % CYCLE_MS
    // 0→1 over [start, start + duration] ms of the cycle.
    const progress = (start: number, duration: number) => clamp01((t - start) / duration)

    if (cycle !== shownCycle.current) {
      shownCycle.current = cycle
      const { y, branch } = TARGETS[cycle % TARGETS.length]
      route.current!.setAttribute('d', `M44 90 H150 ${branch}`)
      target.current!.setAttribute('transform', `translate(272 ${y})`)
    }

    // Lines are drawn by sliding a dash along them (pathLength = 1).
    trunk.current!.setAttribute('stroke-dashoffset', String(1 - progress(0, 700)))
    branches.current!.setAttribute('stroke-dashoffset', String(1 - progress(700, 700)))
    junction.current!.setAttribute('opacity', t > 700 ? '1' : '0')
    leaves.current!.setAttribute('opacity', String(progress(1300, 300)))
    route.current!.setAttribute('stroke-dashoffset', String(1 - progress(1700, 800)))
    targetDot.current!.setAttribute('opacity', String(progress(2400, 200)))

    const pinging = t >= 2500 && t <= 3200
    const pingProgress = progress(2500, 700)
    ping.current!.setAttribute('r', String(5 + pingProgress * 16))
    ping.current!.setAttribute('opacity', pinging ? String((1 - pingProgress) * 0.9) : '0')

    svg.current!.setAttribute('opacity', String(1 - progress(3700, 500)))
  })

  return (
    <div className="preview preview--route" onPointerEnter={(e) => (startedAt.current = e.timeStamp)}>
      <svg ref={svg} viewBox="0 0 320 180" fill="none">
        <g stroke="var(--ink)" strokeWidth="1.4" strokeDasharray="1 1" opacity="0.55">
          <path ref={trunk} d="M44 90 H150" pathLength={1} strokeDashoffset="1" />
          <g ref={branches} strokeDashoffset="1">
            <path d="M150 90 V40 H272" pathLength={1} />
            <path d="M150 90 H272" pathLength={1} />
            <path d="M150 90 V140 H272" pathLength={1} />
          </g>
        </g>
        <path ref={route} stroke="var(--accent)" strokeWidth="2.6" pathLength={1} strokeDasharray="1 1" strokeDashoffset="1" />

        <circle cx="44" cy="90" r="5" fill="var(--ink)" />
        <circle ref={junction} cx="150" cy="90" r="3" fill="var(--ink)" opacity="0" />
        <g ref={leaves} fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.4" opacity="0">
          {TARGETS.map(({ y }) => (
            <circle key={y} cx="272" cy={y} r="5" />
          ))}
        </g>
        <g ref={target}>
          <circle ref={targetDot} r="5" fill="var(--accent)" opacity="0" />
          <circle ref={ping} r="5" stroke="var(--accent)" strokeWidth="1.2" opacity="0" />
        </g>
      </svg>
    </div>
  )
}
