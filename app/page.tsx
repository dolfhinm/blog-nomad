import Container from '@/components/Container'
import PostCard from '@/components/PostCard'
import { getDatabasePosts, REVALIDATE_SECONDS } from '@/lib/notion/client'

export const revalidate = REVALIDATE_SECONDS

export default async function HomePage() {
  const posts = await getDatabasePosts({ publishedOnly: true })
  return (
    <Container>
      <section className="mb-10">
        <h1 className="text-3xl font-semibold mb-2">Latest posts</h1>
        <p className="opacity-80">Powered by your Notion database. Edit content in Notion and it’ll refresh here via ISR.</p>
      </section>

      <div className="grid gap-6">
        {posts.map(p => <PostCard key={p.id} post={p} />)}
      </div>
    </Container>
  )
}
