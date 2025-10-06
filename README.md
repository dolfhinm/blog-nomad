# PBN NeoStyle (Next.js 14 + Markdown)

Clean, fintech-inspired PBN blog. Posts are Markdown files in `content/posts/`.

## Quick Start
```bash
npm install
npm run dev
```

## Build & Deploy (Vercel)
- Uses `next.config.mjs` (Vercel-compatible).
- Push to GitHub → Import on Vercel → Deploy.

## Content
Add posts in `content/posts/*.md` with frontmatter:
```
---
title: "Post Title"
date: "2025-10-06"
slug: "post-slug"
tags: ["tag-a","tag-b"]
category: "General"
excerpt: "Short text..."
cover: "/images/folder/cover.jpg"
author: "Admin"
---
Body **Markdown** here...
```

## Included Example
- `content/posts/money-habits-2025.md`
- Images in `public/images/money-habits-2025/`
