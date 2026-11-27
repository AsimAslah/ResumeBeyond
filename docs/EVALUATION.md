# Evaluation report

Date executed: 2026-11-28

## Automated evaluation

Command: `npm test`

Local result: **94 passed, 0 failed**.

The suite verifies evidence retrieval, allow-listed citations, exact unsupported and privacy refusals, adversarial instruction handling, private-output rejection, provider-failure fallback, multi-turn topic retention, section navigation, health/no-storage behavior, request validation, malformed URL handling, lexical and real-path containment, symlink-safe static and SPA fallback delivery, valid PDF responses, and HTTP contracts. Provider behavior is mocked; no live-model evaluation is claimed.

## Local engineering checks

| Check | Command | Result |
| --- | --- | --- |
| Clean dependency install | `npm ci` | Passed; 92 packages audited, 0 vulnerabilities |
| TypeScript | `npm run typecheck` | Passed |
| Source lint | `npm run lint` | Passed |
| Privacy/credential scan | `npm run check:privacy` | Passed, 0 findings |
| Recursive dependency audit | `npm run audit:dependencies` | Passed; one retained lockfile, 0 vulnerabilities |
| Production bundle | `npm run build` | Passed; 1,585 modules, 38.94 kB CSS, 265.94 kB JS |

## Browser coverage

The Playwright suite contains 14 tests per project and covers:

- recruiter-first 60-second scan and premium route preservation;
- grounded citations and all section destinations;
- exact unsupported, private-contact, and injection refusals;
- chat reset, close, keyboard focus, and mobile dialog bounds;
- resume download, LinkedIn/GitHub contact navigation, responsive overflow, and requests without console or network errors.

Projects are desktop Chromium, mobile Chromium at 390 × 844, and mobile WebKit at 390 × 844. The latest local desktop Chromium and mobile Chromium runs passed **14/14 each**. Local WebKit could not launch because this Nix environment lacks Playwright's required native libraries (including libxml2, libgbm, and libharfbuzz-icu); the browser failed before application assertions. Do not count that as an application failure or a WebKit pass.

GitHub Actions runs the dependency audit and full check, then runs each browser project separately and retains reports for seven days. The successful run on commit `4264113` predates the SPA fallback hardening and does not verify it. Use the latest PR check run on the exact head SHA for this revision; the current check suite must pass before merge.

## Deterministic versus live-model behavior

Without `OPENAI_API_KEY`, Mini Byte performs deterministic lexical retrieval and evidence synthesis. This path is fully exercised and is the guaranteed no-secret fallback. With an authorized key, the server can request strict JSON synthesis from an OpenAI-compatible provider; output still must pass citation and privacy validation or the deterministic response replaces it.

No authorized provider configuration was used for this evaluation, so live-model quality, latency, retention, and account data controls remain unverified.

## Deployment verification and limitations

The existing public deployment is `https://resume-beyond.replit.app` and Replit reports an active deployment with a successful build. Read-only GET checks on 2026-11-28 returned HTTP 200 for `/`, `/directions/evolution`, `/api/health`, `/sitemap.xml`, and `/Asim_Aslah_Public_Resume.pdf`; the PDF was 77,613 bytes with a valid `%PDF-` signature. Deployment metadata does not expose the serving source SHA, so these checks do not prove that the current PR code is deployed.

The résumé PDF is one page and its text is extractable (3,550 extracted characters). PDF metadata reports that it is not tagged, so semantic structure and screen-reader reading order are not established. No résumé content was changed.

The full `npm run verify:deployed` script was not run: it sends two Mini Byte POST requests, and the deployed server could use a paid model provider. Local tests and CI cover Mini Byte fallback conversations, citations, and refusals without a live provider call. External link checks and provider retention controls remain unverified.

- Signed-out visual review and physical-device QA remain manual.
- Process-local rate limits do not coordinate across autoscaled instances.
