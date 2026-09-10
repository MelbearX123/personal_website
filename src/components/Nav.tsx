import { useEffect, useState } from 'react'
import './Nav.css'

/*
  Fixed top navigation. Every link is an in-page anchor.
  A small scroll-spy highlights whichever section is on screen.
*/
const LINKS = [
  { id: 'about',    label: 'About' },
  { id: 'work',     label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact',  label: 'Contact' },
]

export default function Nav() {
  const [active, setActive] = useState('about')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
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
          {/* <span className="nav__brandmark" aria-hidden="true" /> */}
          <span className="nav__brandtext">MELODIE&nbsp;<span className="nav__brandx">X</span></span>
        </a>

        <nav className="nav__links">
          {LINKS.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`nav__link ${active === l.id ? 'is-active' : ''}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

      </div>
    </header>
  )
}
