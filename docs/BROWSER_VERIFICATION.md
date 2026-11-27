# Recruiter-first browser verification

## Scope

The suite preserves the selected recruiter-first homepage, the premium route at `/directions/evolution`, Mini Byte, the source registry, and existing visual behavior. It does not redesign or publish the application.

## Projects and coverage

`playwright.config.ts` defines 15 tests for each project:

1. desktop Chromium
2. mobile Chromium at 390 × 844
3. mobile WebKit at 390 × 844

Flows cover the recruiter scan, premium route, grounded citations, all five section destinations on both routes, exact unsupported/private/injection refusals, reset/close/focus behavior, resume download, contact destinations, viewport overflow, and build-commit identification.

## Local results

- `npm run check`: passed with 94 unit/integration/security tests and a production build.
- The previous PR head passed 14/14 desktop Chromium and 14/14 mobile Chromium tests locally on 2026-11-28.
- The current workspace cannot launch Chromium because `libgbm.so.1` is missing; this is an environment limitation before application assertions. Final 15-test browser projects run in GitHub Actions, which installs the browser dependencies.

GitHub Actions runs separate desktop Chromium, mobile Chromium, and mobile WebKit jobs, retains each report, and checks the exact PR head. Use the latest run shown on PR #4 before approval; each project now has 15 tests.

## CI behavior

GitHub Actions performs `npm ci`, the recursive high-severity dependency audit, and `npm run check`, then runs the full browser suite in separate Ubuntu jobs. Each browser is installed with its native dependencies, reports/traces are retained for seven days, and fail-fast is disabled.

## Deployment boundary

The existing public origin is `https://resume-beyond.replit.app`. Signed-out screenshots and read-only GET checks confirmed both routes and the résumé download. Twelve unique external links were found in the production bundles; 11 returned HTTP 200 to HEAD requests. LinkedIn returned 405 to HEAD and 999 to automated GET, so that contact destination remains inconclusive under automation. Replit deployment metadata does not expose the serving source SHA. The current deployment returns HTML rather than JSON at `/build-info.json`, because it predates build identity stamping; the next authorized build will provide the SHA, verifiable with `npm run verify:deployed-version -- https://resume-beyond.replit.app <full-commit-sha>`. The full `npm run verify:deployed` script was not run because it sends two Mini Byte POST requests that could incur a paid provider call. Mobile visual review of the live deployment and interactive signed-out review remain manual.
