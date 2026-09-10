import { useEffect, useState } from 'react'
import './Loader.css'

/*
  Loader — a small vinyl spinning above a thin progress bar. When the
  bar hits 100% the overlay fades and onDone() is called.
*/
export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : Math.min(100, p + (Math.random() * 14 + 4))))
    }, 160)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress < 100) return
    const hold = setTimeout(() => setLeaving(true), 300)
    const done = setTimeout(onDone, 300 + 600)
    return () => {
      clearTimeout(hold)
      clearTimeout(done)
    }
  }, [progress, onDone])

  const pct = Math.floor(progress)

  return (
    <div className={`loader ${leaving ? 'loader--leaving' : ''}`} aria-hidden={leaving}>
      <div className="loader__box">
        <div className="loader__disc" aria-hidden="true">
          <div className="loader__label" />
        </div>
        <div className="loader__track">
          <div className="loader__fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}
