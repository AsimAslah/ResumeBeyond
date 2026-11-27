# Changelog

All notable changes to ResumeBeyond are documented here. The project follows semantic versioning.

## [Unreleased]

### Added

- Recruiter-first and premium portfolio-evolution visual directions
- Evidence-backed role match, projects, background, skills, source registry, and privacy-safe contact flow
- Mini Byte with multi-turn context, deterministic retrieval, citations, optional model synthesis, and exact refusal behavior
- Static-file traversal regression coverage for plain, encoded, backslash, sibling-directory, malformed-encoding, null-byte, and symbolic-link escape attempts
- SPA fallback now applies the same lexical and real-path containment checks as static assets, including protection against an escaping `index.html` symlink
- Malformed and NUL-containing request paths return a generic 400 response; file-open failures no longer become unhandled stream errors
- Regression coverage preserves valid SPA routes and rejects a symlinked fallback outside the distribution root
- Expanded prompt-injection and private-output adversarial cases
- Recursive package-lock dependency audit and credential/privacy scan
- Build-stamped Git source identity at `/build-info.json` plus a GET-only deployment-version verifier
- Public deployment verification script and read-only origin checks; live Mini Byte checks require confirming no paid provider call can occur
- CI browser projects for desktop Chromium, 390 px mobile Chromium, and 390 px mobile WebKit

### Changed

- Static delivery now enforces lexical containment and resolved real-path containment before opening a file
- Replit and CI install from the canonical npm lockfile with `npm ci`
- Privacy output filtering covers contact links, address/identity data, tokens, credentials, and private-key material
- Evaluation suite expanded from 82 to 94 tests; each browser project now covers 15 tests
- Source-version verification and release documentation refreshed for the current release candidate
- Final security and release-readiness verification refreshed on 2026-11-28

### Removed

- Duplicated Replit Design sandbox containing a second application, copied assets, and an isolated vulnerable dependency tree
- Redundant pnpm lockfile; npm is the sole package manager
- Cloudflare Worker/Vinext runtime coupling, D1 feedback persistence, analytics, original private-contact data, and original resume files from the migration

## [1.0.0] - Pending

Release only after PR #4 is reviewed and approved, a public Replit deployment passes signed-out verification, required manual Handshake checks are recorded, and release approval is given. No v1.0.0 tag or GitHub Release exists yet.
