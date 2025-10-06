import Container from '@/components/Container'
import PostCard from '@/components/PostCard'
import { getDatabasePosts, REVALIDATE_SECONDS } from '@/lib/notion/client'

export const revalidate = REVALIDATE_SECONDS

export default async function TagPage({ params }: { params: { tag: string } }) {
  const posts = await getDatabasePosts({ publishedOnly: true, tag: decodeURIComponent(params.tag) })
  return (
    <Container>
      <h1 className="text-2xl font-semibold mb-6">#{decodeURIComponent(params.tag)}</h1>
      <div className="grid gap-6">
        {posts.map(p => <PostCard key={p.id} post={p} />)}
      </div>
    </Container>
  )
}
