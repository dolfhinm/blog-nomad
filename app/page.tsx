export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>Discover simple, useful posts</h1>
          <p>Plain-English guides and lists. Neutral look. SEO-ready.</p>
          <form className="searchbar" action="/search">
            <input name="q" placeholder="Search posts..." />
            <button>Search</button>
          </form>
        </div>
      </section>

      <section className="container grid">
        {Array.from({length:6}).map((_,i)=> (
          <article className="card" key={i}>
            <div className="card-meta">Sep 2025 · 3 min</div>
            <h2 className="card-title"><a href={`/posts/post-${i+1}`}>Sample Post Title {i+1}</a></h2>
            <p className="card-excerpt">Short excerpt preview for this post showing the card layout and neutral tone.</p>
            <div className="pillrow">
              <a className="pill" href="/tags/guide">#guide</a>
              <a className="pill" href="/tags/finance">#finance</a>
              <a className="pill" href="/categories/general">General</a>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
