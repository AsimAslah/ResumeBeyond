# Security policy

## Supported version

Security fixes target the current release candidate branch and the latest tagged release. No public release is currently tagged.

## Reporting a vulnerability

Use the repository's **Security** tab to submit a private vulnerability report. Do not open a public issue containing credentials, private candidate data, a real secret, or exploitable deployment details.

## Implemented boundaries

- Model calls are server-side; secrets never enter the Vite bundle.
- Conversations stay in request/React memory and are not logged or persisted.
- Inputs are content-type checked, size bounded, schema checked, rate limited, and time limited.
- Recruiter input and retrieved evidence are untrusted data, never instructions.
- Model citations must match the retrieved source allow-list.
- Private output filtering rejects phone/email/contact links, precise-address and identity data, credentials, tokens, and private-key material.
- Static files and the SPA `index.html` fallback are resolved below the build root with separator-aware lexical checks and `realpath` containment, rejecting encoded/backslash traversal, sibling access, non-files, and symbolic-link escapes.
- Malformed or NUL-containing request paths receive a generic 400 response. File streams are opened before a 200 is sent; later read errors close the response without exposing filesystem details.
- The public contact surface is LinkedIn and GitHub only.

## Verification

- `npm run audit:dependencies` recursively audits every retained npm lockfile at high severity.
- `npm run check:privacy` recursively scans repository text for private contact data and common credential formats.
- `npm test` covers guardrails, output validation, HTTP contracts, static-path containment, SPA fallback containment, and malformed paths.
- GitHub Actions runs the dependency audit, full check, and the three browser projects.

The removed `artifacts/mockup-sandbox` had an isolated high-severity Zod advisory. It duplicated the production app and was not a runtime dependency; removing the sandbox and its lockfile removed that dependency tree while preserving both production design routes and written Replit comparison evidence. The retained root dependency audit reports zero vulnerabilities.

The release-candidate worktree was verified with 94 unit/integration/security tests, 14/14 desktop Chromium tests, and 14/14 mobile Chromium tests. Local WebKit cannot launch in the current Nix environment because required native libraries are absent. GitHub Actions run 46067052971 passed all four jobs on security-hardening commit `46406d0`, including mobile WebKit; browser reports were uploaded.

## Known limits

- Rate limiting is process-local and is not a distributed quota across autoscaled instances.
- Pattern-based filtering is defense in depth, not a complete DLP or content-safety system.
- An optional model provider receives the current question and curated public evidence when configured. Operators must review provider retention and data controls before enabling it.
- Live-model behavior is not claimed when no authorized provider configuration is available; deterministic evidence synthesis remains functional.
- The approved original-portfolio source is an external privacy boundary and currently exposes direct contact information outside ResumeBeyond. The application does not ingest, reproduce, or render that information.
- The public deployment was checked with read-only GET requests, but its serving commit is not exposed by deployment metadata. The full deployed verifier was not run because it sends Mini Byte POST requests that could invoke a paid provider.
