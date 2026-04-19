const BLACK = '#0A0A0A'
const WHITE = '#FFFFFF'
const GREEN = '#8CC63F'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="5-Star Handyman"
    >
      {/* a) Black circle background */}
      <circle cx={200} cy={200} r={200} fill={BLACK} />

      {/* d) Green accents — lower portion of each roof side (under white) */}
      <polygon fill={GREEN} points="18,252 40,268 125,195 103,179" />
      <polygon fill={GREEN} points="297,179 275,195 360,268 382,252" />

      {/* b) Left roof — white hammer: thick handle + angled head with claw notch */}
      <polygon fill={WHITE} points="30,228 54,246 214,112 190,94" />
      {/* Hammer head: ~50×28, angled with handle; claw notch at top-left of head */}
      <g transform="translate(198, 98) rotate(-39.1)">
        <path
          fill={WHITE}
          d="M -28 16 L 30 16 L 38 -2 L 38 -46 L 4 -46 L -12 -32 L -28 -50 L -28 16 Z"
        />
      </g>

      {/* c) Right roof — white level; extends past circle toward bottom-right */}
      <polygon fill={WHITE} points="186,94 210,112 382,258 356,276" />

      {/* e) Feet */}
      <rect x={15} y={228} width={30} height={10} fill={WHITE} />
      <rect x={355} y={228} width={30} height={10} fill={WHITE} />

      {/* f) Center window */}
      <circle
        cx={200}
        cy={170}
        r={28}
        fill="none"
        stroke={WHITE}
        strokeWidth={5}
      />
      <line
        x1={172}
        y1={170}
        x2={228}
        y2={170}
        stroke={WHITE}
        strokeWidth={4}
        strokeLinecap="square"
      />
      <line
        x1={200}
        y1={142}
        x2={200}
        y2={198}
        stroke={WHITE}
        strokeWidth={4}
        strokeLinecap="square"
      />

      {/* g) Wordmark */}
      <text
        x={200}
        y={285}
        textAnchor="middle"
        fill={WHITE}
        fontWeight="900"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize={52}
      >
        FIVE-STAR
      </text>
      <text
        x={200}
        y={330}
        textAnchor="middle"
        fill={WHITE}
        fontWeight="900"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize={52}
      >
        HANDYMAN
      </text>
    </svg>
  )
}
