import { getAllPosts } from '@/lib/markdown'

export const dynamic = 'force-static'

export default function Home() {
  const posts = getAllPosts()
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(p => (
          <li key={p.slug}><a href={`/posts/${p.slug}`}>{p.data.title}</a></li>
        ))}
      </ul>
    </div>
  )
}
