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
                    ? {
                        backgroundImage: `url(${p.preview})`,
                        backgroundSize: p.fit ?? 'cover',
                      }
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

/* --------------------------------------------------------------- CONTACT */
export function Contact() {
  const channels = [
    ['Email',    'mxiong@uwaterloo.ca',  'mailto:mxiong@uwaterloo.ca'],
    ['GitHub',   '@MelbearX123',          'https://github.com/MelbearX123'],
    ['LinkedIn', 'in/melodie-xiong',      'https://www.linkedin.com/in/melodie-xiong'],
  ]
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <span className="eyebrow">Contact</span>
        <h2 className="contact__title">Let&apos;s build something.</h2>
        <p className="contact__p">
          Have a project, a role, or just want to trade references?
          The line is open.
        </p>

        <ul className="channels">
          {channels.map(([k, v, href]) => {
            const external = href.startsWith('http')
            return (
              <li key={k}>
                <a
                  href={href}
                  className="channels__link"
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <span className="channels__k">{k}</span>
                  <span className="channels__v">{v}</span>
                  <span className="channels__arrow">→</span>
                </a>
              </li>
            )
          })}
        </ul>

        <footer className="footer">
          <span>© 2026 · Melodie Xiong</span>
        </footer>
      </div>
    </section>
  )
}
