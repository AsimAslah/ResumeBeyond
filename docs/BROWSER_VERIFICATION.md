# Recruiter-first browser verification

## Scope

Preserve the approved recruiter-first homepage, the premium alternative at
`/directions/evolution`, both Design previews, Mini Byte, and the source registry.
No visual redesign, merge, or publication is included.

## Local results

- `npm ci`: successful; root dependency audit reported zero vulnerabilities.
- `npm run check`: passed type checking, source lint, all **56 existing tests**,
  privacy checks, and the production build.
- Desktop Chromium: **10/10 passed**.
- Mobile Chromium at **390 × 844**: **10/10 passed**.
- Mobile WebKit: native dependencies were attempted, including ICU 74 and
  GStreamer. The browser still fails before application assertions because the
  bundled Linux runtime cannot resolve all required system libraries on Replit.
  This is **not** recorded as passing WebKit coverage.

The original six browser tests remain unchanged. Four additional checks cover
the preserved premium route, unsupported-question refusal, private-contact
refusal, and project/evidence/contact/navigation destinations.

The additional checks exposed broken legacy evidence-section anchors on the
approved homepage. IDs were restored on existing elements without changing
layout, content, or styling. The compact mobile header intentionally hides its
optional premium-direction link; the premium route is verified directly.

## GitHub Actions

`.github/workflows/ci.yml` runs `npm run check` and separate browser jobs on
Ubuntu 24.04:

1. `desktop-chromium`
2. `mobile-chromium-390`
3. `mobile-webkit-390`

Each browser job installs its own browser and native dependencies with
`playwright install --with-deps`, builds the application, and runs the complete
suite for that project. Reports and failure traces are retained for seven days.
Fail-fast is disabled so a failed browser cannot hide another browser's result.
Superseded runs are cancelled to avoid unnecessary work.

Mobile Chromium is interim coverage, **not a substitute for WebKit**. Check the
pull request's Actions results for the actual Ubuntu WebKit outcome.

## Security and privacy review

- The existing privacy scanner passed without changing its exclusions.
- A separate token/private-key/credential-URL scan of tracked text and proposed
  files found no credentials. Its two contact-pattern matches were the scanner's
  own detection patterns and browser assertions checking for absent contact
  links, not actual private contact values.
- Source lint passed, including the restrictions on unsafe HTML, exposed model
  keys, and chat persistence.
- The privacy/dataflow scanner returned no findings.
- Dependency scanning identified one **high** finding in the Design sandbox's
  development-only `zod` dependency, version 3.25.76
  (`GHSA-mrhx-c7xc-m3w5`). It is not a production application dependency.
  The scanner recommends 4.6.6, a major-version update; it was not silently
  applied as part of browser verification.
- Static scanning flagged the `createReadStream` call in `server.mjs` as a
  potential path traversal sink. The production caller currently normalizes
  request paths, resolves them under `dist`, and checks containment before
  serving. This automated finding remains documented for security review;
  it is not represented as a clean static scan.

Browser tests verify public contact destinations rather than introducing direct
contact information. They also verify citation visibility, explicit unsupported
and private-information refusals, prompt-injection resistance, keyboard focus,
resume download, responsive overflow, and Mini Byte open/close/reset behavior.

## Release boundary

Keep the pull request unmerged until approved. Public deployment and signed-out
challenge verification remain separate steps; consult `HANDSHAKE_CHECKLIST.md`.
