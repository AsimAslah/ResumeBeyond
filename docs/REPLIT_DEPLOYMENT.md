# Replit deployment guide

Deployment status: **prepared, not published**.

## Synchronize the branch

In the Replit Shell, use the existing repository import or clone, then run:

```bash
git fetch origin
git switch feat/recruiter-first-browser-verification
git pull --ff-only origin feat/recruiter-first-browser-verification
npm ci
npm run check
npm run audit:dependencies
```

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

## Publish and verify manually

1. Create a Replit Deployment from the repository branch.
2. Set the build command to `npm ci && npm run audit:dependencies && npm run check` and run command to `npm start` if Replit does not read `.replit` automatically.
3. Publish and copy the exact HTTPS public URL.
4. Set `PUBLIC_SITE_URL` to that URL and redeploy if required.
5. From a trusted local checkout, run:

```bash
npm ci
npm run verify:deployed -- https://<verified-public-domain>
```

6. Open the URL in a signed-out/private window and verify Mini Byte, citations, resume download, contact links, both directions, and 390 px layout.
7. Record the tested URL and results in the Handshake checklist before tagging.

The deployment verifier checks the home and premium routes, health/no-storage contract, PDF response/signature, canonical sitemap origin, supported answer citations, unsupported refusal, and approved external links. It cannot verify provider-account retention settings or replace physical-device review.

## Design evidence

The Replit comparison selected the recruiter-first direction while preserving the premium direction. The bulky generated sandbox was removed because it duplicated production code and dependencies; routes and written evidence remain in [REPLIT_DESIGN_EVIDENCE.md](REPLIT_DESIGN_EVIDENCE.md).

## Release boundary

Do not merge PR #4, create the v1.0.0 tag, or publish a GitHub Release until the user approves and every required manual gate is complete.
