import { BlocksFeature, FixedToolbarFeature, LinkFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { blocks } from '@/blocks'

/** Editor de texto enriquecido compartido: texto, títulos, listas, imágenes, enlaces, videos y botones. */
export const richEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures.filter((f) => f.key !== 'link'),
    LinkFeature({ enabledCollections: ['pages', 'posts'] }),
    BlocksFeature({ blocks }),
    FixedToolbarFeature(),
  ],
})
