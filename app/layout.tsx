import './globals.css'
import type { Metadata } from 'next'
import { siteConfig } from '@/site.config'

export const metadata: Metadata = {
  title: {
    default: siteConfig.siteName,
    template: `%s · ${siteConfig.siteName}`
  },
  description: siteConfig.siteDescription
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <div className="container navwrap">
            <a className="brand" href="/">{siteConfig.siteName}</a>
            <nav className="nav">
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div className="container">© {new Date().getFullYear()} {siteConfig.siteName}</div>
        </footer>
      </body>
    </html>
  )
}
