/**
 * Animated wave pattern: many parallel wavy lines with subtle glow.
 * Replaces the bgwave.gif in the website hero card. SVG + CSS only.
 * Pattern is periodic (200px horizontal, 120px vertical) so the drift animation loops seamlessly.
 */
function WavePattern({ className = '', width = '100%', height = '100%' }) {
  const viewWidth = 400
  const viewHeight = 120
  const periodX = 200
  const periodY = 120
  const numLinesPerBand = 20
  const numBands = 2
  const numLines = numLinesPerBand * numBands
  const amplitude = 6
  const wavelength = 200
  const step = 8
  const xMin = -200
  const xMax = 600

  const paths = []
  for (let lineIndex = 0; lineIndex < numLines; lineIndex++) {
    const cy = ((lineIndex + 0.5) * periodY) / numLinesPerBand
    const phase = (lineIndex / numLines) * Math.PI * 2
    const points = []
    for (let x = xMin; x <= xMax; x += step) {
      const y = cy + amplitude * Math.sin((x / wavelength) * Math.PI * 2 + phase)
      points.push(`${x},${y}`)
    }
    paths.push(points.join(' L '))
  }

  return (
    <svg
      className={className}
      viewBox={`0 0 ${viewWidth} ${periodY}`}
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <clipPath id="wave-pattern-clip">
          <rect x="0" y="0" width={viewWidth} height={periodY} />
        </clipPath>
        <filter id="wave-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3 0" result="bright" />
          <feBlend in="SourceGraphic" in2="bright" mode="screen" />
        </filter>
      </defs>
      <g clipPath="url(#wave-pattern-clip)">
        <g className="wave-pattern-group" filter="url(#wave-glow)">
          {paths.map((d, i) => (
            <path
              key={i}
              d={`M ${d}`}
              fill="none"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
          ))}
        </g>
      </g>
    </svg>
  )
}

export default WavePattern
