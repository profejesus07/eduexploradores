import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText as ConvertRichText, LinkJSXConverter, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import VideoEmbed from '@/components/VideoEmbed'

const buttonStyles: Record<string, string> = {
  primary: 'btn btn-primary',
  gold: 'btn border-secondary text-gold-text hover:bg-secondary hover:text-white',
  outline: 'btn btn-outline',
}
const calloutStyles: Record<string, string> = {
  info: 'border-sky',
  gold: 'border-secondary',
  green: 'border-science',
}

const internalDocToHref = ({ linkNode }: any) => {
  const doc = linkNode.fields?.doc
  const slug = typeof doc?.value === 'object' ? doc.value.slug : undefined
  if (!slug) return '/'
  return doc.relationTo === 'posts' ? `/entradas/${slug}` : `/${slug}`
}

const converters: JSXConvertersFunction<any> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    video: ({ node }: any) => <VideoEmbed url={node.fields.url} caption={node.fields.caption} />,
    button: ({ node }: any) => (
      <p>
        <a
          href={node.fields.url}
          {...(node.fields.newTab ? { target: '_blank', rel: 'noreferrer' } : {})}
          className={`${buttonStyles[node.fields.style] ?? buttonStyles.primary} !no-underline`}
        >
          {node.fields.label}
        </a>
      </p>
    ),
    callout: ({ node }: any) => (
      <aside className={`border-l-2 bg-paper p-6 ${calloutStyles[node.fields.tone] ?? calloutStyles.info}`}>
        {node.fields.title && <p className="font-display text-2xl text-primary">{node.fields.title}</p>}
        <p>{node.fields.text}</p>
      </aside>
    ),
  },
}) as any

export default function RichText({ data, className = '' }: { data?: DefaultTypedEditorState | null; className?: string }) {
  if (!data) return null
  return <ConvertRichText data={data} converters={converters} className={`prose-edu ${className}`} />
}
