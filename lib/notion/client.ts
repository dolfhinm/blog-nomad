import { Client } from '@notionhq/client'
import type { PostMeta } from './types'

const token = process.env.NOTION_TOKEN
const databaseId = process.env.NOTION_DATABASE_ID
export const REVALIDATE_SECONDS = Number(process.env.REVALIDATE_SECONDS || 120)

export const notion = token ? new Client({ auth: token }) : null

function getPlain(rt?: { plain_text: string }[] | null): string | undefined {
  if (!rt) return undefined
  return rt.map(t => t.plain_text).join('')
}

export async function getDatabasePosts(opts?: { publishedOnly?: boolean, tag?: string }): Promise<PostMeta[]> {
  if (!notion || !databaseId) {
    return [{
      id: 'demo', title: 'Welcome to your Notion Blog', slug: 'welcome',
      description: 'Set NOTION_TOKEN & NOTION_DATABASE_ID to fetch real posts from Notion.',
      date: new Date().toISOString(), tags: ['demo'], published: true
    }]
  }

  const filters: any[] = []
  if (opts?.publishedOnly) filters.push({ property: 'Published', checkbox: { equals: true } })
  if (opts?.tag) filters.push({ property: 'Tags', multi_select: { contains: opts.tag } })

  const resp = await notion.databases.query({
    database_id: databaseId,
    filter: filters.length ? { and: filters } : undefined,
    sorts: [{ property: 'Date', direction: 'descending' }]
  })

  return resp.results.map((p: any) => {
    const props = p.properties
    const title = getPlain(props.Title?.title) || 'Untitled'
    const slug = getPlain(props.Slug?.rich_text) || p.id.replace(/-/g, '')
    const description = getPlain(props.Description?.rich_text)
    const date = props.Date?.date?.start
    const tags = (props.Tags?.multi_select || []).map((t: any) => t.name)
    const published = props.Published?.checkbox ?? false
    const coverUrl = (p.cover?.external?.url || p.cover?.file?.url) ?? undefined
    return { id: p.id, title, slug, description, date, tags, published, coverUrl }
  })
}

export async function getPostBySlug(slug: string) {
  const posts = await getDatabasePosts()
  const target = posts.find(p => p.slug === slug)
  if (!target) return null
  if (!notion || target.id === 'demo') {
    return {
      meta: target,
      blocks: [
        { id: 'h1', type: 'heading_1', heading_1: { rich_text: [{ plain_text: 'Hello 👋' }] } },
        { id: 'p1', type: 'paragraph', paragraph: { rich_text: [{ plain_text: 'Replace demo by setting NOTION env vars.' }] } }
      ]
    }
  }
  const blocks = await getPageBlocks(target.id)
  return { meta: target, blocks }
}

export async function getPageBlocks(pageId: string) {
  if (!notion) return []
  const blocks: any[] = []
  let cursor: string | undefined = undefined
  do {
    const resp = await notion.blocks.children.list({ block_id: pageId, start_cursor: cursor })
    blocks.push(...resp.results)
    cursor = (resp as any).next_cursor || undefined
  } while (cursor)
  return blocks
}
