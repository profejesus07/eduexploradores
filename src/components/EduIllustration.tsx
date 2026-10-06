/** Ilustración vectorial propia (sin IA): escalera de grados 1°–5°, libro abierto y átomo. Solo azul, dorado y blanco. */
export default function EduIllustration({ className = '' }: { className?: string }) {
  const bars = [36, 62, 88, 114, 140]
  const stars: [number, number, number][] = [[452, 64, 0], [214, 96, 1.2], [486, 214, 2.1]]
  return (
    <svg viewBox="0 0 520 420" className={className} role="img" aria-label="Ilustración: escalera de grados de 1° a 5°, un libro abierto y un átomo">
      <g fill="none" stroke="#FFD84D">
        <circle cx="330" cy="200" r="184" strokeOpacity=".16" />
        <circle cx="330" cy="200" r="150" strokeOpacity=".12" />
      </g>

      {/* escalera de grados */}
      <g>
        {bars.map((h, i) => {
          const x = 16 + i * 30
          const y = 376 - h
          return (
            <g key={i}>
              <rect x={x} y={y} width="24" height={h} fill="#fff" fillOpacity=".13" />
              <rect x={x} y={y} width="24" height="4" fill="#FFCB02" />
              <text x={x + 12} y={y - 9} textAnchor="middle" fontSize="17" fill="#FFD84D" style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}>{i + 1}°</text>
            </g>
          )
        })}
        <path d="M10 376H168" stroke="#FFD84D" strokeOpacity=".5" />
      </g>

      {/* átomo */}
      <g transform="translate(330 168)">
        <g className="orbit" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          {[0, 60, 120].map((r) => (
            <g key={r} transform={`rotate(${r})`}>
              <ellipse rx="125" ry="44" fill="none" stroke="#FFD84D" strokeWidth="1.6" strokeOpacity=".9" />
              <circle cx="125" cy="0" r="6" fill={r === 60 ? '#fff' : '#FFCB02'} />
            </g>
          ))}
        </g>
        <circle r="16" fill="#FFCB02" fillOpacity=".25" />
        <circle r="9" fill="#FFCB02" />
      </g>

      {/* libro abierto */}
      <g>
        <path d="M172 322v54c40-14 94-12 158 10 64-22 118-24 158-10v-54Z" fill="#082A8C" stroke="#FFD84D" strokeWidth="1.5" strokeOpacity=".7" />
        <path d="M330 326C298 308 244 302 186 314v54c58-12 112-6 144 10Z" fill="#fff" />
        <path d="M330 326c32-18 86-24 144-12v54c-58-12-112-6-144 10Z" fill="#F3F6FD" />
        <g stroke="#0A33AD" strokeOpacity=".22" strokeWidth="2" strokeLinecap="round" fill="none">
          <path d="M208 334c28-6 62-4 98 8M208 348c28-6 62-4 98 8" />
          <path d="M452 334c-28-6-62-4-98 8M452 348c-28-6-62-4-98 8" />
        </g>
        <path d="M326 326v66l4-9 4 9v-66Z" fill="#FFCB02" />
      </g>

      {/* destellos */}
      {stars.map(([x, y, d], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path className="twinkle" style={{ animationDelay: `${d}s`, transformBox: 'fill-box', transformOrigin: 'center' }} d="M0-10Q0 0 10 0Q0 0 0 10Q0 0-10 0Q0 0 0-10Z" fill="#FFCB02" />
        </g>
      ))}
    </svg>
  )
}
