import './RetroSun.css'

/*
  RetroSun
  --------
  The retrowave backdrop, drawn as one SVG: a saturated "sliced" sun and a faint
  perspective grid stretching toward the viewer. The framing city silhouettes
  live in a separate component (CityFrame).

  On load the sun "rises" from below the horizon — it starts shifted down (so the
  clip below the horizon hides it) and animates up into place (see RetroSun.css).

  The sun slices and grid lines are generated from data rather than hand-drawn,
  which keeps the markup small.
*/

const VIEW_W = 1440
const VIEW_H = 900
const HORIZON_Y = 600 // where the sun meets the grid

// The sun's geometry.
const SUN_CX = 720
const SUN_CY = 545
const SUN_R = 200

// ---- Sun --------------------------------------------------------------------
// Horizontal "slice" gaps across the lower half of the sun.
function sunSlices() {
  const slices = []
  let y = SUN_CY - 8
  let gap = 6
  let thickness = 3
  let i = 0
  while (y < SUN_CY + SUN_R) {
    slices.push(
      <rect
        key={i}
        x={SUN_CX - SUN_R}
        y={y}
        width={SUN_R * 2}
        height={thickness}
        fill="var(--bg-deep)"
      />,
    )
    y += gap + thickness
    gap += 2.4
    thickness += 0.6
    i++
  }
  return slices
}

// ---- Grid floor -------------------------------------------------------------
function grid() {
  const lines = []

  const verticals = [-700, -460, -300, -185, -95, -30, 30, 95, 185, 300, 460, 700]
  verticals.forEach((offset, idx) => {
    lines.push(
      <line
        key={`v-${idx}`}
        x1={SUN_CX}
        y1={HORIZON_Y}
        x2={SUN_CX + offset}
        y2={VIEW_H}
        stroke="var(--accent-violet)"
        strokeWidth={1}
        opacity={0.18}
      />,
    )
  })

  let y = HORIZON_Y + 14
  let step = 14
  let idx = 0
  while (y < VIEW_H) {
    lines.push(
      <line
        key={`h-${idx}`}
        x1={0}
        y1={y}
        x2={VIEW_W}
        y2={y}
        stroke="var(--accent-violet)"
        strokeWidth={1}
        opacity={0.16}
      />,
    )
    y += step
    step *= 1.32
    idx++
  }

  return lines
}

export default function RetroSun() {
  return (
    <svg
      className="retro-sun"
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Warm-top to violet-bottom gradient for the sun (more saturated). */}
        <linearGradient id="sunFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffb05f" />
          <stop offset="48%" stopColor="#ff5a9e" />
          <stop offset="100%" stopColor="#9b3fe0" />
        </linearGradient>
        {/* Soft glow used behind the sun. */}
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6aa8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ff6aa8" stopOpacity="0" />
        </radialGradient>
        {/* Clip so nothing of the sun shows below the horizon. */}
        <clipPath id="aboveHorizon">
          <rect x="0" y="0" width={VIEW_W} height={HORIZON_Y} />
        </clipPath>
        {/* Clip the slice gaps to the sun's circle so they don't stick out. */}
        <clipPath id="sunClip">
          <circle cx={SUN_CX} cy={SUN_CY} r={SUN_R} />
        </clipPath>
      </defs>

      {/* The sun group rises into place on load (see .sun-rise in the CSS). */}
      <g className="sun-rise">
        {/* Soft halo behind the sun */}
        <circle className="sun-glow" cx={SUN_CX} cy={SUN_CY} r={SUN_R * 1.9} fill="url(#sunGlow)" />
        {/* The sun itself, clipped to the horizon */}
        <g clipPath="url(#aboveHorizon)">
          <circle cx={SUN_CX} cy={SUN_CY} r={SUN_R} fill="url(#sunFill)" />
          {/* Slices clipped to the circle so the bands stay inside the sun */}
          <g clipPath="url(#sunClip)">{sunSlices()}</g>
        </g>
      </g>

      {/* The perspective grid floor below the horizon */}
      {grid()}
    </svg>
  )
}
