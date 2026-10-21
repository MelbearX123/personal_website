import { NAV_LINKS } from '../content'
import './Nav.css'

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav__bar">
        <a className="nav__brand" href="#top">MELODIE·X</a>
        <nav className="nav__links" aria-label="Sections">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}
