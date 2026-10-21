import { pick } from '../../lib/motion'

const GLYPHS = ['✦', '✧', '♪', '♫', '·']
const COLORS = ['var(--ink)', 'var(--accent)', '#6F8CC9']
const LIFETIME = 1700 // ms
const MAX_NOTES = 30

/**
 * Floats `count` music glyphs outward from random points on the disc's rim.
 * Fire-and-forget: the browser animates them on the compositor and each
 * element removes itself when done, so React never sees these nodes.
 */
export function spawnNotes(layer: HTMLElement, count: number) {
  // Read layout once, before any appends invalidate it.
  const size = layer.clientWidth
  for (let i = 0; i < count; i++) spawnNote(layer, size)
}

function spawnNote(layer: HTMLElement, size: number) {
  if (layer.childElementCount >= MAX_NOTES) layer.firstElementChild?.remove()

  const angle = Math.random() * 2 * Math.PI
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  // Drift outward and upward, measured in % of the disc like the start point.
  const dx = ((22 * cos + (Math.random() - 0.5) * 8) / 100) * size
  const dy = ((22 * sin - 14) / 100) * size

  const note = document.createElement('span')
  note.className = 'note'
  note.textContent = pick(GLYPHS)
  note.style.color = pick(COLORS)
  note.style.left = `${50 + 44 * cos}%`
  note.style.top = `${50 + 44 * sin}%`
  layer.append(note)

  const animation = note.animate(
    [
      { transform: 'translate(0, 0) translate(-50%, -50%) scale(0.7)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) translate(-50%, -50%) scale(1.2)`, opacity: 0 },
    ],
    { duration: LIFETIME },
  )
  animation.onfinish = () => note.remove()
}
