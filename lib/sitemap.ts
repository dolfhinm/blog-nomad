import { canonical } from './seo'
import { getDatabasePosts } from './notion/client'

export async function generateSitemapXml() {
  const posts = await getDatabasePosts({ publishedOnly: true })
  const urls = [canonical('/'), canonical('/tags'), canonical('/about')]
    .concat(posts.map(p => canonical('/posts/' + p.slug)))
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(u => `<url><loc>${u}</loc></url>`).join('')}
  </urlset>`
}
