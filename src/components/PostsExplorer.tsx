'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import PostCard, { categoryLabel } from '@/components/PostCard'
import type { Post } from '@/payload-types'

export default function PostsExplorer({ posts }: { posts: Post[] }) {
  const categoria = useSearchParams().get('categoria') ?? ''
  const shown = categoria in categoryLabel ? posts.filter((p) => p.category === categoria) : posts
  const filters = [['', 'Todas'], ...Object.entries(categoryLabel)]
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <nav aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
        {filters.map(([v, l]) => (
          <Link key={v} href={v ? `/entradas?categoria=${v}` : '/entradas'} aria-current={categoria === v ? 'page' : undefined}
            className="rounded-full border-2 border-primary px-4 py-2 font-semibold text-primary aria-[current=page]:bg-primary aria-[current=page]:text-white">
            {l}
          </Link>
        ))}
      </nav>
      {shown.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{shown.map((p) => <PostCard key={p.id} post={p} />)}</div>
      ) : (
        <p className="mt-10 text-lg text-muted-foreground">Aún no hay entradas publicadas en esta categoría.</p>
      )}
    </div>
  )
}
