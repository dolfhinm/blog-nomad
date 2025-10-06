import Image from 'next/image'

type Block = any
const RT = (block: any) => (block?.rich_text || []).map((t: any, i: number) => <span key={i}>{t.plain_text}</span>)

export default function NotionRenderer({ blocks }: { blocks: Block[] }) {
  if (!blocks?.length) return <p>No content.</p>
  return (
    <div className="prose prose-zinc dark:prose-invert">
      {blocks.map((b: any) => {
        switch (b.type) {
          case 'heading_1': return <h1 key={b.id}>{RT(b.heading_1)}</h1>
          case 'heading_2': return <h2 key={b.id}>{RT(b.heading_2)}</h2>
          case 'heading_3': return <h3 key={b.id}>{RT(b.heading_3)}</h3>
          case 'paragraph': return <p key={b.id}>{RT(b.paragraph)}</p>
          case 'quote': return <blockquote key={b.id}>{RT(b.quote)}</blockquote>
          case 'bulleted_list_item': return <li key={b.id}>{RT(b.bulleted_list_item)}</li>
          case 'numbered_list_item': return <li key={b.id}>{RT(b.numbered_list_item)}</li>
          case 'image': {
            const src = b.image?.external?.url || b.image?.file?.url
            const cap = (b.image?.caption || []).map((t: any) => t.plain_text).join('')
            return (
              <figure key={b.id}>
                {src ? <Image src={src} alt={cap || 'image'} width={1200} height={630} /> : null}
                {cap ? <figcaption className="text-sm opacity-70">{cap}</figcaption> : null}
              </figure>
            )
          }
          default: return <pre key={b.id}><code>{b.type} not implemented</code></pre>
        }
      })}
    </div>
  )
}
