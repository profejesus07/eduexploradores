import type { Metadata } from 'next'
import { Suspense } from 'react'
import PostsExplorer from '@/components/PostsExplorer'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Noticias y entradas' }

export default async function PostsPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'posts', depth: 1, limit: 100, sort: '-publishedAt', overrideAccess: false })
  return (
    <>
      <header className="bg-primary-dark text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl font-extrabold sm:text-6xl">Noticias de la comunidad</h1>
          <p className="mt-3 text-lg text-white/85">Novedades para familias, docentes, estudiantes y comunidad.</p>
        </div>
        <div className="h-2 bg-gradient-to-r from-secondary via-sky to-science" />
      </header>
      <Suspense>
        <PostsExplorer posts={docs} />
      </Suspense>
    </>
  )
}
