import Image from 'next/image'
import Link from 'next/link'
import MobileMenu from '@/components/MobileMenu'
import logo from '@/assets/logo.webp'
import { getSettings } from '@/lib/settings'

export const nav = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/requisitos', label: 'Requisitos' },
  { href: '/entradas', label: 'Noticias' },
  { href: '/faqs', label: 'Preguntas' },
  { href: '/contacto', label: 'Contacto' },
]

export default async function Header() {
  const s = await getSettings().catch(() => null)
  const open = s?.enrollmentOpen ?? true
  const phone = s?.phone || '311 740 5949'
  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-primary-dark text-[.8rem] tracking-wide text-white/80 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-1.5">
          <span>Educación inicial · Valledupar</span>
          <a href={`tel:+57${phone.replace(/\D/g, '')}`} className="link-underline hover:text-gold-soft">{phone}</a>
        </div>
      </div>
      <div className="border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Exploradores del Saber, inicio">
            <Image src={logo} alt="" width={48} height={48} className="rounded-full" priority />
            <span className="font-display text-2xl font-semibold leading-[1.05] text-primary">
              Exploradores
              <span className="block text-[.95rem] font-medium italic tracking-wide text-gold-text">del Saber</span>
            </span>
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="link-underline py-1 text-[.95rem] font-bold tracking-wide text-foreground/80 hover:text-primary">
                {n.label}
              </Link>
            ))}
            {open && <Link href="/requisitos" className="btn btn-primary !min-h-0 !px-5 !py-2.5">Inscripciones</Link>}
          </nav>

          <MobileMenu items={nav} showCta={open} />
        </div>
      </div>
    </header>
  )
}
