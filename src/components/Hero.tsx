import RetroSun from './RetroSun'
import CityFrame from './CityFrame'

/*
  Hero
  ----
  The full-screen landing area: the retrowave sun sits in the background, the
  city silhouettes frame the sides, and the title floats on top. The little
  "scroll" hint at the bottom links down to the experience section.
*/
export default function Hero() {
  return (
    <section className="hero">
      {/* Background art: sun + grid (behind the text) */}
      <RetroSun />
      {/* City silhouettes framing the left and right edges */}
      <CityFrame />

      {/* A dark overlay so the title stays readable over the city */}
      <div className="hero-overlay" />

      {/* Foreground text */}
      <div className="hero-content">
        <h1 className="hero-title">Melodie Xiong</h1>
        <p className="hero-subtitle">Computer Engineering at University of Waterloo</p>
      </div>

      {/* Scroll hint — clicking it jumps to the #experience section */}
      <a className="scroll-hint" href="#experience" aria-label="Scroll to experience">
        <span className="chevron">⌄</span>
      </a>
    </section>
  )
}
