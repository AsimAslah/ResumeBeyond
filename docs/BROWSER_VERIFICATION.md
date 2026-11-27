# Recruiter-first browser verification

## Scope

The suite preserves the selected recruiter-first homepage, the premium route at `/directions/evolution`, Mini Byte, the source registry, and existing visual behavior. It does not redesign or publish the application.

## Projects and coverage

`playwright.config.ts` defines 14 tests for each project:

1. desktop Chromium
2. mobile Chromium at 390 × 844
3. mobile WebKit at 390 × 844

Flows cover the recruiter scan, premium route, grounded citations, all five section destinations on both routes, exact unsupported/private/injection refusals, reset/close/focus behavior, resume download, contact destinations, and viewport overflow.

## Local results

- `npm run check`: passed with 94 unit/integration/security tests and a production build.
- Desktop Chromium: **14/14 passed locally** on 2026-11-28.
- Mobile Chromium 390: **14/14 passed locally** on 2026-11-28.
- Mobile WebKit could not launch locally because required native libraries are missing in this Nix environment. This is an environment limitation, not an application assertion failure.

The successful Actions run on commit `4264113` predates the SPA fallback hardening and does not verify the current changes. Before merging, use the latest GitHub Actions run attached to PR #4's exact head SHA; the verify job must pass the recursive dependency audit and full repository check, and all three browser jobs must pass.

## CI behavior

GitHub Actions performs `npm ci`, the recursive high-severity dependency audit, and `npm run check`, then runs the full browser suite in separate Ubuntu jobs. Each browser is installed with its native dependencies, reports/traces are retained for seven days, and fail-fast is disabled.

## Deployment boundary

The existing public origin is `https://resume-beyond.replit.app`. Read-only GET requests to both design routes, health, sitemap, and the résumé PDF returned 200 on 2026-11-28. Deployment metadata does not expose the serving source SHA, so this does not prove the PR code is deployed. The full `npm run verify:deployed` script was intentionally not run because it sends two Mini Byte POST requests that could incur a paid provider call. Local tests cover Mini Byte conversations, citations, and privacy refusals without a live provider.
