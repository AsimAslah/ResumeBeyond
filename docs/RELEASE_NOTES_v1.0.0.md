# ResumeBeyond v1.0.0 — draft release notes

Status: **draft only — not published**

ResumeBeyond turns a static résumé into a recruiter-first, evidence-grounded portfolio with Mini Byte, a privacy-aware AI ambassador.

## Highlights

- 60-second recruiter scan for Machine Learning Engineer — LLM Applications & Evaluation roles
- Three evidence-backed capabilities and six relevance-ordered project narratives
- Recruiter-first and premium portfolio-evolution design routes
- Deterministic grounded answers, source citations, section navigation, and multi-turn context
- Optional server-side model synthesis with deterministic fallback
- Privacy-safe public resume and LinkedIn/GitHub contact actions
- Explicit refusal for unsupported, private, and prompt-injection requests

## Security and quality

- Static-file serving hardened against encoded/backslash traversal, sibling access, and symbolic-link escapes
- Private-output filtering extended to contact links, address/identity data, credentials, tokens, and private keys
- Recursive dependency, privacy, and credential scans
- 82 ambassador, integration, and security tests
- Playwright desktop Chromium, 390 px mobile Chromium, and 390 px mobile WebKit CI projects
- npm-only reproducible builds using `npm ci`

## Deployment

The application is prepared for a Node.js 22 Replit deployment and requires no database or AI key. A public URL will be added only after signed-out verification.

## Release gates still open

- PR #4 approval and authorized merge
- green Actions on the release candidate commit
- public Replit deployment and automated deployed-origin verification
- signed-out, physical-mobile, and timed recruiter review
- explicit approval to create the v1.0.0 tag and GitHub Release

These notes must not be published as a release until every gate is complete.
