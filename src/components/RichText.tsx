import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText as ConvertRichText, LinkJSXConverter, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import VideoEmbed from '@/components/VideoEmbed'

const buttonStyles: Record<string, string> = {
  primary: 'bg-primary text-white',
  gold: 'bg-secondary text-on-secondary',
  outline: 'border-2 border-primary text-primary',
}
const calloutStyles: Record<string, string> = {
  info: 'border-sky-dark bg-sky/10',
  gold: 'border-secondary bg-secondary/15',
  green: 'border-science-dark bg-science/10',
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
          className={`inline-block rounded-full px-6 py-3 font-display font-bold no-underline ${buttonStyles[node.fields.style] ?? buttonStyles.primary}`}
          style={{ textDecoration: 'none', color: undefined }}
        >
          {node.fields.label}
        </a>
      </p>
    ),
    callout: ({ node }: any) => (
      <aside className={`rounded-2xl border-l-8 p-5 ${calloutStyles[node.fields.tone] ?? calloutStyles.info}`}>
        {node.fields.title && <p className="font-display text-lg font-bold">{node.fields.title}</p>}
        <p>{node.fields.text}</p>
      </aside>
    ),
  },
}) as any

export default function RichText({ data, className = '' }: { data?: DefaultTypedEditorState | null; className?: string }) {
  if (!data) return null
  return <ConvertRichText data={data} converters={converters} className={`prose-edu ${className}`} />
}
