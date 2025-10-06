import { NextResponse } from 'next/server'
import { generateSitemapXml } from '@/lib/sitemap'

export async function GET() {
  const xml = await generateSitemapXml()
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 's-maxage=300, stale-while-revalidate=600' }
  })
}
