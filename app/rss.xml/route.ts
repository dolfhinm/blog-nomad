import { NextResponse } from 'next/server'
import { generateRSS } from '@/lib/rss'

export async function GET() {
  const xml = await generateRSS()
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 's-maxage=300, stale-while-revalidate=600' }
  })
}
