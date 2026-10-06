'use client'

import { X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import RichText from '@/components/RichText'
import VideoEmbed from '@/components/VideoEmbed'

export type PopupData = {
  id: number | string
  title: string
  showTitle?: boolean | null
  imageUrl?: string | null
  imageAlt?: string | null
  imageWidth?: number | null
  imageHeight?: number | null
  body?: any
  videoUrl?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  showOn: 'home' | 'all'
  frequency: 'session' | 'day' | 'always'
  delaySeconds: number
}

const seenKey = (p: PopupData) => `popup-${p.id}`

function alreadySeen(p: PopupData) {
  try {
    if (p.frequency === 'always') return false
    if (p.frequency === 'session') return sessionStorage.getItem(seenKey(p)) === '1'
    const t = Number(localStorage.getItem(seenKey(p)) || 0)
    return Date.now() - t < 24 * 3600 * 1000
  } catch {
    return false
  }
}

function markSeen(p: PopupData) {
  try {
    if (p.frequency === 'session') sessionStorage.setItem(seenKey(p), '1')
    else if (p.frequency === 'day') localStorage.setItem(seenKey(p), String(Date.now()))
  } catch {}
}

// Nodos de Lexical que por sí solos no aportan contenido visible
const EMPTY_NODE_TYPES = ['root', 'paragraph', 'heading', 'list', 'listitem', 'quote', 'linebreak', 'tab', 'text']

// El editor guarda un texto "vacío" como un párrafo sin texto: eso no cuenta como descripción.
function richTextHasContent(node: any): boolean {
  if (!node) return false
  if (typeof node.text === 'string' && node.text.trim() !== '') return true
  if (Array.isArray(node.children)) return node.children.some(richTextHasContent)
  // Nodos sin hijos que sí se ven (imagen, línea horizontal, tabla, bloque…)
  return typeof node.type === 'string' && !EMPTY_NODE_TYPES.includes(node.type)
}

function flags(p: PopupData) {
  return {
    showTitle: Boolean(p.showTitle && p.title?.trim()),
    hasImage: Boolean(p.imageUrl),
    hasBody: richTextHasContent(p.body?.root ?? p.body),
    hasVideo: Boolean(p.videoUrl?.trim()),
    // El botón necesita texto Y enlace; con uno solo no se muestra.
    hasCta: Boolean(p.ctaUrl?.trim() && p.ctaLabel?.trim()),
  }
}

// Un popup sin nada que mostrar no se abre.
function hasVisibleContent(p: PopupData) {
  const f = flags(p)
  return f.showTitle || f.hasImage || f.hasBody || f.hasVideo || f.hasCta
}

export default function PopupManager({ popups }: { popups: PopupData[] }) {
  const pathname = usePathname()
  const [current, setCurrent] = useState<PopupData | null>(null)
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (pathname.startsWith('/admin')) return
    const next = popups.find((p) => hasVisibleContent(p) && (p.showOn === 'all' || pathname === '/') && !alreadySeen(p))
    if (!next) return
    const t = setTimeout(() => setCurrent(next), Math.max(0, next.delaySeconds) * 1000)
    return () => clearTimeout(t)
  }, [pathname, popups])

  useEffect(() => {
    if (current && ref.current && !ref.current.open) ref.current.showModal()
  }, [current])

  if (!current) return null
  const close = () => {
    markSeen(current)
    ref.current?.close()
    setCurrent(null)
  }
  const f = flags(current)
  const hasText = f.showTitle || f.hasBody || f.hasVideo || f.hasCta
  const ratio = current.imageWidth && current.imageHeight ? current.imageWidth / current.imageHeight : null

  // Solo imagen: el cuadro se ajusta exactamente a la imagen (completa, sin recortes ni barras),
  // centrado y siempre dentro de la pantalla, también en celulares (vertical u horizontal).
  const hugImage = f.hasImage && !hasText && ratio !== null
  const dialogStyle = hugImage ? { width: `min(92vw, 34rem, calc((100dvh - 3rem) * ${ratio}))` } : undefined
  const imgClass = hugImage
    ? 'block h-auto w-full'
    : hasText
      ? 'block max-h-[60dvh] w-full object-contain'
      : 'block max-h-[calc(100dvh-3rem)] w-full object-contain'

  return (
    <dialog
      ref={ref}
      // Sin título visible, el título interno solo se usa como nombre accesible del diálogo
      aria-labelledby={f.showTitle ? 'popup-title' : undefined}
      aria-label={f.showTitle ? undefined : current.title}
      onClose={close}
      onClick={(e) => e.target === ref.current && close()}
      style={dialogStyle}
      className="popup m-auto w-[min(92vw,34rem)] max-h-[calc(100dvh-1.5rem)] overflow-y-auto border-t-4 border-secondary bg-background p-0 text-foreground shadow-2xl backdrop:bg-primary-dark/70 backdrop:backdrop-blur-[2px]"
    >
      <button onClick={close} aria-label="Cerrar" className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center bg-white/95 text-primary shadow transition-transform hover:rotate-90">
        <X aria-hidden />
      </button>
      {f.hasImage && (
        <img
          src={current.imageUrl!}
          alt={current.imageAlt || ''}
          width={current.imageWidth ?? undefined}
          height={current.imageHeight ?? undefined}
          className={imgClass}
        />
      )}
      {hasText && (
        <div className={`space-y-5 p-8 ${f.hasImage ? '' : 'pt-16'}`}>
          {f.showTitle && <h2 id="popup-title" className="text-4xl text-primary">{current.title}</h2>}
          {f.hasBody && <RichText data={current.body} />}
          {f.hasVideo && <VideoEmbed url={current.videoUrl!} />}
          {f.hasCta && (
            <a href={current.ctaUrl!} onClick={close} className="btn btn-primary">
              {current.ctaLabel!.trim()}
            </a>
          )}
        </div>
      )}
    </dialog>
  )
}
