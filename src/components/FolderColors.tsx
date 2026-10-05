'use client'

import { useEffect, useRef, useState } from 'react'

type Item = { grade: string; folder: string; id?: string | null }

// Tonos reconocibles pero sobrios, afinados con la paleta del sitio.
const palette: Record<string, { hex: string; name: string }> = {
  azul: { hex: '#24509C', name: 'azul' },
  roja: { hex: '#B23B46', name: 'roja' },
  amarilla: { hex: '#D9A82B', name: 'amarilla' },
  verde: { hex: '#2E7D5B', name: 'verde' },
  naranja: { hex: '#C9692B', name: 'naranja' },
  morada: { hex: '#6B4A9A', name: 'morada' },
  gris: { hex: '#6B7280', name: 'gris' },
}

/** Selector de grado con una carpeta que cambia de color suavemente. Rota sola hasta que el usuario interactúa. */
export default function FolderColors({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const root = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = root.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!auto || !visible || items.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setActive((a) => (a + 1) % items.length), 3600)
    return () => clearInterval(t)
  }, [auto, visible, items.length])

  if (!items.length) return null
  const cur = items[active]
  const c = palette[cur.folder] ?? palette.azul
  const pick = (i: number) => { setAuto(false); setActive(i) }

  return (
    <div
      ref={root}
      className="my-8 grid overflow-hidden border border-border md:grid-cols-[1fr_1.1fr]"
      style={{ ['--folder' as string]: c.hex, backgroundColor: `color-mix(in srgb, ${c.hex} 7%, #fff)`, transition: 'background-color .8s cubic-bezier(.2,.7,.2,1)' }}
    >
      <div role="tablist" aria-label="Grado" aria-orientation="vertical" className="flex flex-col justify-center border-b border-border p-3 md:border-b-0 md:border-r">
        {items.map((it, i) => {
          const sel = i === active
          const col = palette[it.folder] ?? palette.azul
          return (
            <button
              key={it.id ?? i}
              role="tab"
              aria-selected={sel}
              tabIndex={sel ? 0 : -1}
              onClick={() => pick(i)}
              onMouseEnter={() => pick(i)}
              onFocus={() => pick(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); pick((i + 1) % items.length) }
                if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); pick((i - 1 + items.length) % items.length) }
              }}
              className={`group relative flex items-center gap-4 px-5 py-4 text-left transition-colors duration-500 ${sel ? 'bg-white/80' : 'hover:bg-white/50'}`}
            >
              <span aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-center transition-transform duration-500" style={{ background: col.hex, transform: `scaleY(${sel ? 1 : 0})` }} />
              <span aria-hidden className="h-3.5 w-3.5 shrink-0 rounded-full border border-black/10 transition-transform duration-500" style={{ background: col.hex, transform: sel ? 'scale(1.25)' : 'scale(1)' }} />
              <span className={`font-display text-2xl transition-colors duration-300 ${sel ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}>{it.grade}</span>
              <span className={`ml-auto text-sm font-bold uppercase tracking-[.14em] transition-opacity duration-500 ${sel ? 'opacity-100' : 'opacity-0'}`} style={{ color: col.hex === '#D9A82B' ? '#7A5A12' : col.hex }}>{col.name}</span>
            </button>
          )
        })}
      </div>

      <div role="tabpanel" aria-live="polite" className="flex flex-col items-center justify-center gap-5 p-8">
        <svg viewBox="0 0 320 250" className="w-full max-w-[17rem] drop-shadow-[0_18px_22px_rgb(9_27_69/.18)]" role="img" aria-label={`Carpeta ${c.name} para ${cur.grade}`}>
          <g style={{ color: c.hex, transition: 'color .8s cubic-bezier(.2,.7,.2,1)' }}>
            {/* trasera con pestaña */}
            <path d="M24 44a10 10 0 0 1 10-10h86a10 10 0 0 1 7.4 3.3L146 58h140a10 10 0 0 1 10 10v150a10 10 0 0 1-10 10H34a10 10 0 0 1-10-10Z" fill="currentColor" style={{ filter: 'brightness(.82)' }} />
            {/* hojas */}
            <rect x="46" y="62" width="228" height="140" rx="3" fill="#fff" transform="rotate(-2 160 130)" />
            <rect x="52" y="70" width="228" height="140" rx="3" fill="#FAF8F3" transform="rotate(1.5 160 130)" />
            <g stroke="#D8D2C2" strokeWidth="1.5">
              <path d="M76 100h150M76 120h170M76 140h130" />
            </g>
            {/* frente */}
            <path d="M24 92a10 10 0 0 1 10-10h252a10 10 0 0 1 10 10v126a10 10 0 0 1-10 10H34a10 10 0 0 1-10-10Z" fill="currentColor" />
            <path d="M24 92a10 10 0 0 1 10-10h252a10 10 0 0 1 10 10v36H24Z" fill="#fff" opacity=".09" />
            <rect x="124" y="150" width="72" height="30" rx="2" fill="#fff" opacity=".92" />
            <path d="M136 165h48" stroke="#9aa0ad" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
        <p key={active} className="rise text-center font-display text-3xl text-primary">
          Carpeta <em className="font-medium" style={{ color: c.hex === '#D9A82B' ? '#7A5A12' : c.hex, transition: 'color .8s' }}>{c.name}</em>
        </p>
        <p className="-mt-3 text-center text-muted-foreground">{cur.grade}</p>
      </div>
    </div>
  )
}
