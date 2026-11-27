# Architecture

## Decision summary

ResumeBeyond uses a Vite-built React 19 client and one native Node.js HTTP process. This small architecture is compatible with Replit and intentionally excludes the original portfolio's Vinext, Wrangler, Cloudflare Worker, D1, Drizzle, feedback-cookie, and analytics dependencies.

## Request flow

```text
Recruiter question
  -> content-type and byte limit
  -> message schema and conversation limit
  -> process-local rate limit
  -> privacy / unsupported / injection classification
  -> weighted lexical retrieval over approved evidence
  -> deterministic cited synthesis
       OR optional server-side model synthesis with an 8-second timeout
  -> strict JSON and citation allow-list validation
  -> private-output filter
  -> cited answer, deterministic fallback, or exact refusal
```

## Client

- React and TypeScript render both approved design directions from one typed knowledge base.
- `/` is the recruiter-first direction; `/directions/evolution` preserves the premium character-led alternative.
- Multi-turn chat exists only in component memory; reset discards it.
- Theme preference may use local storage, but chat content never does.
- React renders text rather than model-supplied HTML.

## Server

`server.mjs` provides:

- static Vite output and resume delivery;
- security headers;
- `/api/health` with `chatStorage: false`;
- `/api/ambassador` validation, retrieval, optional provider generation, output validation, and safe errors;
- dynamic `robots.txt` and `sitemap.xml`.

Static files pass through one resolver. It decodes the URL safely, normalizes backslashes, checks lexical containment below `dist`, requires a regular file, and checks the candidate's resolved real path remains below the resolved build root. Invalid encoding, traversal, sibling-directory access, and symlink escapes return no file.

The server logs startup metadata only and contains no recruiter-question or answer logger.

## Retrieval and generation

The registry is small, so deterministic weighted lexical retrieval is more inspectable than an external vector database. Each evidence record includes a stable ID, bounded statement/excerpt, source IDs, section anchor, keywords, and optional project association.

Without a model key, the server returns deterministic evidence synthesis and identifies the mode as `evidence-fallback`. With a key, it sends the current question and retrieved public evidence to an OpenAI-compatible Responses endpoint. Missing, invented, or out-of-scope citations and private output cause the deterministic response to replace model output.

## Data classification

| Data | Storage | External transmission |
| --- | --- | --- |
| Public portfolio content | Source-controlled | Public website |
| Recruiter conversation | Request and React memory only | Optional provider only when configured |
| IP-derived rate key | Process memory for one minute | None |
| Theme preference | Browser local storage | None |
| Model key | Server environment | Provider authorization header only |

## Package and deployment model

npm is the sole package manager. `package-lock.json` is canonical; local, CI, and Replit deployment builds use `npm ci`. The recursive audit script prevents an unnoticed nested lockfile from bypassing dependency review.

The Node server binds `0.0.0.0`, reads `PORT`, performs no runtime filesystem writes, and needs no database or background worker. `scripts/verify-deployment.mjs` checks the public origin after Replit publication.
