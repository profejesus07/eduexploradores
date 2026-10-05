import Image from 'next/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'
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
  return (
    <header className="sticky top-0 z-50 border-b-4 border-secondary bg-primary-dark text-white shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Exploradores del Saber, inicio">
          <Image src="/logo.webp" alt="" width={52} height={52} className="rounded-full bg-white" priority />
          <span className="font-display text-xl font-bold leading-none">
            Exploradores
            <span className="block text-sm font-semibold text-secondary">del Saber</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-full px-3 py-2 text-[0.95rem] font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-secondary">
              {n.label}
            </Link>
          ))}
          {open && (
            <Link href="/requisitos" className="ml-2 rounded-full bg-secondary px-5 py-2 font-display font-bold text-on-secondary transition-transform hover:-translate-y-0.5">
              Inscripciones
            </Link>
          )}
        </nav>

        <details className="group relative lg:hidden">
          <summary className="flex h-11 w-11 list-none items-center justify-center rounded-full bg-white/10" aria-label="Abrir menú">
            <Menu aria-hidden size={24} />
          </summary>
          <nav aria-label="Principal móvil" className="absolute right-0 top-14 w-64 rounded-2xl bg-white p-3 text-foreground shadow-2xl">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="block rounded-xl px-4 py-3 font-semibold hover:bg-background">
                {n.label}
              </Link>
            ))}
            {open && (
              <Link href="/requisitos" className="mt-2 block rounded-xl bg-secondary px-4 py-3 text-center font-display font-bold text-on-secondary">
                Inscripciones abiertas
              </Link>
            )}
          </nav>
        </details>
      </div>
    </header>
  )
}
