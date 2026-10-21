import { useRef } from 'react'
import { EMAIL, SOCIALS } from '../content'
import { useAnimationFrame } from '../hooks/useAnimationFrame'
import { idleSeconds } from '../lib/motion'
import './Contact.css'

const MERIDIANS = 12
const SPIN_RATE = 0.2 // rad/s
const LATITUDES = [
  { cy: 100, rx: 90, ry: 14 },
  { cy: 55, rx: 78, ry: 12 },
  { cy: 145, rx: 78, ry: 12 },
  { cy: 25, rx: 50, ry: 7 },
  { cy: 175, rx: 50, ry: 7 },
]

/** Pole-to-pole arc for a meridian at `longitude`; meridians on the far side are dimmed. */
function meridian(longitude: number) {
  const sin = Math.sin(longitude)
  return {
    d: `M100 10 A${Math.abs(90 * sin).toFixed(2)} 90 0 0 ${sin > 0 ? 1 : 0} 100 190`,
    opacity: Math.cos(longitude) > 0 ? '1' : '0.3',
  }
}

const longitudeOf = (index: number, seconds: number) => (index * Math.PI) / (MERIDIANS / 2) + 0.3 + seconds * SPIN_RATE

/** Slowly rotating wireframe globe. */
function Globe() {
  const svg = useRef<SVGSVGElement>(null)
  const meridians = useRef<SVGPathElement[]>([])

  useAnimationFrame(svg, (_, now) => {
    const seconds = idleSeconds(now)
    meridians.current.forEach((path, i) => {
      const { d, opacity } = meridian(longitudeOf(i, seconds))
      path.setAttribute('d', d)
      path.setAttribute('opacity', opacity)
    })
  })

  return (
    <svg ref={svg} className="globe" viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <circle cx="100" cy="100" r="90" />
      {Array.from({ length: MERIDIANS }, (_, i) => {
        const { d, opacity } = meridian(longitudeOf(i, 0))
        return <path key={i} ref={(el) => (meridians.current[i] = el!)} d={d} opacity={opacity} />
      })}
      {LATITUDES.map(({ cy, rx, ry }) => (
        <ellipse key={cy} cx="100" cy={cy} rx={rx} ry={ry} />
      ))}
    </svg>
  )
}

export default function Contact() {
  return (
    <footer id="contact" className="section contact">
      <div className="contact__panel">
        <Globe />

        <div className="contact__main">
          <div className="contact__intro">
            <span className="mono contact__eyebrow">contact</span>
            <h2 className="contact__heading">Let's keep in touch.</h2>
            <a className="contact__email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <div className="contact__links">
            {SOCIALS.map((social) => (
              <a key={social.label} className="btn" href={social.href} target="_blank" rel="noreferrer">
                {social.label} ↗
              </a>
            ))}
            <a className="btn btn--light" href={`mailto:${EMAIL}`}>email</a>
          </div>
        </div>

        <p className="mono contact__legal">© {new Date().getFullYear()} Melodie Xiong</p>
      </div>
    </footer>
  )
}
