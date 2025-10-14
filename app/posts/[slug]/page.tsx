import { getAllPosts, getPostBySlug } from '@/lib/markdown'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export default function PostPage({ params }: { params: { slug: string }}) {
  const post: any = getPostBySlug(params.slug)
  if (!post) return <div>Not found</div>
  return (
    <article>
      <h1>{post.data.title}</h1>
      {post.data.cover ? <img src={post.data.cover} alt="cover" /> : null}
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  )
}
