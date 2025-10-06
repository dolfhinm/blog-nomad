import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import readingTime from 'reading-time'

export type PostFrontmatter = {
  title: string
  date: string
  slug?: string
  tags?: string[]
  category?: string
  excerpt?: string
  cover?: string
  author?: string
}

export type Post = {
  slug: string
  content: string
  html: string
  readingTime: string
  data: Required<PostFrontmatter> & { isoDate: string }
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export function getAllPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
}

export function parsePost(fileName: string): Post {
  const filePath = path.join(POSTS_DIR, fileName)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const fm = data as PostFrontmatter
  const slug = fm.slug || fileName.replace(/\.md$/, '')
  const isoDate = new Date(fm.date).toISOString()
  const rt = readingTime(content).text
  const compiled = remark().use(html).processSync(content).toString()
  const full: Post = {
    slug,
    content,
    html: compiled,
    readingTime: rt,
    data: {
      title: fm.title || slug,
      date: fm.date,
      isoDate,
      slug,
      tags: fm.tags || [],
      category: fm.category || 'General',
      excerpt: fm.excerpt || content.slice(0, 140),
      cover: fm.cover || '',
      author: fm.author || 'Admin'
    }
  }
  return full
}

export function getAllPosts(): Post[] {
  return getAllPostFiles()
    .map(parsePost)
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  const file = getAllPostFiles().find(f => f.replace(/\.md$/, '') === slug)
  return file ? parsePost(file) : null
}
