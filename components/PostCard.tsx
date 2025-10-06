import Link from 'next/link'
import Image from 'next/image'
import type { PostMeta } from '@/lib/notion/types'

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="rounded-lg border border-zinc-200/40 dark:border-zinc-700/40 p-4 hover:shadow-sm transition">
      {post.coverUrl ? (
        <div className="mb-3 overflow-hidden rounded-md">
          <Image src={post.coverUrl} alt={post.title} width={1200} height={630} className="w-full h-auto object-cover" />
        </div>
      ) : null}
      <h3 className="text-xl font-semibold mb-2">
        <Link href={`/posts/${post.slug}`} className="hover:underline">{post.title}</Link>
      </h3>
      {post.description ? <p className="text-sm opacity-80">{post.description}</p> : null}
      <div className="mt-3 flex flex-wrap gap-2">
        {post.tags?.map(tag => (
          <span key={tag} className="text-xs border px-2 py-1 rounded-full opacity-80">{tag}</span>
        ))}
      </div>
    </article>
  )
}
