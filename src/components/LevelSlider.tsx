'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight, Check, Clock } from 'lucide-react'
import { useCallback, useEffect, useState, type KeyboardEvent } from 'react'
import { folderPalette } from '@/lib/folders'

export type LevelSlide = {
  id: string | number
  title: string
  badge?: string | null
  subtitle?: string | null
  summary: string
  highlights: string[]
  schedule?: string | null
  folder?: string | null
  imageUrl?: string | null
  imageAlt?: string | null
}

/** Slider profesional (Embla): arrastre táctil, flechas, teclado, contador y barra de progreso. */
export default function LevelSlider({ kicker, title, caption, slides, badgeStyle = 'number' }: { kicker: string; title: string; caption?: string; slides: LevelSlide[]; badgeStyle?: 'number' | 'grade' }) {
  const [ref, api] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps', skipSnaps: false, inViewThreshold: 0.6 })
  const [progress, setProgress] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const [range, setRange] = useState<[number, number]>([0, 0])

  const update = useCallback(() => {
    if (!api) return
    setProgress(Math.max(0, Math.min(1, api.scrollProgress())))
    setCanPrev(api.canScrollPrev())
    setCanNext(api.canScrollNext())
    const v = api.slidesInView()
    if (v.length) setRange([Math.min(...v), Math.max(...v)])
  }, [api])

  useEffect(() => {
    if (!api) return
    update()
    api.on('select', update).on('scroll', update).on('reInit', update)
    return () => { api.off('select', update).off('scroll', update).off('reInit', update) }
  }, [api, update])

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); api?.scrollNext() }
    if (e.key === 'ArrowLeft') { e.preventDefault(); api?.scrollPrev() }
  }
  const pad = (n: number) => String(n).padStart(2, '0')
  const slug = title.toLowerCase().replace(/\W+/g, '-')

  return (
    <section aria-labelledby={`slider-${slug}`} className="mt-16 first:mt-14">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{kicker}</p>
          <h3 id={`slider-${slug}`} className="mt-3 text-4xl text-primary sm:text-5xl">{title}</h3>
          {caption && <p className="mt-2 text-muted-foreground">{caption}</p>}
        </div>
        <div className="flex items-center gap-5">
          <p className="font-display text-xl tabular-nums text-muted-foreground" aria-hidden>
            <span className="text-primary">{range[0] === range[1] ? pad(range[0] + 1) : `${pad(range[0] + 1)}–${pad(range[1] + 1)}`}</span> / {pad(slides.length)}
          </p>
          <div className="flex gap-2">
            <button onClick={() => api?.scrollPrev()} disabled={!canPrev} aria-label={`${title}: anterior`} className="flex h-12 w-12 items-center justify-center border border-primary text-primary transition-colors duration-300 hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:border-border disabled:text-border disabled:hover:bg-transparent disabled:hover:text-border">
              <ArrowLeft aria-hidden size={20} />
            </button>
            <button onClick={() => api?.scrollNext()} disabled={!canNext} aria-label={`${title}: siguiente`} className="flex h-12 w-12 items-center justify-center border border-primary bg-primary text-white transition-colors duration-300 hover:bg-primary-dark disabled:cursor-not-allowed disabled:border-border disabled:bg-transparent disabled:text-border">
              <ArrowRight aria-hidden size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        className="mt-8 -mr-4 overflow-hidden sm:-mr-6 lg:mr-0"
        ref={ref}
        role="region"
        aria-roledescription="carrusel"
        aria-label={title}
        tabIndex={0}
        onKeyDown={onKey}
      >
        <ul className="flex cursor-grab touch-pan-y gap-6 active:cursor-grabbing">
          {slides.map((s, i) => {
            const f = s.folder ? folderPalette[s.folder] : null
            return (
              <li key={s.id} role="group" aria-roledescription="diapositiva" aria-label={`${i + 1} de ${slides.length}`} className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_46%] lg:flex-[0_0_31.5%]">
                <article className="lift flex h-full flex-col border border-border bg-card">
                  <div className="relative aspect-[16/10] overflow-hidden bg-primary-dark text-white">
                    {s.imageUrl ? (
                      <img src={s.imageUrl} alt={s.imageAlt || ''} loading="lazy" draggable={false} className="h-full w-full object-cover" />
                    ) : (
                      <>
                        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-primary-dark),var(--color-primary))]" />
                        <div aria-hidden className="absolute -right-10 -top-12 h-52 w-52 rounded-full border border-gold-soft/30" />
                        <div aria-hidden className="absolute -right-2 top-2 h-32 w-32 rounded-full border border-gold-soft/20" />
                        <p aria-hidden className="absolute bottom-3 left-6 font-display text-8xl font-medium leading-none text-gold-soft">{s.badge || (badgeStyle === 'grade' ? `${i + 1}°` : String(i + 1).padStart(2, '0'))}</p>
                      </>
                    )}
                    {f && (
                      <span className="absolute right-4 top-4 inline-flex items-center gap-2 bg-white/95 px-3 py-1.5 text-[.72rem] font-bold uppercase tracking-[.12em] text-primary-dark">
                        <span aria-hidden className="h-2.5 w-2.5 rounded-full border border-black/10" style={{ background: f.hex }} />Carpeta {f.name}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    {s.subtitle && <p className="text-[.75rem] font-bold uppercase tracking-[.16em] text-gold-text">{s.subtitle}</p>}
                    <h4 className="mt-2 font-display text-4xl font-semibold leading-none text-primary">{s.title}</h4>
                    <p className="mt-4 text-muted-foreground">{s.summary}</p>
                    {s.highlights.length > 0 && (
                      <ul className="mt-5 space-y-2">
                        {s.highlights.map((h) => (
                          <li key={h} className="flex gap-3 text-[.97rem] text-foreground/85"><Check aria-hidden size={18} className="mt-1 shrink-0 text-secondary" strokeWidth={2.5} />{h}</li>
                        ))}
                      </ul>
                    )}
                    {s.schedule && (
                      <div className="mt-auto pt-6">
                        <p className="flex items-center gap-2 border-t border-border pt-5 text-sm font-bold text-primary">
                          <Clock aria-hidden size={16} className="text-gold-text" />{s.schedule}
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>

      <div aria-hidden className="mt-8 h-px w-full bg-border">
        <div className="h-[3px] -translate-y-px bg-secondary transition-[width] duration-300 ease-out" style={{ width: `${Math.max(progress * 100, 100 / Math.max(slides.length, 1))}%` }} />
      </div>
    </section>
  )
}
