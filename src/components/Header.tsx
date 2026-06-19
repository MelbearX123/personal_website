import { NavLink } from 'react-router-dom'
import './Header.css'

// The navigation header, shown on every page.
//
// <NavLink> is how you navigate WITHOUT a full page reload — it's the
// React equivalent of Angular's routerLink. (Using a plain <a href> would
// reload the whole app, which we don't want in a single-page app.)
//
// The `to` prop is the destination path. NavLink also lets you style the
// "active" link via a function — shown below — which is handy once you add
// CSS. For now it just returns plain text.
export default function Header() {
  // An array of links keeps the markup DRY. `map` below turns each entry
  // into a <NavLink>, similar to *ngFor in an Angular template.
  const links = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/music', label: 'Music' },
    { to: '/resume', label: 'Resume' },
  ]

  return (
    <header className="site-header">
      <nav className="site-nav">
        {links.map((link) => (
          <NavLink
            // `key` must be unique among siblings — React uses it to track
            // list items efficiently. (Angular uses trackBy for this.)
            key={link.to}
            to={link.to}
            // `end` makes "/" only match the exact home path, not every route.
            end={link.to === '/'}
            // NavLink hands us an `isActive` flag; we use it to add a CSS class
            // to whichever link matches the current page.
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
