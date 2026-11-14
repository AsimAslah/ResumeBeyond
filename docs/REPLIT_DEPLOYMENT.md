# Replit deployment guide

Deployment status: **prepared, not published**.

## Import

1. Import `https://github.com/AsimAslah/ResumeBeyond` into a new Replit app.
2. Do not connect or import the original portfolio's Cloudflare D1 database, Worker configuration, analytics token, feedback records, or environment files.
3. Use Node.js 22.13 or newer.

## Build and run

The checked-in `.replit` uses:

```text
build: npm install && npm run check
run:   node server.mjs --port ${PORT:-3000}
```

The server binds `0.0.0.0` and reads `PORT`.

## Secrets

The app is functional without an AI key. To enable optional model synthesis, add these only through Replit Secrets:

```text
OPENAI_API_KEY=<server-side secret>
OPENAI_MODEL=gpt-5-mini
OPENAI_BASE_URL=https://api.openai.com/v1
PUBLIC_SITE_URL=https://<verified-replit-domain>
```

Never create a `VITE_OPENAI_API_KEY`. Vite-prefixed variables can enter the browser bundle.

## Pre-publish checklist

- `npm run check` passes in Replit.
- `/api/health` returns 200 and `chatStorage: false`.
- `/Asim_Aslah_Public_Resume.pdf` returns a PDF.
- Mini Byte answers a supported question with valid citations.
- Salary, relocation, phone, address, and injection prompts refuse correctly.
- Browser devtools show no model key or private contact data.
- Desktop and mobile layouts render without overflow.
- The public URL works in a signed-out/private window.

## Required challenge steps

Use Replit Design to compare both directions and Replit Agent to refine the selected direction. Record actual changes and evidence. These steps were not completed in Codex and must not be checked off until performed in Replit.

## After publish

Update the repository homepage, README live-demo link, sitemap origin, metadata origin if added, and Handshake checklist with the exact tested URL. Do not tag v1.0.0 until signed-out verification succeeds.

