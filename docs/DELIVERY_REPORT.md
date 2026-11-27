# Engineering delivery report

Date: 2026-11-28

## Delivered

- Recruiter-first portfolio and preserved premium evolution route
- Six approved-source project narratives and a privacy-safe public resume
- Mini Byte deterministic retrieval, optional provider synthesis, citations, multi-turn context, navigation, reset, and refusals
- Traversal-safe Node static server and security regression suite, including the SPA fallback
- Expanded privacy-output and prompt-injection defenses
- Recursive dependency, credential, and privacy scans
- npm-only reproducible CI/Replit installation
- Desktop Chromium, 390 px mobile Chromium, and 390 px mobile WebKit CI projects
- Deployment verification script and v1.0.0 release-note draft

## Optimization

PR #4 previously carried a generated `artifacts/mockup-sandbox` that duplicated the application, copied public assets, included many unused UI components, and maintained a separate vulnerable dependency tree. It was removed along with the redundant pnpm lockfile. The approved recruiter-first and premium directions remain in production source, and the comparison evidence remains in documentation and Git history.

## Measured local verification

- `npm ci`: passed, 92 packages audited, 0 vulnerabilities
- `npm test`: 94/94 passed
- TypeScript and source lint: passed
- Recursive privacy/credential scan: passed, 0 findings
- Recursive dependency audit: passed, 1 retained lockfile, 0 vulnerabilities
- Vite production build: passed, 1,585 modules
- Previous PR head: 14/14 desktop Chromium and 14/14 mobile Chromium tests passed locally on 2026-11-28
- Current local browser launch: blocked before assertions because `libgbm.so.1` is missing from this Nix environment
- Current branch: 15 browser tests per project (45 executions total); the final exact-head GitHub Actions run is authoritative and retains all three reports

## Security before and after

| Finding | Before | After |
| --- | --- | --- |
| Isolated sandbox Zod advisory | High-severity advisory in duplicated non-production lockfile | Duplicated sandbox removed; recursive retained-lockfile audit clean |
| Static file and SPA fallback traversal | Assets had containment checks, but the `index.html` fallback bypassed them | Shared lexical + real-path containment; tests cover traversal, malformed paths, and escaping fallback symlinks |
| Output privacy | Primarily phone/email patterns | Contact links, address/identity, credential/token, and private-key patterns |
| Prompt injection | Baseline direct patterns | Expanded override, roleplay, transformation, secret-extraction, and indirect-source cases |
| Package reproducibility | npm and pnpm lockfiles | npm-only, `npm ci` in CI and Replit |

## Release status

The existing public deployment at `https://resume-beyond.replit.app` returned 200 for both routes, health, sitemap, and the PDF on 2026-11-28. Signed-out desktop screenshots showed both design directions. Of 12 unique external URLs found in the production bundles, 11 returned HTTP 200 to HEAD requests; LinkedIn returned 405 to HEAD and 999 to automated GET, so it still needs a manual browser check. The current deployment returns the SPA HTML at `/build-info.json`, so it cannot identify its source commit; new builds stamp the commit and expose it through a GET-only verifier, but the live site has not been republished. The one-page PDF is text-extractable, but it has no document-language entry or structure tree and is reported as untagged. Its multi-column reading order is not guaranteed for assistive technology. The exact visual/content-preserving tagged-PDF rebuild was not feasible with the available generator environment, so the PDF was left unchanged. The full deployment verifier was skipped because its Mini Byte POST requests could invoke a paid provider. v1.0.0 remains blocked on signed-out interaction, physical-device QA, PDF accessibility, timed recruiter review, and explicit authorization.
