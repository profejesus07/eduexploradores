import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import EduIllustration from '@/components/EduIllustration'
import type { LevelSlide } from '@/components/LevelSlider'

/** Banner único de Básica Primaria (1° – 5°). Acepta una foto real; si no hay, usa la ilustración vectorial. */
export default function PrimariaBanner({ data }: { data: LevelSlide }) {
  return (
    <section aria-labelledby="primaria-titulo" className="on-dark relative mt-16 overflow-hidden bg-[linear-gradient(120deg,var(--color-primary-dark)_0%,var(--color-primary)_120%)] text-white">
      <div aria-hidden className="absolute -left-24 -top-24 h-72 w-72 rounded-full border border-gold-soft/15" />
      <div className="relative grid items-center md:grid-cols-[1.05fr_1fr]">
        <div className="p-8 sm:p-12 lg:p-14">
          <p className="eyebrow">{data.subtitle || 'Educación básica'}</p>
          <h3 id="primaria-titulo" className="mt-4 text-5xl sm:text-6xl">{data.title}</h3>
          <p className="mt-2 font-display text-6xl font-medium italic leading-none text-gold-soft sm:text-7xl">{data.badge || '1° – 5°'}</p>
          <p className="mt-6 max-w-md text-lg text-white/80">{data.summary}</p>
          {data.highlights.length > 0 && (
            <ul className="mt-6 space-y-2.5">
              {data.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-white/90"><Check aria-hidden size={18} strokeWidth={2.5} className="mt-1 shrink-0 text-secondary" />{h}</li>
              ))}
            </ul>
          )}
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/requisitos" className="btn btn-gold">Ver requisitos <ArrowRight aria-hidden size={18} className="arrow" /></Link>
            <Link href="/contacto" className="btn btn-ghost-light">Agendar visita</Link>
          </div>
        </div>

        <div className="relative min-h-[18rem] self-stretch md:min-h-[30rem]">
          {data.imageUrl ? (
            <>
              <img src={data.imageUrl} alt={data.imageAlt || ''} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-primary)_0%,transparent_45%)] md:bg-[linear-gradient(90deg,#0A33AD_0%,transparent_40%)]" />
              <div aria-hidden className="absolute inset-y-6 right-6 hidden w-px bg-gold-soft/50 md:block" />
            </>
          ) : (
            <div className="drift flex h-full items-center justify-center p-6 md:p-10">
              <EduIllustration className="h-auto w-full max-w-[34rem]" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
