import { useRef } from 'react'
import { useAnimationFrame } from '../../hooks/useAnimationFrame'
import type { Turntable } from './turntable'

const WIDTH = 520
const HEIGHT = 64
const STEP = 8 // px between samples

// x positions and the sine envelope that pins both ends to the midline never change.
const SAMPLES = Array.from({ length: WIDTH / STEP + 1 }, (_, i) => {
  const u = (i * STEP) / WIDTH
  return { x: i * STEP, u, envelope: Math.sin(Math.PI * u) }
})

function trace(offset: (u: number) => number) {
  return 'M' + SAMPLES.map(({ x, u, envelope }) => `${x} ${(HEIGHT / 2 + envelope * offset(u)).toFixed(1)}`).join(' L')
}

const amplitude = (energy: number) => 5 + energy * 22

const leadWave = (phase: number, amp: number) =>
  trace((u) => amp * (0.7 * Math.sin(u * 18 - phase * 4) + 0.3 * Math.sin(u * 41 - phase * 7.3)))

const echoWave = (phase: number, amp: number) => trace((u) => amp * 0.6 * Math.sin(u * 12 - phase * 2.6 + 1.3))

/** Oscilloscope line under the name; gets louder and faster as the disc spins. */
export default function Waveform({ turntable }: { turntable: Turntable }) {
  const svg = useRef<SVGSVGElement>(null)
  const lead = useRef<SVGPathElement>(null)
  const echo = useRef<SVGPathElement>(null)

  useAnimationFrame(svg, (_, now) => {
    turntable.advance(now)
    const amp = amplitude(turntable.energy)
    lead.current!.setAttribute('d', leadWave(turntable.phase, amp))
    echo.current!.setAttribute('d', echoWave(turntable.phase, amp))
  })

  return (
    <svg
      ref={svg}
      className="waveform"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path ref={echo} className="waveform__echo" d={echoWave(0, amplitude(0))} />
      <path ref={lead} className="waveform__lead" d={leadWave(0, amplitude(0))} />
    </svg>
  )
}
