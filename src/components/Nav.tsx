import { useEffect, useRef, useState } from 'react'
import { NAV_LINKS } from '../content'
import './Nav.css'

/** Pill nav bar on wide screens; on phones, a floating menu button that drops the links down. */
export default function Nav() {
  const header = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  // While the menu is open, close it on Escape or a tap anywhere outside it.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onPointerDown = (e: PointerEvent) => {
      if (!header.current!.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header ref={header} className={`nav${open ? ' nav--open' : ''}`}>
      <button
        type="button"
        className="nav__toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="nav-menu"
        onClick={() => setOpen(!open)}
      >
        <span /><span /><span />
      </button>

      <div id="nav-menu" className="nav__bar">
        <a className="nav__brand" href="#top" onClick={close}>MELODIE·X</a>
        <nav className="nav__links" aria-label="Sections">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={close}>{link.label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}
