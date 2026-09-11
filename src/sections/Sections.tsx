import { useEffect, useRef } from 'react'
import './sections.css'
import miovisionLogo from '../assets/miovisonlogo.png'
import port443Logo from '../assets/port443logo.png'
import wargLogo from '../assets/warglogo.png'
import waterlooLogo from '../assets/waterloologo.png'
import lampPreview from '../assets/lamp.png'
import chromaforgePreview from '../assets/chromaforge.png'
import handcursorPreview from '../assets/preview-handcursorx.svg'
import modbotPreview from '../assets/modbot.png'

function VinylDisc({
  size = 340,
  className = '',
  spinning = true,
}: {
  size?: number
  className?: string
  spinning?: boolean
}) {
  const platterRef = useRef<HTMLDivElement>(null)
  const angleRef = useRef(0)
  const draggingRef = useRef(false)
  const centreRef = useRef({ x: 0, y: 0 })
  const lastPointerAngleRef = useRef(0)
  const lastNoteAtRef = useRef(0)

  const spawnNote = () => {
    const staff = document.querySelector('.hero__staff') as SVGSVGElement | null
    if (!staff) return
    const ns = 'http://www.w3.org/2000/svg'
    const glyphs = ['♪', '♫', '♩', '♬']
    const lineIndex = 1 + Math.floor(Math.random() * 5)

    const g = document.createElementNS(ns, 'g')
    g.setAttribute('class', 'staff-note')

    const text = document.createElementNS(ns, 'text')
    text.textContent = glyphs[Math.floor(Math.random() * glyphs.length)]
    text.setAttribute('font-size', String(24 + Math.random() * 10))
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('dominant-baseline', 'middle')
    g.appendChild(text)

    const motion = document.createElementNS(ns, 'animateMotion')
    motion.setAttribute('dur', `${2.2 + Math.random() * 1.2}s`)
    motion.setAttribute('fill', 'freeze')
    motion.setAttribute('rotate', 'auto')
    motion.setAttribute('calcMode', 'spline')
    motion.setAttribute('keyTimes', '0;1')
    motion.setAttribute('keySplines', '0.22 0.61 0.36 1')
    const mpath = document.createElementNS(ns, 'mpath')
    mpath.setAttribute('href', `#staff-line-${lineIndex}`)
    motion.appendChild(mpath)
    g.appendChild(motion)

    const fade = document.createElementNS(ns, 'animate')
    fade.setAttribute('attributeName', 'opacity')
    fade.setAttribute('values', '0;1;1;0')
    fade.setAttribute('keyTimes', '0;0.15;0.75;1')
    fade.setAttribute('dur', motion.getAttribute('dur') as string)
    fade.setAttribute('fill', 'freeze')
    g.appendChild(fade)

    staff.appendChild(g)
    ;(motion as unknown as { beginElement?: () => void }).beginElement?.()
    ;(fade as unknown as { beginElement?: () => void }).beginElement?.()

    const durMs = parseFloat(motion.getAttribute('dur') as string) * 1000
    setTimeout(() => g.remove(), durMs + 200)
  }

  useEffect(() => {
    if (!spinning) return
    let raf = 0
    let prev = performance.now()
    const degPerSec = 360 / 10

    const tick = (now: number) => {
      const dt = (now - prev) / 1000
      prev = now
      if (!draggingRef.current) {
        angleRef.current += degPerSec * dt
      }
      const el = platterRef.current
      if (el) el.style.transform = `rotate(${angleRef.current}deg)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [spinning])

  const pointerAngle = (clientX: number, clientY: number) => {
    const c = centreRef.current
    return (Math.atan2(clientY - c.y, clientX - c.x) * 180) / Math.PI
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = platterRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    centreRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
    lastPointerAngleRef.current = pointerAngle(e.clientX, e.clientY)
    draggingRef.current = true
    el.setPointerCapture(e.pointerId)
    el.classList.add('is-scrubbing')
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    const a = pointerAngle(e.clientX, e.clientY)
    let delta = a - lastPointerAngleRef.current
    if (delta > 180) delta -= 360
    if (delta < -180) delta += 360
    angleRef.current += delta
    lastPointerAngleRef.current = a
    const el = platterRef.current
    if (el) el.style.transform = `rotate(${angleRef.current}deg)`

    const now = performance.now()
    if (Math.abs(delta) > 0.5 && now - lastNoteAtRef.current > 130) {
      lastNoteAtRef.current = now
      spawnNote()
    }
  }

  const endScrub = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false
    const el = platterRef.current
    if (!el) return
    try { el.releasePointerCapture(e.pointerId) } catch { /* noop */ }
    el.classList.remove('is-scrubbing')
  }

  return (
    <div className={`disc ${className}`} style={{ width: size, height: size }}>
      <div className="disc__glow" />
      <div
        className="disc__platter"
        ref={platterRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endScrub}
        onPointerCancel={endScrub}
      >
        <div className="disc__grooves" />
        <div className="disc__shine" />
        <div className="disc__label">
          <span className="disc__label-ring" />
          <svg className="disc__label-text" viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <path id="disc-arc-top" d="M 12 50 A 38 38 0 0 1 88 50" fill="none" />
            </defs>
            <text className="disc__label-word">
              <textPath href="#disc-arc-top" startOffset="50%" textAnchor="middle">
                SPIN&nbsp;·&nbsp;ME
              </textPath>
            </text>
          </svg>
          <span className="disc__spindle" />
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <div className="hero__left">
          <h1 className="hero__name">
            <span className="hero__line hero__line--2"> MELODIE XIONG</span>
          </h1>
          <p className="hero__tag">
            <em>I'm a frontend-focused fullstack dev, interested in computer vision</em>
          </p>
        </div>

        <svg
          className="hero__staff"
          viewBox="0 0 1200 260"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g
            fill="none"
            stroke="rgba(244, 236, 255, 0.9)"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path id="staff-line-1" d="M 20 90 C 180 -20, 340 210, 500 130 S 820 -10, 980 110 S 1180 140, 1180 150" />
            <path id="staff-line-2" d="M 20 120 C 180 20, 360 210, 520 150 S 820 30, 1000 130 S 1180 170, 1180 175" />
            <path id="staff-line-3" d="M 20 155 C 200 70, 380 220, 540 170 S 840 90, 1020 160 S 1180 195, 1180 200" />
            <path id="staff-line-4" d="M 20 185 C 220 120, 400 230, 560 195 S 860 130, 1040 190 S 1180 218, 1180 220" />
            <path id="staff-line-5" d="M 20 215 C 240 170, 420 245, 580 220 S 880 175, 1060 215 S 1180 235, 1180 238" />
          </g>
        </svg>

        <div className="hero__right">
          <VinylDisc size={360} className="hero__disc" />
        </div>
      </div>
    </section>
  )
}

export function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about__card">
          <span className="eyebrow about__eyebrow">About Me</span>
          <div className="about__lead">
            <p className="about__p">
              I'm a computer engineering student at the University of Waterloo. I like building software
              that makes people's lives easier and more fun. Currently interested and dabbling in computer
              vision
            </p>
            <p className="about__p">Hobbies include video games, gym, music, and playing chinese violin</p>
          </div>

          <div className="about__notes" aria-hidden="true">
            <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
              <g fill="var(--pink-soft)" stroke="var(--pink-soft)" strokeLinecap="round">
                <g className="about__notes-a">
                  <ellipse cx="20" cy="60" rx="7" ry="5" transform="rotate(-18 20 60)" />
                  <ellipse cx="52" cy="52" rx="7" ry="5" transform="rotate(-18 52 52)" />
                  <line x1="27" y1="60" x2="27" y2="14" strokeWidth="2" />
                  <line x1="59" y1="52" x2="59" y2="14" strokeWidth="2" />
                  <line x1="27" y1="14" x2="59" y2="14" strokeWidth="6" />
                </g>
              </g>
            </svg>

            <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
              <g fill="var(--violet)" stroke="var(--violet)" strokeLinecap="round">
                <g className="about__notes-b">
                  <ellipse cx="15" cy="70" rx="7" ry="5" transform="rotate(-18 15 70)" />
                  <ellipse cx="45" cy="60" rx="7" ry="5" transform="rotate(-18 45 60)" />
                  <ellipse cx="75" cy="66" rx="7" ry="5" transform="rotate(-18 75 66)" />
                  <line x1="22" y1="70" x2="22" y2="18" strokeWidth="2" />
                  <line x1="52" y1="60" x2="52" y2="18" strokeWidth="2" />
                  <line x1="82" y1="66" x2="82" y2="18" strokeWidth="2" />
                  <line x1="22" y1="18" x2="82" y2="18" strokeWidth="6" />
                </g>
              </g>
            </svg>

            <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
              <g fill="var(--pink)" stroke="var(--pink)" strokeLinecap="round">
                <g className="about__notes-c">
                  <ellipse cx="30" cy="66" rx="7" ry="5" transform="rotate(-18 30 66)" />
                  <ellipse cx="60" cy="58" rx="7" ry="5" transform="rotate(-18 60 58)" />
                  <line x1="37" y1="66" x2="37" y2="20" strokeWidth="2" />
                  <line x1="67" y1="58" x2="67" y2="20" strokeWidth="2" />
                  <line x1="37" y1="20" x2="67" y2="20" strokeWidth="6" />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Work() {
  const tracks = [
    {
      role: 'Software Developer Intern',
      org: 'Miovision',
      logo: miovisionLogo,
      url: 'https://miovision.com/',
      yr: 'May 2026 — Aug 2026',
      desc: 'Modernized frontend and optimized production data flows for a traffic-intelligence platform serving 17,000+ cities',
    },
    {
      role: 'Software Developer Intern',
      org: 'Port 443 Inc.',
      logo: port443Logo,
      url: 'https://www.port443.io/',
      yr: 'Sep 2025 — Dec 2025',
      desc: 'Refactored frontend and backend API handling across three production brands serving 15,000+ users',
    },
    {
      role: 'Autonomy Developer',
      org: 'Waterloo Aerial Robotics Group',
      logo: wargLogo,
      url: 'https://www.uwarg.com/',
      yr: 'May 2026 — Present',
      desc: 'Building the real-time computer-vision and messaging systems that feed an autonomous drone’s onboard localization',
    },
  ]
  return (
    <section id="work" className="section work">
      <div className="container">
        <span className="eyebrow">Experience</span>

        <ol className="tracklist">
          {tracks.map((t) => (
            <li key={t.org}>
              <a className="track" href={t.url} target="_blank" rel="noreferrer">
                <img className="track__logo" src={t.logo} alt="" aria-hidden="true" />
                <div className="track__main">
                  <h3 className="track__title">
                    {t.role}{' '}
                    <span className="track__org">— {t.org}</span>
                  </h3>
                  <p className="track__desc">{t.desc}</p>
                </div>
                <span className="track__yr">{t.yr}</span>
              </a>
            </li>
          ))}
        </ol>

        <div className="edu">
          <img className="edu__logo" src={waterlooLogo} alt="" aria-hidden="true" />
          <div className="edu__main">
            <h3 className="edu__school">University of Waterloo</h3>
            <p className="edu__deg">BASc, Computer Engineering — Honours, 3x Excellent Standing</p>
          </div>
          <div className="edu__meta">
            <span className="edu__yr">Sept 2024 — May 2029</span>
            <span className="edu__loc">Waterloo, ON</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SelectedWork() {
  const projects = [
    {
      title: 'Interactive Lamp Sim',
      desc: 'A simulated 5-DOF lamp character that reacts to people with vision, speech and motion.',
      stack: ['Python', 'OpenCV', 'MuJoCo'],
      href: 'https://github.com/MelbearX123/cv_monorepo/tree/main/projects/interactive_lamp',
      preview: lampPreview,
    },
    {
      title: 'ChromaForge',
      desc: 'Splits an image into its colour layers to generate custom game background assets.',
      stack: ['Python', 'PyTorch', 'Numpy'],
      href: 'https://github.com/MelbearX123/cv_monorepo/tree/main/projects/chromaforge',
      preview: chromaforgePreview,
    },
    {
      title: 'handcursorx',
      desc: 'Webcam-driven hands-free cursor control — pinch to click, move to point, gesture to scroll.',
      stack: ['Python', 'MediaPipe', 'OpenCV'],
      href: 'https://github.com/MelbearX123/handcursorx',
      preview: handcursorPreview,
    },
    {
      title: 'Modbot',
      desc: 'A Discord moderation bot that uses the OpenAI moderation API to flag inappropriate messages in server chats.',
      stack: ['JavaScript', 'discord.js', 'OpenAI API'],
      href: 'https://github.com/MelbearX123/Melbot',
      preview: modbotPreview,
    },
  ]
  return (
    <section id="projects" className="section selected">
      <div className="container">
        <span className="eyebrow">Selected work</span>
        <div className="releases">
          {projects.map((p) => (
            <a className="release" key={p.title} href={p.href} target="_blank" rel="noreferrer">
              <div
                className="release__preview"
                aria-hidden="true"
                style={p.preview ? { backgroundImage: `url(${p.preview})` } : undefined}
              />
              <div className="release__body">
                <h3 className="release__title">{p.title}</h3>
                <p className="release__desc">{p.desc}</p>
                <ul className="release__stack">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <span className="release__cta">View on GitHub →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <footer id="contact" className="footer">
      <div className="container footer__inner">
        <span className="footer__copy">© 2026 · Melodie Xiong</span>

        <ul className="footer__links">
          <li>
            <a href="mailto:mxiong@uwaterloo.ca" className="footer__icon" aria-label="Email Melodie">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/MelbearX123"
              className="footer__icon"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.57.1.79-.25.79-.55v-1.94c-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.26 3.35.96.1-.75.4-1.26.72-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.09-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.77.12 3.06.73.81 1.18 1.84 1.18 3.09 0 4.41-2.69 5.38-5.26 5.66.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/melodie-xiong"
              className="footer__icon"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3 9.5h4v11H3v-11zM9.5 9.5h3.8v1.5h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.55 4.78 5.87v5.58h-4v-4.95c0-1.18-.02-2.7-1.7-2.7-1.7 0-1.96 1.28-1.96 2.62v5.03h-4v-11z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
