import Link from 'next/link'
import type { Post } from '@/payload-types'

const tone: Record<string, string> = {
  noticias: 'bg-primary text-white',
  familias: 'bg-spark-dark text-white',
  docentes: 'bg-science-dark text-white',
  estudiantes: 'bg-secondary text-on-secondary',
  comunidad: 'bg-sky-dark text-white',
}
export const categoryLabel: Record<string, string> = { noticias: 'Noticias', familias: 'Familias', docentes: 'Docentes', estudiantes: 'Estudiantes', comunidad: 'Comunidad' }

export default function PostCard({ post }: { post: Post }) {
  const img = typeof post.coverImage === 'object' ? post.coverImage : null
  const cat = post.category ?? 'noticias'
  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-transform hover:-translate-y-1">
      <Link href={`/entradas/${post.slug}`} className="block">
        {img?.url ? (
          <img src={img.sizes?.card?.url || img.url} alt={img.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
        ) : (
          <div className="aspect-[4/3] bg-gradient-to-br from-primary to-sky-dark" aria-hidden />
        )}
        <div className="space-y-2 p-5">
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${tone[cat]}`}>{categoryLabel[cat]}</span>
          <h3 className="font-display text-xl font-bold text-primary-dark group-hover:text-primary">{post.title}</h3>
          <p className="text-muted-foreground">{post.excerpt}</p>
          {post.publishedAt && <p className="text-sm font-semibold text-muted-foreground">{new Date(post.publishedAt).toLocaleDateString('es-CO', { dateStyle: 'long' })}</p>}
        </div>
      </Link>
    </article>
  )
}
