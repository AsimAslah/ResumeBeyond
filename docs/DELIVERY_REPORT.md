# Engineering delivery report

Date: 2026-11-15

## Delivered

- Recruiter-first portfolio and preserved premium evolution route
- Six approved-source project narratives and a privacy-safe public resume
- Mini Byte deterministic retrieval, optional provider synthesis, citations, multi-turn context, navigation, reset, and refusals
- Traversal-safe Node static server and security regression suite
- Expanded privacy-output and prompt-injection defenses
- Recursive dependency, credential, and privacy scans
- npm-only reproducible CI/Replit installation
- Desktop Chromium, 390 px mobile Chromium, and 390 px mobile WebKit CI projects
- Deployment verification script and v1.0.0 release-note draft

## Optimization

PR #4 previously carried a generated `artifacts/mockup-sandbox` that duplicated the application, copied public assets, included many unused UI components, and maintained a separate vulnerable dependency tree. It was removed along with the redundant pnpm lockfile. The approved recruiter-first and premium directions remain in production source, and the comparison evidence remains in documentation and Git history.

## Measured local verification

- `npm ci`: passed, 92 packages audited, 0 vulnerabilities
- `npm test`: 82/82 passed
- TypeScript and source lint: passed
- Recursive privacy/credential scan: passed, 0 findings
- Recursive high-severity dependency audit: passed
- Vite production build: passed, 1,585 modules
- Desktop Chromium: 11/11 passed locally
- Mobile Chromium at 390 px: 11/11 passed locally
- Mobile WebKit at 390 px: 11/11 passed in GitHub Actions run 43660156236

## Security before and after

| Finding | Before | After |
| --- | --- | --- |
| Isolated sandbox Zod advisory | High-severity advisory in duplicated non-production lockfile | Duplicated sandbox removed; recursive retained-lockfile audit clean |
| Static file traversal | Containment logic lacked decoded/backslash/symlink regression evidence | Lexical + real-path containment and 10 security tests |
| Output privacy | Primarily phone/email patterns | Contact links, address/identity, credential/token, and private-key patterns |
| Prompt injection | Baseline direct patterns | Expanded override, roleplay, transformation, secret-extraction, and indirect-source cases |
| Package reproducibility | npm and pnpm lockfiles | npm-only, `npm ci` in CI and Replit |

## Release status

Repository engineering and GitHub Actions are ready for PR review. v1.0.0 is not ready to publish until PR approval, public Replit deployment, signed-out verification, physical-device QA, timed recruiter review, and explicit user authorization are complete.
