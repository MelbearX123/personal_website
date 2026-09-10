import { useEffect, useState } from 'react'
import './Loader.css'

/*
  Loader — a single spinning vinyl disc. Holds for a short beat so the
  spin actually reads, then fades and calls onDone().
*/
export default function Loader({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const start = setTimeout(() => setLeaving(true), 1200)
    const done  = setTimeout(onDone, 1200 + 600)
    return () => {
      clearTimeout(start)
      clearTimeout(done)
    }
  }, [onDone])

  return (
    <div className={`loader ${leaving ? 'loader--leaving' : ''}`} aria-hidden={leaving}>
      <div className="loader__disc" aria-hidden="true">
        <div className="loader__label" />
      </div>
    </div>
  )
}
