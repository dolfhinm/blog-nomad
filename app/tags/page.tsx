import Container from '@/components/Container'
import Link from 'next/link'
import { getDatabasePosts, REVALIDATE_SECONDS } from '@/lib/notion/client'

export const revalidate = REVALIDATE_SECONDS

export default async function TagsPage() {
  const posts = await getDatabasePosts({ publishedOnly: true })
  const tags = new Map<string, number>()
  posts.forEach(p => p.tags.forEach(t => tags.set(t, (tags.get(t) || 0) + 1)))
  const list = [...tags.entries()].sort((a,b) => a[0].localeCompare(b[0]))
  return (
    <Container>
      <h1 className="text-2xl font-semibold mb-6">Tags</h1>
      <div className="flex flex-wrap gap-3">
        {list.map(([tag, count]) => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="border px-3 py-1 rounded-full text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900">
            {tag} <span className="opacity-60">({count})</span>
          </Link>
        ))}
      </div>
    </Container>
  )
}
