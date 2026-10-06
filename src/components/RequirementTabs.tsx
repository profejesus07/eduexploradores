'use client'

import { useId, useRef, useState, type KeyboardEvent } from 'react'

type Group = { id?: string | null; label: string; items: { id?: string | null; text: string }[] }

/** Pestañas de requisitos (p. ej. estudiantes nuevos / antiguos) con indicador deslizante. */
export default function RequirementTabs({ groups }: { groups: Group[] }) {
  const [active, setActive] = useState(0)
  const uid = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  if (!groups.length) return null
  const n = groups.length
  const pad = (i: number) => String(i + 1).padStart(2, '0')

  const move = (to: number) => { setActive(to); tabs.current[to]?.focus() }
  const onKey = (e: KeyboardEvent, i: number) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); move((i + 1) % n) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); move((i - 1 + n) % n) }
    if (e.key === 'Home') { e.preventDefault(); move(0) }
    if (e.key === 'End') { e.preventDefault(); move(n - 1) }
  }
  const g = groups[active]

  return (
    <div className="my-8">
      <div role="tablist" aria-label="Tipo de estudiante" className="relative grid border-b border-border" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {groups.map((gr, i) => {
          const sel = i === active
          return (
            <button
              key={gr.id ?? i}
              ref={(el) => { tabs.current[i] = el }}
              role="tab"
              id={`${uid}-t${i}`}
              aria-selected={sel}
              aria-controls={`${uid}-p${i}`}
              tabIndex={sel ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`group px-4 py-5 text-left transition-colors duration-300 sm:px-7 ${sel ? 'bg-paper' : 'hover:bg-paper/60'}`}
            >
              <span className={`block font-display text-[1.65rem] leading-tight transition-colors duration-300 sm:text-3xl ${sel ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}>{gr.label}</span>
              <span className={`mt-1 block text-[.75rem] font-bold uppercase tracking-[.16em] transition-colors duration-300 ${sel ? 'text-gold-text' : 'text-muted-foreground/80'}`}>{gr.items.length} {gr.items.length === 1 ? 'documento' : 'documentos'}</span>
            </button>
          )
        })}
        <span aria-hidden className="absolute -bottom-px left-0 h-[3px] bg-secondary transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)]" style={{ width: `${100 / n}%`, transform: `translateX(${active * 100}%)` }} />
      </div>

      <div role="tabpanel" id={`${uid}-p${active}`} aria-labelledby={`${uid}-t${active}`} tabIndex={0} className="bg-card">
        <ol key={active} className="!list-none !p-0">
          {g.items.map((it, i) => (
            <li key={it.id ?? i} className="rise flex items-baseline gap-5 border-b border-border/80 px-4 py-4 last:border-b-0 sm:px-7" style={{ animationDelay: `${i * 45}ms`, marginTop: 0 }}>
              <span className="w-8 shrink-0 font-display text-xl font-medium tabular-nums text-gold-text">{pad(i)}</span>
              <span className="text-[1.05rem] text-foreground">{it.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
