import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'PBN · Neo-style', description: 'Plain PBN with neo-bank inspired design' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <div className="container navwrap">
            <a className="brand" href="/">PBN</a>
            <nav className="nav">
              <a href="/">Home</a>
              <a href="/categories">Categories</a>
              <a href="/tags">Tags</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/search">Search</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div className="container">© {new Date().getFullYear()} PBN · <a href="/rss.xml">RSS</a></div>
        </footer>
      </body>
    </html>
  )
}
