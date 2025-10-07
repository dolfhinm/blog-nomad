import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export function getAllPostFiles() {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
}

export function getAllPosts() {
  return getAllPostFiles().map(f => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf-8')
    const { data, content } = matter(raw)
    const compiled = remark().use(html).processSync(content).toString()
    return { slug: (data.slug || f.replace(/\.md$/, '')), data, html: compiled }
  }).sort((a,b)=> a.data.date < b.data.date ? 1 : -1)
}

export function getPostBySlug(slug) {
  const file = getAllPostFiles().find(f => f.replace(/\.md$/, '') === slug)
  if (!file) return null
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8')
  const { data, content } = matter(raw)
  const compiled = remark().use(html).processSync(content).toString()
  return { slug, data, html: compiled }
}
