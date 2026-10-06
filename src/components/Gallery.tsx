'use client'

import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react'
import Image, { type StaticImageData } from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

export type GalleryItem = {
  id: string | number
  caption: string
  detail?: string | null
  /** URL de una imagen subida desde el admin, o una imagen de demostración incluida en el proyecto. */
  src: string | StaticImageData
  full?: string | StaticImageData
  alt: string
  isDemo: boolean
}

// Patrón del mosaico (4 columnas): 6 imágenes llenan exactamente 3 filas.
const spans = [
  'md:col-span-2 md:row-span-2',
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-2',
  'md:col-span-1 md:row-span-1',
  'md:col-span-2 md:row-span-1',
  'md:col-span-2 md:row-span-1',
]

function Pic({ src, alt, sizes, className = '' }: { src: string | StaticImageData; alt: string; sizes: string; className?: string }) {
  return typeof src === 'string'
    ? <img src={src} alt={alt} loading="lazy" draggable={false} className={`absolute inset-0 h-full w-full ${className}`} />
    : <Image src={src} alt={alt} fill sizes={sizes} placeholder="empty" draggable={false} className={className} />
}

export default function Gallery({ items, layout }: { items: GalleryItem[]; layout: 'mosaic' | 'grid' }) {
  const [current, setCurrent] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const total = items.length

  const open = (i: number, el: HTMLElement) => { opener.current = el; setCurrent(i) }
  const close = useCallback(() => { dialog.current?.close() }, [])
  const go = useCallback((d: number) => setCurrent((c) => (c === null ? c : (c + d + total) % total)), [total])

  useEffect(() => {
    const d = dialog.current
    if (current !== null && d && !d.open) d.showModal()
  }, [current])

  useEffect(() => {
    if (current === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, go])

  const cur = current !== null ? items[current] : null
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <>
      <ul className={`grid grid-cols-2 gap-3 md:gap-4 ${layout === 'mosaic' ? 'auto-rows-[10.5rem] md:grid-cols-4 md:auto-rows-[13rem] md:[grid-auto-flow:dense]' : 'md:grid-cols-3 auto-rows-[10.5rem] md:auto-rows-[16rem]'}`}>
        {items.map((it, i) => {
          const span = layout === 'mosaic' ? spans[i % spans.length] : ''
          const mobileSpan = layout === 'mosaic' && (i % spans.length === 0) ? 'col-span-2' : ''
          return (
            <li key={it.id} className={layout === 'mosaic' ? `${mobileSpan} ${span}` : ''}>
              <button
                type="button"
                onClick={(e) => open(i, e.currentTarget)}
                aria-label={`Ampliar imagen: ${it.caption}`}
                className="group relative block h-full w-full overflow-hidden bg-primary-dark text-left"
              >
                <Pic src={it.src} alt={it.alt} sizes="(min-width:768px) 40vw, 90vw" className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.07]" />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/45 via-28% to-transparent to-58% transition-opacity duration-500 group-hover:from-primary-dark" />
                <span aria-hidden className="absolute left-4 top-4 font-display text-lg font-medium text-gold-soft/90">{pad(i + 1)}</span>
                <span aria-hidden className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-white/50 text-white opacity-0 transition-all duration-500 group-hover:opacity-100"><Expand size={16} /></span>
                <span className="absolute inset-x-0 bottom-0 translate-y-2 p-5 transition-transform duration-500 group-hover:translate-y-0">
                  <span className="block h-px w-8 bg-secondary transition-all duration-500 group-hover:w-14" />
                  <span className="mt-3 block font-display text-2xl leading-tight text-white">{it.caption}</span>
                  {it.detail && <span className="mt-1 hidden max-h-0 overflow-hidden text-sm text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100 md:block">{it.detail}</span>}
                </span>
                <span aria-hidden className="pointer-events-none absolute inset-0 border border-gold-soft/0 transition-colors duration-500 group-hover:border-gold-soft/60" style={{ inset: '10px' }} />
              </button>
            </li>
          )
        })}
      </ul>

      <dialog
        ref={dialog}
        aria-label="Visor de galería"
        onClose={() => { setCurrent(null); opener.current?.focus() }}
        onClick={(e) => e.target === dialog.current && close()}
        className="m-auto h-[min(92vh,60rem)] w-[min(96vw,80rem)] max-w-none overflow-hidden border border-gold-soft/30 bg-primary-dark p-0 text-white shadow-2xl backdrop:bg-[#030d33]/90 backdrop:backdrop-blur-sm"
      >
        {cur && (
          <div className="grid h-full grid-rows-[1fr_auto]">
            <div className="relative min-h-0">
              <Pic key={String(current)} src={cur.full ?? cur.src} alt={cur.alt} sizes="96vw" className="rise object-contain" />
              <button onClick={() => go(-1)} aria-label="Imagen anterior" className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/40 bg-primary-dark/60 text-white backdrop-blur transition-colors hover:bg-primary"><ArrowLeft aria-hidden size={20} /></button>
              <button onClick={() => go(1)} aria-label="Imagen siguiente" className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/40 bg-primary-dark/60 text-white backdrop-blur transition-colors hover:bg-primary"><ArrowRight aria-hidden size={20} /></button>
              <button onClick={close} aria-label="Cerrar visor" className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center border border-white/40 bg-primary-dark/60 text-white backdrop-blur transition-transform hover:rotate-90"><X aria-hidden size={20} /></button>
            </div>
            <div className="flex items-end justify-between gap-6 border-t border-white/10 px-6 py-4">
              <div aria-live="polite">
                <p className="font-display text-2xl">{cur.caption}</p>
                {cur.detail && <p className="text-sm text-white/70">{cur.detail}</p>}
              </div>
              <p className="shrink-0 font-display text-xl tabular-nums text-gold-soft">{pad((current ?? 0) + 1)} <span className="text-white/50">/ {pad(total)}</span></p>
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
