'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type Item = { href: string; label: string }

/** Menú desplegable para pantallas < 1024px (incluye el "modo escritorio" de los celulares). Se cierra al tocar fuera, al navegar, con Esc o al ensanchar la ventana. */
export default function MobileMenu({ items, showCta }: { items: Item[]; showCta: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); button.current?.focus() } }
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false) }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <div ref={root} className="relative lg:hidden">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="menu-movil"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setOpen((o) => !o)}
        className={`flex h-11 w-11 items-center justify-center border transition-colors duration-300 ${open ? 'border-primary bg-primary text-white' : 'border-border bg-white text-primary'}`}
      >
        {open ? <X aria-hidden size={22} /> : <Menu aria-hidden size={22} />}
      </button>
      <nav
        id="menu-movil"
        aria-label="Principal móvil"
        inert={!open}
        className={`absolute right-0 top-14 w-64 origin-top-right border border-border bg-white p-2 shadow-[var(--shadow-card)] transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] ${open ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible -translate-y-2 scale-95 opacity-0'}`}
      >
        {items.map((n) => (
          <Link key={n.href} href={n.href} onClick={close} className="block border-b border-border/70 px-4 py-3 font-bold text-foreground/85 last:border-0 hover:bg-paper">
            {n.label}
          </Link>
        ))}
        {showCta && <Link href="/requisitos" onClick={close} className="btn btn-primary mt-2 w-full justify-center">Inscripciones abiertas</Link>}
      </nav>
    </div>
  )
}
