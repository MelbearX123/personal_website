import './CityFrame.css'

/*
  CityFrame
  ---------
  Dark city silhouettes that hug the left and right edges of the hero to frame
  the title. Each side is its own small SVG anchored to a screen edge with CSS,
  so the buildings always stay in the corners no matter the screen width (a
  single full-bleed SVG would crop them away on narrow screens).

  The right side reuses the same building data as the left, just mirrored with
  a CSS flip — so we only describe the skyline once.
*/

// The drawing box for one side. Buildings rise from the bottom (y = BOX_H).
const BOX_W = 360
const BOX_H = 560

// Tallest tower at the outer edge (x = 0), stepping down toward the centre.
type Building = { x: number; w: number; h: number }

const buildings: Building[] = [
  { x: 0, w: 92, h: 500 },
  { x: 100, w: 66, h: 410 },
  { x: 172, w: 76, h: 320 },
  { x: 254, w: 56, h: 235 },
  { x: 316, w: 44, h: 160 },
]

// Soft window colors — muted so the city reads as silhouette, not bright neon.
const WINDOW_COLORS = ['#e9b487', '#cf9bd6', '#8fb7e0']

// Lit windows inside one building.
function windowsFor(b: Building, keyPrefix: string) {
  const cell = 21
  const pad = 12
  const top = BOX_H - b.h
  const out = []
  let i = 0
  for (let wy = top + pad; wy < BOX_H - pad; wy += cell) {
    for (let wx = b.x + pad; wx < b.x + b.w - pad; wx += cell) {
      // Leave roughly a third of the windows dark for a natural look.
      if ((i * 3) % 4 === 0) {
        i++
        continue
      }
      const color = WINDOW_COLORS[i % WINDOW_COLORS.length]
      out.push(
        <rect
          key={`${keyPrefix}-${i}`}
          className="city-window"
          x={wx}
          y={wy}
          width={6}
          height={8}
          fill={color}
          style={{ animationDelay: `${(i % 7) * 0.7}s` }}
        />,
      )
      i++
    }
  }
  return out
}

// One side's worth of skyline (used for both left and right).
function Skyline() {
  return (
    <svg
      className="city-svg"
      viewBox={`0 0 ${BOX_W} ${BOX_H}`}
      preserveAspectRatio="xMinYMax meet"
      aria-hidden="true"
    >
      {buildings.map((b, idx) => (
        <g key={idx}>
          {/* Dark silhouette body */}
          <rect x={b.x} y={BOX_H - b.h} width={b.w} height={b.h} fill="#060410" />
          {/* A faint warm rim where the rooftop catches the sun's glow */}
          <rect
            x={b.x}
            y={BOX_H - b.h}
            width={b.w}
            height={2}
            fill="var(--accent-rose)"
            opacity={0.25}
          />
          {windowsFor(b, `b-${idx}`)}
        </g>
      ))}
    </svg>
  )
}

export default function CityFrame() {
  return (
    <div className="city-frame" aria-hidden="true">
      <div className="city-side city-left">
        <Skyline />
      </div>
      {/* Same skyline, flipped to mirror it onto the right edge (see CSS). */}
      <div className="city-side city-right">
        <Skyline />
      </div>
    </div>
  )
}
