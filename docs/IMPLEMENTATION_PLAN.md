# ResumeBeyond implementation plan

Last updated: 2026-11-14

## Guardrails

- Treat `AsimAslah/ResumeBeyond` as a clean, independent public project.
- Do not modify, merge into, deploy, or connect to the original `asim-portfolio` repository, Worker, D1 database, analytics, or feedback data.
- Publish only claims tied to the approved source registry. Unsupported questions must return: “I don't have verified information about that.”
- Never migrate the original resume, telephone/WhatsApp details, residential or precise location data, personal email, credentials, runtime data, or Cloudflare identifiers.
- Keep ambassador conversations in request and React memory only. Do not log prompts, persist browser chat state, or send chat content to analytics.

## Inspection findings

1. The destination repository is public and empty; the local checkout has no commits or remote.
2. The original portfolio uses Next.js 16, React 19, TypeScript, Vinext, Tailwind, Cloudflare Workers, D1, Drizzle, and a Cloudflare-only feedback API.
3. Reusable assets include the Mini Byte visual language, theme controls, responsive project imagery, EvalLens screenshots, and structured project narratives.
4. Cloudflare configuration, D1 identifiers, feedback persistence, analytics configuration, contact email/WhatsApp links, and existing resume files are not safe migration candidates.
5. The existing resume exposes a telephone number, personal email, and precise location. It is blocked from publication in ResumeBeyond.
6. EvalLens and PIIShift-RAG source checkouts are locally available for evidence verification. DataVeil, Image-to-3D, and the original portfolio are public sources. The exact Local RAG repository remains unverified.

## Architecture decision

Use a Vite-built React client and a small native Node.js server for Replit compatibility, without Vinext, Wrangler, D1, or Cloudflare bindings.

- Frontend: React, TypeScript, Vite, CSS design tokens, accessible client interactions.
- Content: a typed, curated knowledge registry shared by the pages, citations, and ambassador.
- Retrieval: deterministic weighted lexical retrieval over a small approved evidence set.
- Generation: server-side optional OpenAI-compatible call when `OPENAI_API_KEY` is configured; otherwise an explicitly labelled deterministic evidence synthesis.
- Guardrails: request-size limits, schema validation, memory-only rate limiting, prompt-injection detection, privacy-topic refusal, timeout/abort control, citation allow-list validation, and output privacy filtering.
- State: no database, cookies, local/session storage, telemetry, chat logging, or feedback persistence.
- Deployment: Replit-compatible `npm run dev` and `npm run start`, platform port binding, `.replit`, and deployment runbook.

## Milestones

### M1 — Sanitized foundation

- Create the independent Next.js project and clean Git baseline.
- Add source registry, claim-to-source table, privacy policy, architecture, and Replit runbook.
- Migrate only safe visual assets and preserve attribution.

### M2 — Recruiter-first experience

- Implement the selected recruiter-first direction at `/`.
- Implement the portfolio-evolution alternative at `/directions/evolution` for comparison.
- Deliver the hero, three evidence-backed capabilities, ordered project evidence, experience, education, skills, research, and professional contact.

### M3 — Mini Byte AI Ambassador

- Implement retrieval, evidence synthesis, optional server-side model generation, citations, section links, multi-turn memory, reset, loading/error states, and accessible mobile behavior.
- Refuse unsupported, private, and injection-based requests.

### M4 — Evaluation and security

- Add at least 40 normal, unsupported, adversarial, privacy, multi-turn, and infrastructure-failure cases.
- Add unit, integration, API, and browser tests plus secret, privacy, resume-download, and broken-link checks.
- Record measured results only after commands execute successfully.

### M5 — Release preparation

- Generate and visually verify a privacy-safe public resume using verified claims and LinkedIn/GitHub contact only.
- Add CI, changelog, contribution/security docs, Handshake checklist, and v1.0.0 release notes.
- Validate production build and local responsive/accessibility behavior.
- Keep Replit Design comparison, Replit Agent refinement, physical-device checks, friend review, public deployment, signed-out verification, and GitHub achievement awards pending until actually completed.

## Release gates

- No leaked private contact information or credentials.
- All public claims map to the approved source registry.
- Ambassador privacy, refusal, citation, and prompt-injection tests pass.
- Production build, automated tests, browser smoke tests, and public-resume download pass.
- Public Replit URL is live and signed-out tested.
- Manual Handshake checks are completed and recorded truthfully.

