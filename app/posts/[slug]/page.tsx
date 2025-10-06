import Container from '@/components/Container'
import NotionRenderer from '@/components/NotionRenderer'
import { getDatabasePosts, getPostBySlug, REVALIDATE_SECONDS } from '@/lib/notion/client'
import { notFound } from 'next/navigation'

export const revalidate = REVALIDATE_SECONDS

export async function generateStaticParams() {
  const posts = await getDatabasePosts({ publishedOnly: true })
  return posts.map(p => ({ slug: p.slug }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return notFound()
  return (
    <Container>
      <article className="prose prose-zinc dark:prose-invert">
        <h1 className="mb-2">{post.meta.title}</h1>
        {post.meta.description ? <p className="opacity-80 -mt-4">{post.meta.description}</p> : null}
      </article>
      <div className="mt-6">
        <NotionRenderer blocks={post.blocks} />
      </div>
    </Container>
  )
}
