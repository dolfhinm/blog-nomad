import './globals.css'
import { ReactNode } from 'react'
import Link from 'next/link'

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  title: process.env.NEXT_PUBLIC_SITE_NAME || 'Notion Blog',
  description: 'A Notion-powered blog built with Next.js & Vercel.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const site = process.env.NEXT_PUBLIC_SITE_NAME || 'Notion Blog'
  return (
    <html lang="en">
      <body>
        <header className="border-b border-zinc-200/40 dark:border-zinc-700/40">
          <nav className="mx-auto max-w-3xl px-6 py-5 flex items-center justify-between">
            <Link href="/" className="font-semibold">{site}</Link>
            <div className="flex gap-4 text-sm">
              <Link href="/tags">Tags</Link>
              <Link href="/about">About</Link>
              <a href="/rss.xml">RSS</a>
            </div>
          </nav>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-zinc-200/40 dark:border-zinc-700/40 mt-16">
          <div className="mx-auto max-w-3xl px-6 py-8 opacity-70 text-sm">
            © {new Date().getFullYear()} {site}. Built on Next.js · Notion.
          </div>
        </footer>
      </body>
    </html>
  )
}
