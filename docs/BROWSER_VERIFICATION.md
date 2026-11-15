# Recruiter-first browser verification

## Scope

The suite preserves the selected recruiter-first homepage, the premium route at `/directions/evolution`, Mini Byte, the source registry, and existing visual behavior. It does not redesign or publish the application.

## Projects and coverage

`playwright.config.ts` defines 11 tests for each project:

1. desktop Chromium
2. mobile Chromium at 390 × 844
3. mobile WebKit at 390 × 844

Flows cover the recruiter scan, premium route, grounded citations, all five section destinations on both routes, exact unsupported/private/injection refusals, reset/close/focus behavior, resume download, contact destinations, and viewport overflow.

## Local results

- `npm run check`: passed with 82 unit/integration/security tests and a production build.
- Desktop Chromium: **11/11 passed locally** on 2026-11-15.
- Mobile Chromium 390: **11/11 passed locally** on 2026-11-15.
- Mobile WebKit is not claimed locally; verification is delegated to the Ubuntu GitHub Actions job with Playwright-managed native dependencies.

GitHub Actions run [43660156236](https://github.com/AsimAslah/ResumeBeyond/actions/runs/43660156236) passed on commit `070c668`: **11/11** in desktop Chromium, **11/11** in mobile Chromium, and **11/11** in mobile WebKit. The verify job also passed the recursive dependency audit and complete repository check.

## CI behavior

GitHub Actions performs `npm ci`, the recursive high-severity dependency audit, and `npm run check`, then runs the full browser suite in separate Ubuntu jobs. Each browser is installed with its native dependencies, reports/traces are retained for seven days, and fail-fast is disabled.

## Deployment boundary

No public origin exists. The repository includes `npm run verify:deployed -- <https-url>` for post-publication health, page, PDF, sitemap, ambassador, and external-link checks. It has not been run and must not be represented as passed until the exact public Replit URL is available.
