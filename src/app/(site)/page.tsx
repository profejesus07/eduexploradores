import { ArrowRight, Compass, GraduationCap, HeartHandshake, Leaf, Puzzle, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/logo.webp'
import HomeGallery from '@/components/HomeGallery'
import LevelSlider, { type LevelSlide } from '@/components/LevelSlider'
import PostCard from '@/components/PostCard'
import PrimariaCard from '@/components/PrimariaCard'
import Reveal from '@/components/Reveal'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

const audiences = [
  { icon: HeartHandshake, title: 'Familias', text: 'Admisiones, requisitos y acompañamiento.', href: '/requisitos' },
  { icon: GraduationCap, title: 'Docentes', text: 'Novedades de nuestra comunidad académica.', href: '/entradas?categoria=docentes' },
  { icon: Puzzle, title: 'Estudiantes', text: 'Actividades, proyectos y descubrimientos.', href: '/entradas?categoria=estudiantes' },
  { icon: Users, title: 'Comunidad', text: 'Eventos y noticias para quienes nos acompañan.', href: '/entradas?categoria=comunidad' },
]

const pillars = [
  { icon: Compass, t: 'Exploración del entorno', d: 'La curiosidad es el motor del aprendizaje: observar, preguntar y descubrir.' },
  { icon: Puzzle, t: 'Juego y creatividad', d: 'Estrategias lúdicas, artísticas y de investigación para construir conocimiento.' },
  { icon: Leaf, t: 'Vivencia con la naturaleza', d: 'Formamos personas sensibles y comprometidas con el cuidado del mundo.' },
]

export default async function HomePage() {
  const payload = await getPayloadClient()
  const posts = await payload
    .find({ collection: 'posts', limit: 3, depth: 1, sort: '-publishedAt', overrideAccess: false })
    .then((r) => r.docs)
    .catch(() => [])
  const levelDocs = await payload
    .find({ collection: 'levels', limit: 40, depth: 1, sort: 'order', overrideAccess: false })
    .then((r) => r.docs)
    .catch(() => [])
  const toSlide = (d: (typeof levelDocs)[number]): LevelSlide => {
    const img = typeof d.image === 'object' ? d.image : null
    return {
      id: d.id, title: d.title, badge: d.badge, subtitle: d.subtitle, summary: d.summary,
      highlights: (d.highlights ?? []).map((h) => h.text), schedule: d.schedule, folder: d.folder,
      imageUrl: img?.sizes?.card?.url || img?.url, imageAlt: img?.alt,
    }
  }
  const preescolar = levelDocs.filter((d) => d.stage === 'preescolar').map(toSlide)
  const primaria = levelDocs.filter((d) => d.stage === 'primaria').map(toSlide)
  const testimonials = await payload
    .find({ collection: 'testimonials', limit: 6, overrideAccess: false, sort: 'createdAt' })
    .then((r) => r.docs)
    .catch(() => [])

  return (
    <>
      {/* HERO */}
      <section className="on-dark relative overflow-hidden bg-[linear-gradient(135deg,var(--color-primary-dark)_0%,var(--color-primary)_130%)] text-white">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,rgb(26_176_249/.22),transparent_60%)]" />
        <div aria-hidden className="spin-slow absolute -right-40 top-1/2 h-[46rem] w-[46rem] -translate-y-1/2 rounded-full border border-gold-soft/15" />
        <div aria-hidden className="absolute -right-24 top-1/2 h-[38rem] w-[38rem] -translate-y-1/2 rounded-full border border-gold-soft/20" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 md:grid-cols-[1.25fr_1fr] md:py-28">
          <div>
            <p className="eyebrow rise rise-1">Educación inicial · Valledupar</p>
            <h1 className="rise rise-2 mt-6 text-6xl leading-[1.02] sm:text-7xl lg:text-[5.5rem]">
              Crecer, <em className="font-medium text-gold-soft">explorar</em> y aprender
            </h1>
            <p className="rise rise-3 mt-7 max-w-xl text-xl leading-relaxed text-white/80">
              Nutrimos mentes curiosas y corazones compasivos, combinando la excelencia académica con un profundo desarrollo humano, en un entorno seguro e inspirador.
            </p>
            <div className="rise rise-4 mt-10 flex flex-wrap gap-4">
              <Link href="/requisitos" className="btn btn-gold">Solicitar un cupo <ArrowRight aria-hidden size={18} className="arrow" /></Link>
              <Link href="/servicios" className="btn btn-ghost-light">Conocer servicios</Link>
            </div>
          </div>
          <div className="rise rise-3 mx-auto w-full max-w-[22rem]">
            <div className="drift rounded-full border border-gold-soft/50 p-3">
              <div className="rounded-full border border-gold-soft/25 bg-white p-2 shadow-2xl">
                <Image src={logo} alt="Escudo de Exploradores del Saber: átomo, microscopio y libro abierto" width={520} height={520} priority className="rounded-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative border-t border-white/10">
          <ul className="mx-auto grid max-w-6xl gap-px px-4 text-sm tracking-wide text-white/70 sm:grid-cols-3 sm:px-6">
            {['Enfoque pedagógico constructivista', 'Inglés desde Preescolar', 'Visión institucional 2035'].map((t) => (
              <li key={t} className="flex items-center gap-3 py-4"><span aria-hidden className="h-1 w-1 rotate-45 bg-gold-soft" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* PÚBLICOS */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="publicos">
        <Reveal>
          <p className="eyebrow">Para cada miembro de la comunidad</p>
          <h2 id="publicos" className="mt-4 max-w-2xl text-4xl text-primary sm:text-5xl">Encuentra lo que buscas</h2>
        </Reveal>
        <ul className="mt-12 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map(({ icon: Icon, title, text, href }, i) => (
            <Reveal as="li" key={title} delay={i * 90} className="border-b border-border sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:last:border-r-0">
              <Link href={href} className="group flex h-full flex-col gap-3 p-7 transition-colors hover:bg-paper">
                <Icon aria-hidden className="text-secondary transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.5} size={30} />
                <span className="font-display text-3xl text-primary">{title}</span>
                <span className="text-muted-foreground">{text}</span>
                <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-bold uppercase tracking-[.14em] text-gold-text">Explorar <ArrowRight aria-hidden size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" /></span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* GALERÍA (se activa desde el admin) */}
      <HomeGallery />

      {/* NIVELES */}
      <section className="py-24" aria-labelledby="niveles">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow">Escoge tu servicio</p>
            <h2 id="niveles" className="mt-4 max-w-2xl text-4xl text-primary sm:text-6xl">Un camino para cada etapa</h2>
            <p className="mt-5 max-w-2xl text-xl text-muted-foreground">Programa completo para la primera infancia con enfoque lúdico y constructivista.</p>
          </Reveal>
          {preescolar.length > 0 && <LevelSlider kicker="Primera infancia" title="Preescolar" caption="Párvulos · Pre-Jardín · Jardín · Transición" slides={preescolar} badgeStyle="number" />}
          {primaria.length === 1 && <PrimariaCard data={primaria[0]} />}
          {primaria.length > 1 && <LevelSlider kicker="Educación básica" title="Básica Primaria" caption="Grados 1° a 5°" slides={primaria} badgeStyle="grade" />}
        </div>
      </section>

      {/* ENFOQUE */}
      <section className="bg-paper" aria-labelledby="enfoque">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <Reveal>
          <p className="eyebrow">Nuestro enfoque</p>
          <h2 id="enfoque" className="mt-4 max-w-3xl text-4xl text-primary sm:text-6xl">Aprender explorando</h2>
          <p className="mt-5 max-w-2xl text-xl text-muted-foreground">Colocamos al niño en el centro: formamos solucionadores de problemas, no solo receptores de información.</p>
        </Reveal>
        <ul className="mt-14 grid gap-10 md:grid-cols-3">
          {pillars.map(({ icon: Icon, t, d }, i) => (
            <Reveal as="li" key={t} delay={i * 110}>
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-secondary/50 text-primary"><Icon aria-hidden strokeWidth={1.5} /></span>
              <h3 className="mt-5 text-2xl text-primary">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </ul>
        <div className="mt-20 grid gap-px border border-border bg-border md:grid-cols-2">
          <Reveal className="bg-card p-10">
            <p className="eyebrow">Misión</p>
            <p className="mt-5 font-display text-[1.7rem] leading-snug text-primary">Formar niños y niñas autónomos, empáticos y cooperativos, capaces de construir su propio aprendizaje mediante la exploración, el juego y la experiencia.</p>
          </Reveal>
          <Reveal delay={120} className="bg-card p-10">
            <p className="eyebrow">Visión 2035</p>
            <p className="mt-5 font-display text-[1.7rem] leading-snug text-primary">Proyectamos consolidarnos para el año 2035 como una institución reconocida por promover el aprendizaje significativo y el desarrollo integral de los niños y niñas en la educación inicial y primaria.</p>
          </Reveal>
        </div>
        <Link href="/nosotros" className="link-underline mt-8 inline-flex items-center gap-2 font-bold tracking-wide text-primary">Conocer nuestro horizonte institucional <ArrowRight aria-hidden size={16} /></Link>
        </div>
      </section>

      {/* ADMISIÓN */}
      <section className="on-dark relative overflow-hidden bg-primary text-white" aria-labelledby="admision">
        <div aria-hidden className="absolute -left-32 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full border border-gold-soft/15" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <Reveal>
            <p className="eyebrow">Admisiones</p>
            <h2 id="admision" className="mt-4 max-w-2xl text-4xl sm:text-6xl">Solicitar un cupo es sencillo</h2>
          </Reveal>
          <ol className="mt-14 grid gap-10 md:grid-cols-3">
            {['Contáctanos y agenda una visita guiada.', 'Entrevista con la dirección.', 'Entrega de documentación y matrícula.'].map((s, i) => (
              <Reveal as="li" key={s} delay={i * 120} className="border-t border-gold-soft/40 pt-6">
                <span className="font-display text-6xl font-medium text-gold-soft">{i + 1}</span>
                <p className="mt-3 text-xl text-white/90">{s}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-12 flex flex-wrap gap-4">
            <Link href="/requisitos" className="btn btn-gold">Ver requisitos</Link>
            <Link href="/contacto" className="btn btn-ghost-light">Agendar visita</Link>
          </Reveal>
        </div>
      </section>

      {/* NOTICIAS */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6" aria-labelledby="noticias">
          <Reveal className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Actualidad</p>
              <h2 id="noticias" className="mt-4 text-4xl text-primary sm:text-6xl">Lo último en la comunidad</h2>
            </div>
            <Link href="/entradas" className="link-underline hidden font-bold tracking-wide text-primary sm:block">Ver todas</Link>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {posts.map((p, i) => <Reveal key={p.id} delay={i * 100}><PostCard post={p} /></Reveal>)}
          </div>
        </section>
      )}

      {/* TESTIMONIOS */}
      {testimonials.length > 0 && (
        <section className="on-dark bg-primary-dark py-24 text-white" aria-labelledby="testimonios">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <p className="eyebrow">Testimonios</p>
              <h2 id="testimonios" className="mt-4 max-w-2xl text-4xl sm:text-6xl">Familias que confían en nosotros</h2>
            </Reveal>
            <ul className="mt-14 grid gap-10 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal as="li" key={t.id} delay={i * 110} className="border-t border-gold-soft/40 pt-6">
                  <span aria-hidden className="font-display text-6xl leading-none text-gold-soft">“</span>
                  <blockquote className="-mt-2 font-display text-[1.45rem] italic leading-snug text-white/95">{t.text}</blockquote>
                  <p className="mt-6 font-bold tracking-wide text-gold-soft">{t.name}</p>
                  <p className="text-sm text-white/60">{t.role}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
