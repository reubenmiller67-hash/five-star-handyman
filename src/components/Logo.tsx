type LogoProps = {
  className?: string
}

const GREEN = '#8CC63F'
const WHITE = '#FFFFFF'
const TICK = '#0A0A0A'

/** Right roof centerline: peak (120,30) → (220,140); unit perpendicular for tick marks */
const nx = -110 / 147.32
const ny = 100 / 147.32

function tickLine(t: number) {
  const px = 120 + 100 * t
  const py = 30 + 110 * t
  return {
    x1: px - 5 * nx,
    y1: py - 5 * ny,
    x2: px + 5 * nx,
    y2: py + 5 * ny,
  }
}

export function Logo({ className }: LogoProps) {
  const ticks = [0.22, 0.38, 0.54, 0.7, 0.86].map(tickLine)

  return (
    <svg
      className={className}
      viewBox="0 0 240 160"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="5-Star Handyman"
    >
      {/* Left roof: thick green hammer handle (20,140) → peak (120,30) */}
      <polygon fill={GREEN} points="12,145 36,139 126,34 108,26" />
      {/* Hammer head: ~40×20 with claw notch top-left, angled with handle */}
      <g transform="translate(118, 28) rotate(-47.7)">
        <path fill={GREEN} d="M -22 8 L -22 -2 L -8 -12 L 18 -12 L 18 8 Z" />
      </g>
      {/* Right roof: thick white level (120,30) → (220,140) */}
      <polygon fill={WHITE} points="112,28 132,36 228,139 204,145" />
      {/* Ruler tick marks */}
      <g stroke={TICK} strokeWidth="2" strokeLinecap="square">
        {ticks.map((seg, i) => (
          <line key={i} x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2} />
        ))}
      </g>
      {/* Center window: circle + crosshair */}
      <circle cx={120} cy={95} r={18} fill="none" stroke={WHITE} strokeWidth={4} />
      <g stroke={WHITE} strokeWidth={3} strokeLinecap="square">
        <line x1={102} y1={95} x2={138} y2={95} />
        <line x1={120} y1={77} x2={120} y2={113} />
      </g>
      {/* Base feet */}
      <rect x={10} y={140} width={20} height={6} fill={WHITE} />
      <rect x={210} y={140} width={20} height={6} fill={WHITE} />
    </svg>
  )
}
