import type { PointerEvent } from 'react'

const setPan = (e: PointerEvent<HTMLDivElement>, pan: number) =>
  e.currentTarget.style.setProperty('--pan', pan.toFixed(3))

/**
 * Three colour layers that fan apart on hover and shift with the pointer.
 * All motion is CSS transitions driven by --spread (hover) and --pan (pointer x).
 */
export default function ChromaPreview() {
  return (
    <div
      className="preview preview--chroma"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setPan(e, (e.clientX - rect.left) / rect.width - 0.5)
      }}
      onPointerLeave={(e) => setPan(e, 0)}
    >
      <div className="chroma-layer chroma-layer--left" />
      <div className="chroma-layer chroma-layer--middle" />
      <div className="chroma-layer chroma-layer--right" />
      <div className="dots preview__dots preview__dots--low" />
    </div>
  )
}
