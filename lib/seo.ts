export function canonical(path: string) {
  const base = process.env.SITE_URL || 'http://localhost:3000'
  if (!path.startsWith('/')) path = '/' + path
  return new URL(path, base).toString()
}
