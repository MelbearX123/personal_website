import './sections.css'
import miovisionLogo from '../assets/miovisonlogo.png'
import port443Logo from '../assets/port443logo.png'
import wargLogo from '../assets/warglogo.png'
import waterlooLogo from '../assets/waterloologo.png'
import lampPreview from '../assets/lamp.png'
import chromaforgePreview from '../assets/chromaforge.png'
import handcursorPreview from '../assets/preview-handcursorx.svg'
import modbotPreview from '../assets/modbot.png'

/*
  All page sections for the music-themed rebuild — restrained version.
  Section ids match nav anchors (#about, #work, #projects, #contact).
*/

/* -------------------------------------------------------- SPINNING DISC */
/* A vinyl record: grooved dark platter with a neon-lit label at center.
   Used on the hero (large) — no ornamental extras. */
function VinylDisc({
  size = 340,
  className = '',
  spinning = true,
}: {
  size?: number
  className?: string
  spinning?: boolean
}) {
  return (
    <div
      className={`disc ${spinning ? 'disc--spin' : ''} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className="disc__glow" />
      <div className="disc__platter">
        <div className="disc__grooves" />
        <div className="disc__shine" />
        <div className="disc__label">
          <span className="disc__label-ring" />
          <span className="disc__spindle" />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ HERO */
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

        <div className="hero__right">
          <VinylDisc size={360} className="hero__disc" />
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- ABOUT */
export function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <span className="eyebrow">About Me</span>
        <div className="about__body">
          <div className="about__lead">
            <p className="about__p">
              I'm a computer engineering student at the University of Waterloo. I like building software
              that makes people's lives easier and more fun. Currently interested and dabbling in computer
              vision
            </p>
            <p className="about__p">Hobbies include video games, gym, and chinese violin aka erhu</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------- WORK EXPERIENCE */
export function Work() {
  const tracks = [
    {
      role: 'Software Developer Intern',
      org: 'Miovision',
      logo: miovisionLogo,
      yr: 'May 2026 — Aug 2026',
      desc: 'Modernized frontend and optimized production data flows for a traffic-intelligence platform serving 17,000+ cities',
    },
    {
      role: 'Software Developer Intern',
      org: 'Port 443 Inc.',
      logo: port443Logo,
      yr: 'Sep 2025 — Dec 2025',
      desc: 'Refactored frontend and backend API handling across three production brands serving 15,000+ users',
    },
    {
      role: 'Autonomy Developer',
      org: 'Waterloo Aerial Robotics Group',
      logo: wargLogo,
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
            <li className="track" key={t.org}>
              <div className="track__main">
                <h3 className="track__title">
                  {t.role}{' '}
                  <span className="track__org">
                    — {t.org}
                    <img className="track__logo" src={t.logo} alt="" aria-hidden="true" />
                  </span>
                </h3>
                <p className="track__desc">{t.desc}</p>
              </div>
              <span className="track__yr">{t.yr}</span>
            </li>
          ))}
        </ol>

        <div className="edu">
          <div className="edu__main">
            <h3 className="edu__school">
              University of Waterloo
              <img className="edu__logo" src={waterlooLogo} alt="" aria-hidden="true" />
            </h3>
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

/* -------------------------------------------------------- SELECTED WORK */
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
                style={
                  p.preview
                    ? { backgroundImage: `url(${p.preview})` }
                    : undefined
                }
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

/* --------------------------------------------------------------- FOOTER */
/*
  The "Contact" nav item scrolls here. We show a compact footer strip
  with three icon links (mail / GitHub / LinkedIn) and a copyright.
*/
export function Contact() {
  return (
    <footer id="contact" className="footer">
      <div className="container footer__inner">
        <span className="footer__copy">© 2026 · Melodie Xiong</span>

        <ul className="footer__links">
          <li>
            <a
              href="mailto:mxiong@uwaterloo.ca"
              className="footer__icon"
              aria-label="Email Melodie"
            >
              {/* mail — envelope glyph */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                   aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <path d="M3 7l9 6 9-6"/>
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
              {/* github — Octocat mark, simplified */}
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.57.1.79-.25.79-.55v-1.94c-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.26 3.35.96.1-.75.4-1.26.72-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.09-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.77.12 3.06.73.81 1.18 1.84 1.18 3.09 0 4.41-2.69 5.38-5.26 5.66.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
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
              {/* linkedin — the "in" mark */}
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3 9.5h4v11H3v-11zM9.5 9.5h3.8v1.5h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.55 4.78 5.87v5.58h-4v-4.95c0-1.18-.02-2.7-1.7-2.7-1.7 0-1.96 1.28-1.96 2.62v5.03h-4v-11z"/>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
