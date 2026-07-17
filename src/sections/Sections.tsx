import './sections.css'

/*
  All page sections live here so the single-page layout is easy to scan.
  Each section has an id that matches a nav anchor (#about, #work, #projects,
  #resume-ish "contact"). Content is placeholder-plausible for now — the
  focus is the visual system; real copy comes later.
*/

/* A little decorative cluster of pixel squares (the PS2-cover motif). */
function PixelCluster({ className = '' }: { className?: string }) {
  return (
    <div className={`pixels ${className}`} aria-hidden="true">
      {[...'110101110100101011'].map((v, i) => (
        <span key={i} className={v === '1' ? 'on' : ''} />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ HERO */
export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__meta">
          <span className="eyebrow">PORTFOLIO · MMXXVI</span>
        </div>

        <h1 className="hero__name">
          <span className="hero__line chrome-text">MELODIE</span>
          <span className="hero__line hero__line--2">
            XIONG
            <PixelCluster className="hero__pixels" />
          </span>
        </h1>

        <p className="hero__tag">
          Designer &amp; developer building tactile, systems-minded interfaces —
          somewhere between a control panel and a dream.
        </p>

        <div className="hero__cta">
          <a href="#projects" className="btn btn--primary">VIEW WORK</a>
          <a href="#contact" className="btn btn--ghost">GET IN TOUCH</a>
        </div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to about">
        <span className="hero__scrolltxt">SCROLL</span>
        <span className="hero__scrollline" />
      </a>
    </section>
  )
}

/* ----------------------------------------------------------------- ABOUT */
export function About() {
  const specs = [
    ['ROLE', 'Product / UX Engineer'],
    ['BASED', 'Toronto, CA'],
    ['FOCUS', 'Design systems · Front-end'],
    ['STATUS', 'Open to work'],
  ]
  return (
    <section id="about" className="section about">
      <div className="container">
        <span className="eyebrow">// 01 — ABOUT</span>
        <div className="about__body">
          <div className="about__lead">
            <h2 className="section__title">
              I design and build interfaces that feel like <em>hardware</em>.
            </h2>
            <p className="about__p">
              I&apos;m Melodie — I work across the seam where design meets
              engineering. I like interfaces with weight and logic: readable
              hierarchies, honest states, motion that means something. My work
              draws on early-2000s tech aesthetics — glossy, technical, a little
              nostalgic — grounded in modern accessibility and performance.
            </p>
            <p className="about__p">
              Previously I&apos;ve shipped design systems, marketing sites and
              internal tooling for teams that care about craft.
            </p>
          </div>

          <aside className="spec">
            <div className="spec__head">
              <span>SPEC SHEET</span>
              <span className="spec__id">MX—001</span>
            </div>
            <dl className="spec__rows">
              {specs.map(([k, v]) => (
                <div className="spec__row" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <PixelCluster className="spec__pixels" />
          </aside>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------- WORK EXPERIENCE */
export function Work() {
  const roles = [
    { yr: '2024 — NOW', role: 'Product Designer / Front-end', org: 'Studio / Freelance', desc: 'End-to-end product design and implementation for early-stage teams.' },
    { yr: '2022 — 2024', role: 'UX Engineer', org: 'Company Name', desc: 'Owned the design system and shipped the component library used across web.' },
    { yr: '2021 — 2022', role: 'Front-end Developer', org: 'Company Name', desc: 'Built responsive marketing sites and internal dashboards.' },
    { yr: '2020 — 2021', role: 'Design Intern', org: 'Company Name', desc: 'Prototyping, brand exploration and production design.' },
  ]
  return (
    <section id="work" className="section work">
      <div className="container">
        <span className="eyebrow">// 02 — WORK EXPERIENCE</span>
        <h2 className="section__title work__title">Where I&apos;ve been</h2>
        <ol className="timeline">
          {roles.map((r) => (
            <li className="timeline__item" key={r.yr}>
              <div className="timeline__yr">{r.yr}</div>
              <div className="timeline__main">
                <h3 className="timeline__role">
                  {r.role} <span className="timeline__org">— {r.org}</span>
                </h3>
                <p className="timeline__desc">{r.desc}</p>
              </div>
              <span className="timeline__node" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* -------------------------------------------------------- SELECTED WORK */
export function SelectedWork() {
  const projects = [
    {
      n: '01',
      title: 'ChromaForge',
      tag: 'Computer Vision · Python',
      desc: 'A PyTorch/CUDA tool that isolates and separates the colour layers of an image to generate custom background assets for games.',
      href: 'https://github.com/MelbearX123/cv_monorepo',
    },
    {
      n: '02',
      title: 'handcursorx',
      tag: 'Computer Vision · Python',
      desc: 'Hands-free cursor control from a webcam — MediaPipe hand tracking maps fingertip motion and pinch gestures to mouse movement, clicks and scrolling.',
      href: 'https://github.com/MelbearX123/handcursorx',
    },
  ]
  return (
    <section id="projects" className="section selected">
      <div className="container">
        <span className="eyebrow">// 03 — SELECTED WORK</span>
        <h2 className="section__title">Selected work</h2>
        <div className="cards">
          {projects.map((p) => (
            <a className="card" key={p.n} href={p.href} target="_blank" rel="noreferrer">
              <div className="card__thumb" aria-hidden="true">
                <span className="card__scan" />
                <PixelCluster className="card__pixels" />
              </div>
              <div className="card__meta">
                <span className="card__n">{p.n}</span>
                <span className="card__tag">{p.tag}</span>
              </div>
              <h3 className="card__title">{p.title}</h3>
              <p className="card__desc">{p.desc}</p>
              <span className="card__cta">VIEW ON GITHUB →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- CONTACT */
export function Contact() {
  const links = [
    ['EMAIL', 'mxiong@uwaterloo.ca', 'mailto:mxiong@uwaterloo.ca'],
    ['GITHUB', '@MelbearX123', 'https://github.com/MelbearX123'],
    ['LINKEDIN', 'in/melodie-xiong', 'https://www.linkedin.com/in/melodie-xiong'],
  ]
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <span className="eyebrow">// 04 — CONTACTS</span>
        <div className="contact__body">
          <h2 className="contact__title chrome-text">LET&apos;S BUILD SOMETHING</h2>
          <p className="contact__p">
            Have a project, a role, or just want to trade references? The channel
            is open.
          </p>
          <ul className="contact__links">
            {links.map(([k, v, href]) => {
              const external = href.startsWith('http')
              return (
                <li key={k}>
                  <a
                    href={href}
                    className="contact__link"
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    <span className="contact__k">{k}</span>
                    <span className="contact__v">{v}</span>
                    <span className="contact__arrow">→</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <footer className="footer">
          <span>© MMXXVI · MELODIE XIONG</span>
          <span className="footer__sys">MX_OS v2.0 — ALL SYSTEMS NOMINAL</span>
        </footer>
      </div>
    </section>
  )
}
