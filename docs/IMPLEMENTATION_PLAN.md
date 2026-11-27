# ResumeBeyond implementation plan

Last updated: 2026-11-28

## Guardrails

- Keep `AsimAslah/ResumeBeyond` independent from the original portfolio's runtime, database, analytics, feedback data, environment files, and private contact data.
- Publish only claims tied to the approved source registry.
- Return “I don't have verified information about that.” for unsupported questions.
- Keep recruiter conversations in request and React memory only.
- Preserve both approved design directions and Mini Byte; avoid redesign during hardening.

## Architecture decision

Use a Vite-built React 19 client and native Node.js server, with npm as the single package manager. The application needs no database, Cloudflare binding, or model key. Deterministic lexical retrieval is the reliable baseline; optional provider synthesis is server-side and must pass citation/privacy validation.

## Milestone status

### M1 — Sanitized foundation: complete

- Independent Vite/React/Node application and clean source registry
- Private legacy contact/runtime data excluded
- Architecture, privacy, source, security, and Replit runbooks

### M2 — Recruiter-first experience: complete

- Recruiter-first homepage and premium evolution route
- Three memorable capabilities and six evidence-backed projects
- Experience, education, skills, research, public resume, and professional contact actions
- Replit Design comparison evidence preserved in documentation and production routes

### M3 — Mini Byte ambassador: complete for deterministic mode

- Retrieval, cited synthesis, optional provider path, section links, multi-turn context, reset, loading/error states, and mobile behavior
- Exact unsupported, private-topic, and prompt-injection refusals
- Live-provider quality remains conditional on an authorized provider configuration

### M4 — Evaluation and security: complete for repository scope

- 94 unit/integration/security cases
- Desktop Chromium and 390 px mobile browser projects, including WebKit in GitHub Actions
- 14 browser tests per project; local Chromium checks pass and WebKit is covered by CI
- Recursive dependency, privacy, and credential scans
- Traversal-safe static serving and SPA fallback, malformed-path, and adversarial output/injection coverage

### M5 — Release preparation: engineering complete; external gates pending

- CI, changelog, release-note draft, deployment guide, Handshake checklist, and deployment verifier are present
- An existing public deployment is active; the serving commit is not exposed and no deployment changes are part of this task
- Signed-out verification, physical-device QA, timed recruiter review, PR approval, and release authorization remain external/manual

## Release gates

- [x] No private contact information or credentials in the repository or generated resume
- [x] Public claims map to approved evidence
- [x] Grounding, citation, refusal, privacy, prompt-injection, and traversal tests pass locally
- [x] TypeScript, lint, dependency audit, privacy scan, and production build pass locally
- [x] GitHub Actions run 46067052971 passed all four jobs on security-hardening commit `46406d0`, including mobile WebKit
- [ ] Reviewer confirms the latest PR-head checks are green before approving merge
- [ ] PR #4 receives human review/approval
- [x] Existing public URL passes read-only route, health, sitemap, and PDF checks
- [ ] Full deployed verifier is run only after ruling out paid model-provider calls
- [ ] Physical-device and timed recruiter checks are recorded
- [ ] User approves merge and v1.0.0 publication
