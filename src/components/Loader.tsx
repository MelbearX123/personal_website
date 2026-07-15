import { useEffect, useState } from 'react'
import './Loader.css'

/*
  Loader — a minimal cyber-retro boot screen: a "loading..." label above a
  single glowing progress bar. It fills to 100%, then the overlay fades out
  and calls onDone() so the page can take over.
*/
export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    // Advance the bar in slightly uneven steps so it feels like real loading.
    const timer = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : Math.min(100, p + (Math.random() * 14 + 4))))
    }, 160)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress < 100) return
    const hold = setTimeout(() => setLeaving(true), 360)
    const done = setTimeout(onDone, 360 + 700)
    return () => {
      clearTimeout(hold)
      clearTimeout(done)
    }
  }, [progress, onDone])

  const pct = Math.floor(progress)

  return (
    <div className={`loader ${leaving ? 'loader--leaving' : ''}`} aria-hidden={leaving}>
      <div className="loader__box">
        <div className="loader__label">
          loading<span className="loader__dots" />
        </div>
        <div className="loader__track">
          <div className="loader__fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}
