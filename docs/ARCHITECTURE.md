# Architecture

## Decision summary

ResumeBeyond uses a Vite-built React client and one native Node.js process. This keeps the target Replit deployment small and removes the original portfolio's Vinext, Wrangler, Cloudflare Worker, D1, Drizzle, feedback-cookie, and analytics dependencies.

## Request flow

```text
Recruiter question
  -> HTTP content-type and byte limit
  -> message schema and conversation limit
  -> process-local rate limit
  -> privacy / unsupported / injection classification
  -> weighted lexical retrieval from the approved evidence registry
  -> deterministic cited synthesis
       OR optional server-side model synthesis (8 second timeout)
  -> JSON parse and citation allow-list validation
  -> private-output filter
  -> cited answer, deterministic fallback, or explicit refusal
```

## Client

- React and TypeScript render both design directions from the same typed knowledge base.
- Multi-turn messages exist only in component memory.
- Reset discards the in-memory conversation.
- Theme preference may use local storage; chat content never does.
- React escapes rendered text; the application does not inject model HTML.

## Server

`server.mjs` owns:

- static Vite output and resume delivery;
- security headers;
- `/api/health` with an explicit `chatStorage: false` contract;
- `/api/ambassador` validation, retrieval, optional provider call, validation, and safe errors;
- `robots.txt` and `sitemap.xml`.

The server logs startup metadata only. It deliberately contains no recruiter-question or answer logging statement.

## Retrieval

The candidate knowledge base is small, so a deterministic weighted lexical retriever is more reliable and inspectable than an external vector database. Keyword matches receive the strongest score, body matches add recall, and role-fit language receives a bounded routing boost.

Each evidence record contains stable IDs, statements, excerpts, source IDs, section anchors, keywords, and optional project associations. The server returns only registry-backed citations.

## Optional generation

Without `OPENAI_API_KEY`, the server synthesizes answers directly from approved evidence and labels them as an evidence fallback. With a key, it sends the current question and retrieved evidence to an OpenAI-compatible Responses endpoint. The response must be strict JSON with an answer and source IDs. Missing, invented, or out-of-scope citations cause the deterministic fallback to replace the model output.

## Data classification

| Data | Storage | External transmission |
| --- | --- | --- |
| Public portfolio content | Source-controlled | Public website |
| Recruiter conversation | Request and React memory only | Optional model provider only when configured |
| IP-derived rate key | Process memory for one minute | None |
| Theme preference | Browser local storage | None |
| Model key | Server environment | Provider authorization header |

## Replit compatibility

The server binds `0.0.0.0` and reads the platform `PORT`. It uses no raw TCP dependency, database, filesystem writes, background worker, or platform-specific Cloudflare binding.

