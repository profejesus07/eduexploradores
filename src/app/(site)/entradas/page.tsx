import type { Metadata } from 'next'
import Link from 'next/link'
import PostCard, { categoryLabel } from '@/components/PostCard'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Noticias y entradas' }

export default async function PostsPage({ searchParams }: { searchParams: Promise<{ categoria?: string }> }) {
  const { categoria } = await searchParams
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 24,
    sort: '-publishedAt',
    overrideAccess: false,
    where: categoria && categoria in categoryLabel ? { category: { equals: categoria } } : undefined,
  })
  const filters = [['', 'Todas'], ...Object.entries(categoryLabel)]
  return (
    <>
      <header className="bg-primary-dark text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl font-extrabold sm:text-6xl">Noticias de la comunidad</h1>
          <p className="mt-3 text-lg text-white/85">Novedades para familias, docentes, estudiantes y comunidad.</p>
        </div>
        <div className="h-2 bg-gradient-to-r from-secondary via-sky to-science" />
      </header>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <nav aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
          {filters.map(([v, l]) => (
            <Link key={v} href={v ? `/entradas?categoria=${v}` : '/entradas'} aria-current={(categoria ?? '') === v ? 'page' : undefined}
              className="rounded-full border-2 border-primary px-4 py-2 font-semibold text-primary aria-[current=page]:bg-primary aria-[current=page]:text-white">
              {l}
            </Link>
          ))}
        </nav>
        {docs.length ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{docs.map((p) => <PostCard key={p.id} post={p} />)}</div>
        ) : (
          <p className="mt-10 text-lg text-muted-foreground">Aún no hay entradas publicadas en esta categoría.</p>
        )}
      </div>
    </>
  )
}
