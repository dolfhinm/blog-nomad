import { getAllPosts } from '@/lib/markdown'

export const dynamic = 'force-static'

export default function Home() {
  const posts = getAllPosts()
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>All about Nomad</h1>
          <p>Life expirience, guides and what need to become Nomad</p>
        </div>
      </section>
      <section className="container grid">
        {posts.map((p) => (
          <article className="card" key={p.slug}>
            <div className="card-meta">{new Date(p.data.date).toDateString()} · {p.readingTime}</div>
            <h2 className="card-title"><a href={`/posts/${p.slug}`}>{p.data.title}</a></h2>
            <p className="card-excerpt">{p.data.excerpt ?? ''}</p>
            <div className="pillrow">
              {p.data.category ? <span className="pill">{p.data.category}</span> : null}
              {p.data.tags?.map(t => <span key={t} className="pill">#{t}</span>)}
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
