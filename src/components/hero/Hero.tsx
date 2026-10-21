import { useRef, useState } from 'react'
import { FOCUS_AREAS } from '../../content'
import Disc from './Disc'
import Waveform from './Waveform'
import { spawnNote } from './notes'
import { Turntable } from './turntable'
import './Hero.css'

export default function Hero() {
  const [turntable] = useState(() => new Turntable())
  const notes = useRef<HTMLDivElement>(null)

  const scatterNotes = (count: number) => {
    for (let i = 0; i < count; i++) spawnNote(notes.current!)
  }

  const spin = () => {
    turntable.kick()
    scatterNotes(8)
  }

  return (
    <section id="top" className="section hero">
      <div className="hero__halftone dots" aria-hidden="true" />

      <div className="hero__intro">
        <ul className="hero__tags">
          {FOCUS_AREAS.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
        <h1 className="hero__name">Melodie<br />Xiong</h1>
        <p className="hero__tagline">A frontend-focused fullstack developer, interested in computer vision.</p>
        <Waveform turntable={turntable} />
        <div className="hero__actions">
          <button type="button" className="btn" onClick={spin}>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9" />
              <path d="M13.5 2.5v3h-3" />
            </svg>
            spin the disc
          </button>
          <a className="btn btn--accent" href="#projects">see the work ↓</a>
        </div>
      </div>

      <div className="hero__deck">
        <div className="hero__ring">
          <Disc turntable={turntable} onScratch={() => scatterNotes(1)} />
          <div ref={notes} className="hero__notes" aria-hidden="true" />
        </div>
        <p className="mono hero__hint">drag the disc ↻</p>
      </div>
    </section>
  )
}
