import type { Media } from '@/payload-types'

const WIDTH = { card: 828, hero: 1920, popup: 1080 } as const

const optimize = (url: string, w: number) =>
  /^https?:\/\//.test(url) ? `/_next/image?url=${encodeURIComponent(url)}&w=${w}&q=75` : url

/**
 * URL para mostrar una imagen de la biblioteca de medios.
 * Usa el tamaño generado por el servidor si existe; si no (subidas directas a Vercel Blob),
 * pide a Next una versión optimizada del original.
 * "popup" no recorta: usa el tamaño "hero" (solo ancho, conserva la proporción) en lugar de
 * "card" (800×600 recortado al centro).
 */
export function mediaSrc(img: Media | null | undefined, size: 'card' | 'hero' | 'popup'): string | undefined {
  if (!img?.url) return undefined
  const generated = img.sizes?.[size === 'popup' ? 'hero' : size]?.url
  return generated || optimize(img.url, WIDTH[size])
}
