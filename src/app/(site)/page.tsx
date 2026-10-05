import { ArrowRight, BookOpen, Compass, GraduationCap, HeartHandshake, Leaf, Puzzle, Quote, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import PostCard from '@/components/PostCard'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

const levels = [
  { name: 'Párvulos', blurb: 'Primeros pasos: exploración sensorial, juego y vínculo seguro.', bg: 'bg-primary', fg: 'text-white' },
  { name: 'Pre-Jardín', blurb: 'Lenguaje, movimiento y creatividad a través de las artes.', bg: 'bg-spark-dark', fg: 'text-white' },
  { name: 'Jardín', blurb: 'Bases académicas y sociales con pensamiento lógico.', bg: 'bg-secondary', fg: 'text-on-secondary' },
  { name: 'Transición', blurb: 'Preparación integral para dar el salto a primaria.', bg: 'bg-science-dark', fg: 'text-white' },
]

const audiences = [
  { icon: HeartHandshake, title: 'Familias', text: 'Admisiones, requisitos y cómo acompañamos a su hijo.', href: '/requisitos' },
  { icon: GraduationCap, title: 'Docentes', text: 'Recursos y novedades de nuestra comunidad académica.', href: '/entradas?categoria=docentes' },
  { icon: Puzzle, title: 'Estudiantes', text: 'Actividades, descubrimientos y proyectos para explorar.', href: '/entradas?categoria=estudiantes' },
  { icon: Users, title: 'Comunidad', text: 'Eventos y noticias para quienes nos acompañan.', href: '/entradas?categoria=comunidad' },
]

const testimonials = [
  { name: 'Verónica Maestre', role: 'Madre de familia', text: 'Está muy contenta con el resultado; su hijo ha mejorado su rendimiento académico de una forma increíble.' },
  { name: 'Pedro Gutierrez', role: 'Padre de familia', text: 'Recomienda la escuela; el personal está muy preparado y la atención a su hija ha sido excelente.' },
  { name: 'Patricia López', role: 'Madre de familia', text: 'Gracias a Exploradores del Saber su hijo avanzó muy rápido en las áreas donde tenía dificultad; los recomienda.' },
]

export default async function HomePage() {
  const payload = await getPayloadClient()
  const posts = await payload
    .find({ collection: 'posts', limit: 3, depth: 1, sort: '-publishedAt', overrideAccess: false })
    .then((r) => r.docs)
    .catch(() => [])

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary-dark text-white">
        <div aria-hidden className="absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full border-[28px] border-secondary/20" />
        <div aria-hidden className="absolute -bottom-40 -left-24 h-[26rem] w-[26rem] rounded-full bg-primary/60 blur-2xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.2fr_1fr] md:py-24">
          <div>
            <p className="inline-block rounded-full bg-secondary px-4 py-1 text-sm font-bold text-on-secondary">Inscripciones abiertas · Valledupar</p>
            <h1 className="mt-5 text-5xl font-extrabold sm:text-6xl lg:text-7xl">
              Crecer, <span className="text-secondary">Explorar</span> y Aprender
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              Forjadores de un gran futuro: nutrimos mentes curiosas y corazones compasivos, combinando excelencia académica con desarrollo humano en un entorno seguro e inspirador.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/requisitos" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-secondary px-7 font-display text-lg font-bold text-on-secondary transition-transform hover:-translate-y-0.5">
                Inscribir a mi hijo <ArrowRight aria-hidden size={20} />
              </Link>
              <Link href="/servicios" className="inline-flex min-h-12 items-center rounded-full border-2 border-white/60 px-7 font-display text-lg font-bold transition-colors hover:bg-white/10">
                Conocer servicios
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm">
            <div className="rounded-full border-[10px] border-secondary bg-white p-2 shadow-2xl">
              <Image src="/logo.webp" alt="Escudo de Exploradores del Saber: átomo, microscopio y libro abierto" width={520} height={520} priority className="rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* PÚBLICOS */}
      <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-4 sm:px-6" aria-labelledby="publicos">
        <h2 id="publicos" className="sr-only">Encuentra lo que buscas</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map(({ icon: Icon, title, text, href }) => (
            <li key={title}>
              <Link href={href} className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-card transition-transform hover:-translate-y-1">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-secondary"><Icon aria-hidden /></span>
                <span className="mt-4 font-display text-xl font-bold text-primary">{title}</span>
                <span className="mt-1 text-muted-foreground">{text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* NIVELES */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="niveles">
        <p className="font-display font-bold uppercase tracking-wider text-sky-dark">Escoge tu servicio</p>
        <h2 id="niveles" className="mt-1 text-4xl font-extrabold text-primary sm:text-5xl">Un camino para cada etapa</h2>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">Programa completo para la primera infancia con enfoque lúdico y constructivista, más refuerzo escolar personalizado.</p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {levels.map((l) => (
            <li key={l.name} className={`rounded-3xl p-6 shadow-card ${l.bg} ${l.fg}`}>
              <BookOpen aria-hidden />
              <h3 className="mt-4 text-2xl font-bold">{l.name}</h3>
              <p className="mt-2 opacity-90">{l.blurb}</p>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-col items-start gap-4 rounded-3xl border-2 border-dashed border-sky-dark bg-sky/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-2xl font-bold text-primary">Refuerzo Escolar</h3>
            <p className="text-muted-foreground">Acompañamiento personalizado para potenciar el aprendizaje, hábitos de estudio y competencias básicas.</p>
          </div>
          <Link href="/servicios" className="shrink-0 rounded-full bg-primary px-6 py-3 font-display font-bold text-white">Conocer más</Link>
        </div>
      </section>

      {/* ENFOQUE */}
      <section className="bg-card py-20" aria-labelledby="enfoque">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="enfoque" className="text-4xl font-extrabold text-primary sm:text-5xl">Aprender explorando</h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">Un enfoque constructivista que coloca al niño en el centro: formamos solucionadores de problemas, no solo receptores de información.</p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { icon: Compass, t: 'Exploración del entorno', d: 'La curiosidad es el motor: observar, preguntar y descubrir.' },
              { icon: Puzzle, t: 'Juego y creatividad', d: 'Estrategias lúdicas, artísticas y de investigación.' },
              { icon: Leaf, t: 'Vivencia con la naturaleza', d: 'Sensibles y comprometidos con el cuidado del mundo.' },
            ].map(({ icon: Icon, t, d }) => (
              <li key={t} className="rounded-3xl bg-background p-7">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-science-dark text-white"><Icon aria-hidden /></span>
                <h3 className="mt-4 text-2xl font-bold text-primary-dark">{t}</h3>
                <p className="mt-1 text-muted-foreground">{d}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-primary p-7 text-white">
              <h3 className="text-2xl font-bold text-secondary">Misión</h3>
              <p className="mt-2 text-white/90">Formar niños y niñas autónomos, empáticos y cooperativos, capaces de construir su propio aprendizaje mediante la exploración, el juego y la experiencia.</p>
            </div>
            <div className="rounded-3xl bg-secondary p-7 text-on-secondary">
              <h3 className="text-2xl font-bold text-primary-dark">Visión 2030</h3>
              <p className="mt-2">Ser una institución reconocida por promover el aprendizaje significativo y el desarrollo integral en educación inicial y primaria.</p>
            </div>
          </div>
          <Link href="/nosotros" className="mt-6 inline-flex items-center gap-2 font-display text-lg font-bold text-primary underline underline-offset-4">Saber más sobre nosotros <ArrowRight aria-hidden size={18} /></Link>
        </div>
      </section>

      {/* ADMISIÓN */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="admision">
        <h2 id="admision" className="text-4xl font-extrabold text-primary sm:text-5xl">Solicitar un cupo es sencillo</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {['Contáctanos y agenda una visita guiada.', 'Entrevista con la dirección.', 'Entrega de documentación y matrícula.'].map((s, i) => (
            <li key={s} className="relative rounded-3xl border border-border bg-card p-7 pl-24 shadow-card">
              <span className="absolute left-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-secondary font-display text-3xl font-extrabold text-on-secondary">{i + 1}</span>
              <p className="text-lg font-semibold text-primary-dark">{s}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/requisitos" className="rounded-full bg-primary px-7 py-3 font-display text-lg font-bold text-white">Ver requisitos</Link>
          <Link href="/contacto" className="rounded-full border-2 border-primary px-7 py-3 font-display text-lg font-bold text-primary">Agendar visita</Link>
        </div>
      </section>

      {/* NOTICIAS */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6" aria-labelledby="noticias">
          <div className="flex items-end justify-between gap-4">
            <h2 id="noticias" className="text-4xl font-extrabold text-primary sm:text-5xl">Lo último en la comunidad</h2>
            <Link href="/entradas" className="hidden font-display font-bold text-primary underline sm:block">Ver todas</Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">{posts.map((p) => <PostCard key={p.id} post={p} />)}</div>
        </section>
      )}

      {/* TESTIMONIOS */}
      <section className="bg-primary-dark py-20 text-white" aria-labelledby="testimonios">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="testimonios" className="text-4xl font-extrabold sm:text-5xl">Familias que <span className="text-secondary">confían</span> en nosotros</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.name} className="rounded-3xl bg-white/10 p-7">
                <Quote aria-hidden className="text-secondary" />
                <blockquote className="mt-3 text-lg">{t.text}</blockquote>
                <p className="mt-4 font-display text-lg font-bold text-secondary">{t.name}</p>
                <p className="text-sm text-white/70">{t.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
