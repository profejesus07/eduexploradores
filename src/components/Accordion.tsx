'use client'

import { useId, useState } from 'react'

type Item = { question: string; answer: string; id?: string | null }

/** Acordeón de una sola apertura: altura animada con grid-rows, sin librerías. */
export default function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const uid = useId()
  return (
    <div className="my-8 border-y border-border">
      {items.map((it, i) => {
        const isOpen = open === i
        const btnId = `${uid}-b${i}`
        const panelId = `${uid}-p${i}`
        return (
          <div key={it.id ?? i} className={`relative border-b border-border/80 transition-colors duration-500 last:border-b-0 ${isOpen ? 'bg-paper' : 'hover:bg-paper/60'}`}>
            <span aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top bg-secondary transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)]" style={{ transform: `scaleY(${isOpen ? 1 : 0})` }} />
            <h3 className="!m-0 !border-0 !p-0">
              <button
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center gap-5 px-5 py-6 text-left sm:px-7"
              >
                <span className="w-8 shrink-0 font-display text-xl font-medium tabular-nums text-gold-text">{String(i + 1).padStart(2, '0')}</span>
                <span className={`flex-1 font-display text-[1.5rem] leading-snug transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-primary-dark group-hover:text-primary'}`}>{it.question}</span>
                <span aria-hidden className={`relative h-9 w-9 shrink-0 rounded-full border transition-colors duration-500 ${isOpen ? 'border-secondary bg-primary' : 'border-border bg-white group-hover:border-secondary'}`}>
                  <span className={`absolute left-1/2 top-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 transition-colors duration-500 ${isOpen ? 'bg-gold-soft' : 'bg-primary'}`} />
                  <span className={`absolute left-1/2 top-1/2 h-3.5 w-px -translate-x-1/2 -translate-y-1/2 transition-[transform,background-color] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${isOpen ? 'rotate-90 bg-gold-soft' : 'bg-primary'}`} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
              className="grid"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                visibility: isOpen ? 'visible' : 'hidden',
                transition: `grid-template-rows .55s cubic-bezier(.2,.7,.2,1), visibility 0s linear ${isOpen ? '0s' : '.55s'}`,
              }}
            >
              <div className="overflow-hidden">
                <p className={`whitespace-pre-line pb-8 pl-[4.5rem] pr-6 text-lg text-muted-foreground transition-[opacity,transform] duration-500 sm:pr-12 ${isOpen ? 'translate-y-0 opacity-100 delay-100' : '-translate-y-1 opacity-0'}`}>{it.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
