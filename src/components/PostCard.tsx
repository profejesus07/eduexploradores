import Link from 'next/link'
import type { Post } from '@/payload-types'

export const categoryLabel: Record<string, string> = { noticias: 'Noticias', familias: 'Familias', docentes: 'Docentes', estudiantes: 'Estudiantes', comunidad: 'Comunidad' }

export default function PostCard({ post }: { post: Post }) {
  const img = typeof post.coverImage === 'object' ? post.coverImage : null
  const cat = post.category ?? 'noticias'
  return (
    <article className="group lift h-full border border-border bg-card">
      <Link href={`/entradas/${post.slug}`} className="flex h-full flex-col">
        <div className="overflow-hidden">
          {img?.url ? (
            <img src={img.sizes?.card?.url || img.url} alt={img.alt} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
          ) : (
            <div className="relative aspect-[4/3] bg-primary-dark" aria-hidden>
              <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-soft/30" />
              <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-soft/20" />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <p className="text-[.75rem] font-bold uppercase tracking-[.16em] text-gold-text">{categoryLabel[cat]}</p>
          <h3 className="text-[1.7rem] leading-tight text-primary">{post.title}</h3>
          <p className="text-muted-foreground">{post.excerpt}</p>
          {post.publishedAt && <p className="mt-auto pt-2 text-sm text-muted-foreground">{new Date(post.publishedAt).toLocaleDateString('es-CO', { dateStyle: 'long' })}</p>}
        </div>
      </Link>
    </article>
  )
}
