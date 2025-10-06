import { getAllPosts, getPostBySlug } from '@/lib/markdown'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return <div className="container"><div className="card"><h1>Not found</h1></div></div>

  return (
    <div className="container">
      <article className="prose card" style={{padding:'24px'}}>
        <h1>{post.data.title}</h1>
        <div className="card-meta">{new Date(post.data.date).toDateString()} · {post.readingTime}</div>
        {post.data.cover ? <img src={post.data.cover} alt="Cover" style={{borderRadius:12, margin:'12px 0'}}/> : null}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </div>
  )
}
