import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { LevelSlide } from '@/components/LevelSlider'
import Reveal from '@/components/Reveal'

/** Tarjeta compacta "Próximamente" para Básica Primaria. */
export default function PrimariaCard({ data }: { data: LevelSlide }) {
  return (
    <Reveal className="mt-16">
      <article aria-labelledby="primaria-titulo" className="lift grid max-w-2xl overflow-hidden border border-border bg-card sm:grid-cols-[9.5rem_1fr]">
        <div className="relative flex min-h-[7rem] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,var(--color-primary-dark),var(--color-primary))] p-4 text-white">
          <div aria-hidden className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-gold-soft/30" />
          <p aria-hidden className="relative font-display text-4xl font-medium italic leading-none text-gold-soft">{data.badge || '1° – 5°'}</p>
        </div>
        <div className="p-6 sm:p-7">
          <p className="inline-flex items-center gap-2 border border-secondary/70 px-3 py-1 text-[.72rem] font-bold uppercase tracking-[.16em] text-gold-text">
            <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />Próximamente
          </p>
          <h3 id="primaria-titulo" className="mt-3 text-3xl text-primary">{data.title}</h3>
          <p className="mt-2 text-muted-foreground">{data.summary}</p>
          <Link href="/contacto" className="link-underline mt-4 inline-flex items-center gap-2 font-bold tracking-wide text-primary">Quiero que me avisen <ArrowRight aria-hidden size={16} /></Link>
        </div>
      </article>
    </Reveal>
  )
}
