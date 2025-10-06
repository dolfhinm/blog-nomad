# Notion → Next.js Blog (Vercel) — Fixed

This build removes MDX-related deps so Vercel won't hit ETARGET on `next-mdx-remote`. It keeps a lean Notion-based blog with ISR.

## Deploy
1. Push to GitHub.
2. Import into Vercel.
3. Set env vars: `NOTION_TOKEN`, `NOTION_DATABASE_ID`, `SITE_URL`, `NEXT_PUBLIC_SITE_NAME`, `REVALIDATE_SECONDS`, `REVALIDATE_SECRET`.
