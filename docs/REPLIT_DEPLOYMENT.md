# Replit deployment guide

Deployment status: **public deployment active** at `https://resume-beyond.replit.app` as of 2026-11-28. Replit reports a successful current deployment build, but its metadata does not expose the serving source SHA. No deployment setting or production build was changed during this hardening.

## Synchronize the branch

Use the clean release-candidate branch and keep the preserved local-only branch separate. In the current workspace:

```bash
git fetch origin
git switch codex/release-readiness-security
git status --short --branch
npm ci
npm run check
npm run audit:dependencies
```

Do not pull into the original divergent local branch; it contains local-only configuration commits.

Do not import the original portfolio's D1 database, Worker configuration, analytics token, feedback records, environment files, or legacy resume assets. Use Node.js 22.13 or newer and npm 10 or newer; npm is the only supported package manager.

## Build and run

The checked-in `.replit` configuration uses:

```text
build: npm ci && npm run audit:dependencies && npm run check
run:   node server.mjs --port ${PORT:-3000}
```

The server binds `0.0.0.0` and reads `PORT`.

## Optional secrets

The app is functional without an AI key. To enable optional model synthesis, add values only through Replit Secrets after reviewing provider data controls:

```text
OPENAI_API_KEY=<server-side secret>
OPENAI_MODEL=gpt-5-mini
OPENAI_BASE_URL=https://api.openai.com/v1
PUBLIC_SITE_URL=https://<verified-public-domain>
```

Never create `VITE_OPENAI_API_KEY`; Vite-prefixed values can enter the browser bundle.

## Deployment verification

Read-only GET checks on 2026-11-28 returned HTTP 200 for `/`, `/directions/evolution`, `/api/health`, `/sitemap.xml`, and `/Asim_Aslah_Public_Resume.pdf`. The PDF was 77,613 bytes and began with `%PDF-`. These checks do not prove the current PR source is deployed.

The complete `npm run verify:deployed` script was not run because it sends two Mini Byte POST requests and the deployed instance could use a paid provider. Mini Byte conversations, citation validation, unsupported/privacy refusals, and fallback behavior are covered by local tests and CI without a paid provider call.

## Publish and verify after explicit approval

1. Confirm the intended branch and exact source commit before publishing.
2. Set the build command to `npm ci && npm run audit:dependencies && npm run check` and run command to `npm start` if Replit does not read `.replit` automatically.
3. Publish only after explicit user approval; retain the existing URL unless the user requests a domain change.
4. Confirm `PUBLIC_SITE_URL` matches the verified URL if it is configured.
5. From a trusted local checkout, run:

```bash
npm ci
npm run verify:deployed -- https://<verified-public-domain>
```

6. Only run the deployed Mini Byte verifier after confirming no paid provider call can occur. Otherwise verify the ambassador locally and keep deployed API behavior unclaimed.
7. Open the URL in a signed-out/private window and verify the résumé download, contact links, both directions, and 390 px layout.
8. Record the tested URL and results in the Handshake checklist before tagging.

The deployment verifier checks the home and premium routes, health/no-storage contract, PDF response/signature, canonical sitemap origin, supported answer citations, unsupported refusal, and approved external links. It cannot verify provider-account retention settings or replace physical-device review.

## Design evidence

The Replit comparison selected the recruiter-first direction while preserving the premium direction. The bulky generated sandbox was removed because it duplicated production code and dependencies; routes and written evidence remain in [REPLIT_DESIGN_EVIDENCE.md](REPLIT_DESIGN_EVIDENCE.md).

## Release boundary

Do not merge PR #4, create the v1.0.0 tag, or publish a GitHub Release until the user approves and every required manual gate is complete.
