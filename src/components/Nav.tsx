import { useEffect, useState } from 'react'
import './Nav.css'

/*
  Fixed top navigation. Every link is an in-page anchor, so clicking one
  glides the viewport to that section (smooth scroll is set globally in
  index.css). A small scroll-spy highlights whichever section is on screen.
*/
// `id` is the section the link scrolls to / the scroll-spy watches. The
// "Resume" link lands on the Contacts section, where the resume download and
// contact channels live.
const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Resume' },
]

export default function Nav() {
  const [active, setActive] = useState('about')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Flip to the dark-glass style only once we've scrolled most of the way
    // through the landing (where its pale background is fading to the dark
    // page), not at the very first pixel of scroll.
    const onScroll = () => {
      const hero = document.getElementById('top')
      const threshold = (hero ? hero.offsetHeight : window.innerHeight) * 0.72
      setScrolled(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Highlight the section currently nearest the top of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__brand">
          <span className="nav__brandmark" aria-hidden="true" />
          <span className="nav__brandtext">MELODIE&nbsp;<span className="nav__brandx">X</span></span>
        </a>

        <nav className="nav__links">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`nav__link ${active === l.id ? 'is-active' : ''}`}
            >
              <span className="nav__num">0{LINKS.indexOf(l) + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__status">
          <span className="nav__dot" /> ONLINE
        </div>
      </div>
    </header>
  )
}
