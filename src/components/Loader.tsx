import { useEffect, useState } from 'react'
import './Loader.css'

/*
  Loader — the cyber-retro boot screen shown on first load.
  A segmented bar fills to 100% while faux "system" lines print out, then the
  whole overlay fades away and calls onDone() so the page can take over.
*/
const BOOT_LINES = [
  'INITIALIZING SYSTEM',
  'MOUNTING /dev/portfolio',
  'LOADING VISUAL CORTEX',
  'DECODING ASSETS [████]',
  'CALIBRATING DISPLAY',
  'READY',
]

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    // Advance the bar in slightly uneven steps so it feels like real loading.
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100
        const bump = Math.random() * 14 + 4
        return Math.min(100, p + bump)
      })
    }, 160)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress < 100) return
    // Hold on "READY" briefly, then play the exit and hand off to the page.
    const hold = setTimeout(() => setLeaving(true), 480)
    const done = setTimeout(onDone, 480 + 720)
    return () => {
      clearTimeout(hold)
      clearTimeout(done)
    }
  }, [progress, onDone])

  const pct = Math.floor(progress)
  const SEGMENTS = 40
  const filled = Math.round((pct / 100) * SEGMENTS)
  // Reveal boot lines in step with progress.
  const shownLines = Math.min(BOOT_LINES.length, Math.ceil((pct / 100) * BOOT_LINES.length))

  return (
    <div className={`loader ${leaving ? 'loader--leaving' : ''}`} aria-hidden={leaving}>
      <div className="loader__frame">
        <div className="loader__topbar">
          <span className="loader__brand">MX_OS</span>
          <span className="loader__ver">v2.0 · SYS/BOOT</span>
        </div>

        <div className="loader__title chrome-text">MELODIE XIONG</div>

        <div className="loader__log">
          {BOOT_LINES.slice(0, shownLines).map((line, i) => (
            <div className="loader__logline" key={line}>
              <span className="loader__caret">&gt;</span> {line}
              {i === shownLines - 1 && pct < 100 && <span className="loader__blink">_</span>}
            </div>
          ))}
        </div>

        <div className="loader__barwrap">
          <div className="loader__bar">
            {Array.from({ length: SEGMENTS }).map((_, i) => (
              <span key={i} className={`loader__seg ${i < filled ? 'on' : ''}`} />
            ))}
          </div>
          <div className="loader__readout">
            <span>LOADING</span>
            <span className="loader__pct">{String(pct).padStart(3, '0')}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
