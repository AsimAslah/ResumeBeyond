# Recruiter-first browser verification

## Scope

Preserve the approved recruiter-first homepage, the premium alternative at
`/directions/evolution`, both Design previews, Mini Byte, and the source registry.
No visual redesign, merge, or publication is included.

## Local results

- `npm ci`: successful; root dependency audit reported zero vulnerabilities.
- `npm run check`: passed type checking, source lint, all **56 existing tests**
  plus five new section-destination cases, privacy checks, and the production
  build (**61 total**).
- Desktop Chromium: **11/11 passed**.
- Mobile Chromium at **390 × 844**: **11/11 passed**.
- Mobile WebKit: **1/11 passed locally** (the PDF request-only check). The ten UI
  cases were attempted but cannot launch because required native libraries are
  missing. Replit's package index also rejected the `opus` and `harfbuzz-icu`
  packages needed by the bundled WebKit runtime. This is **not** recorded as
  passing WebKit coverage.

The original six browser tests remain unchanged. Five additional checks cover
the preserved premium route, unsupported-question refusal, private-contact
refusal, all Mini Byte section destinations on both design routes, and
project/evidence/contact navigation.

The additional checks exposed missing section anchors. IDs were restored on
existing elements in both directions without changing layout, content, or
styling. The premium direction links experience evidence to its Image-to-3D
work card. The compact mobile header intentionally hides its optional
premium-direction link; the premium route is verified directly.

The section-link UI test uses controlled `/api/ambassador` responses to cover
all five destinations on both routes without exhausting the app's request
rate-limit during a browser run. Separate evaluation tests exercise the real
evidence-to-section mapping.

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

GitHub Actions run
[43641272387](https://github.com/AsimAslah/ResumeBeyond/actions/runs/43641272387)
passed on the feature branch: 61 regression tests and 11/11 tests in each of
the desktop Chromium, 390 px mobile Chromium, and 390 px mobile WebKit jobs.

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
