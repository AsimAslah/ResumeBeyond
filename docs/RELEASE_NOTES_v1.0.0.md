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

- Static-file and SPA fallback delivery hardened against encoded/backslash traversal, sibling access, and symbolic-link escapes
- Malformed URL and NUL-containing paths return a generic client error; filesystem stream errors do not expose paths
- Private-output filtering extended to contact links, address/identity data, credentials, tokens, and private keys
- Recursive dependency, privacy, and credential scans
- 94 ambassador, integration, and security tests
- 15 Playwright tests in each desktop Chromium, 390 px mobile Chromium, and 390 px mobile WebKit CI project (45 CI executions)
- npm-only reproducible builds using `npm ci`
- Build-stamped source SHA at `/build-info.json` with a GET-only verification command

## Deployment

The application has an existing public deployment at `https://resume-beyond.replit.app` and requires no database or AI key. Replit exposes no commit-SHA environment variable. The current deployment predates `/build-info.json` and cannot identify its source; future builds expose their checked-out Git SHA. These draft notes do not claim that the current PR is deployed.

## Release gates still open

- PR #4 approval and authorized merge
- final PR review and approval after the green Actions run on the current head
- an authorized publish followed by a `/build-info.json` comparison against the intended commit
- full deployed-origin Mini Byte verification after ruling out paid provider calls
- signed-out, physical-mobile, and timed recruiter review
- explicit approval to create the v1.0.0 tag and GitHub Release

These notes must not be published as a release until every gate is complete.
