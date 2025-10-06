import { canonical } from './seo'
import { getDatabasePosts } from './notion/client'

export async function generateRSS() {
  const posts = await getDatabasePosts({ publishedOnly: true })
  const site = process.env.NEXT_PUBLIC_SITE_NAME || 'Notion Blog'
  const items = posts.map(p => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${canonical('/posts/' + p.slug)}</link>
      <guid>${canonical('/posts/' + p.slug)}</guid>
      <pubDate>${p.date ?? new Date().toUTCString()}</pubDate>
      <description>${escapeXml(p.description || '')}</description>
    </item>`).join('')
  return `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>${escapeXml(site)}</title>
      <link>${canonical('/')}</link>
      <description>${escapeXml(site)} RSS</description>
      ${items}
    </channel>
  </rss>`
}

function escapeXml(str: string) {
  return str.replace(/[<>&'"]/g, (c) => ({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[c] as string))
}
