# Notion → Next.js Blog (Vercel)

A minimal, production-ready starter that pulls posts from a Notion database and renders them with a Notion-like theme. Built with **Next.js App Router + TypeScript + Tailwind** and deploys cleanly to **Vercel** with ISR.

## Quickstart

```bash
pnpm i
cp .env.example .env.local
# Fill NOTION_TOKEN and NOTION_DATABASE_ID
pnpm dev
```

Deploy on Vercel. Set the same env vars in the Vercel dashboard and enable automatic deployments from GitHub.

## Notion Setup

Create a database with properties:
- **Title** (title)
- **Slug** (rich text or formula)
- **Published** (checkbox)
- **Date** (date)
- **Tags** (multi-select)
- **Description** (rich text)
- **Cover** (page cover)

Share the database with the integration that owns `NOTION_TOKEN`.

## Revalidation

Set `REVALIDATE_SECONDS` (default 120). You can also call the revalidate API:

```
POST /api/revalidate?secret=<your-secret>&path=/
```

Configure a Notion automation/webhook to hit this when the database changes.
