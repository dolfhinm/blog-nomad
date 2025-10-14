# PBN NeoBank — Vercel Node 20–22 (Next.js 15.5.x)

- Next.js: ^15.5.4
- Node engines: >=20 <23 (works with Vercel 20.x and 22.x)
- App Router + TypeScript; Markdown posts in `content/posts`

## Dev
```bash
npm install
npm run dev
```

## Build & Run
```bash
npm run build
npm start
```

## Vercel
- Project → Settings → Node.js Version: 22.x (default) or 20.x if you prefer.
- No custom server needed. `next.config.mjs` is compatible.
