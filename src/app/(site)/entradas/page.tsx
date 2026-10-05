import type { Metadata } from 'next'
import { Suspense } from 'react'
import PageHeader from '@/components/PageHeader'
import PostsExplorer from '@/components/PostsExplorer'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Noticias y entradas' }

export default async function PostsPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'posts', depth: 1, limit: 100, sort: '-publishedAt', overrideAccess: false })
  return (
    <>
      <PageHeader title="Noticias de la comunidad" subtitle="Novedades para familias, docentes, estudiantes y comunidad." eyebrow="Actualidad" />
      <Suspense>
        <PostsExplorer posts={docs} />
      </Suspense>
    </>
  )
}
