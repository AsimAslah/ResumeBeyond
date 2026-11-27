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

The Playwright suite contains 15 tests per project and covers:

- recruiter-first 60-second scan and premium route preservation;
- grounded citations and all section destinations;
- exact unsupported, private-contact, and injection refusals;
- chat reset, close, keyboard focus, and mobile dialog bounds;
- resume download, LinkedIn/GitHub contact navigation, responsive overflow, build-commit identity, and requests without console or network errors.

Projects are desktop Chromium, mobile Chromium at 390 × 844, and mobile WebKit at 390 × 844. Before the build-identity test was added, local desktop Chromium and mobile Chromium passed **14/14 each**. Current local Chromium cannot launch because `libgbm.so.1` is missing; it fails before application assertions. Do not count that as an application failure or a current WebKit pass.

GitHub Actions separates the verify/audit/check job from desktop Chromium, mobile Chromium, and mobile WebKit. The latest exact PR-head run is the required verification for the current 15-test projects; all three report artifacts are retained. Do not rely on a previous SHA's results for a later change.

## Deterministic versus live-model behavior

Without `OPENAI_API_KEY`, Mini Byte performs deterministic lexical retrieval and evidence synthesis. This path is fully exercised and is the guaranteed no-secret fallback. With an authorized key, the server can request strict JSON synthesis from an OpenAI-compatible provider; output still must pass citation and privacy validation or the deterministic response replaces it.

No authorized provider configuration was used for this evaluation, so live-model quality, latency, retention, and account data controls remain unverified.

## Deployment verification and limitations

The existing public deployment is `https://resume-beyond.replit.app` and Replit reports an active deployment with a successful build. Signed-out screenshots and read-only GET checks on 2026-11-28 confirmed both design routes, health, sitemap, and the PDF. The current deployment returns HTML rather than JSON at `/build-info.json`, so it cannot identify its serving source commit. New builds stamp their checked-out Git SHA at `/build-info.json`; the GET-only `verify:deployed-version` command compares it with an expected SHA after an authorized publish.

The résumé PDF is one page, visually intact, and text-extractable (4,437 extracted bytes across 62 lines). PDF metadata reports no tags; the file has no `/Lang` entry or structure tree. Its multi-column reading order is therefore not guaranteed for screen readers. The generator uses ReportLab, which is not installed in this environment, and its current script does not produce tagged structure. Rebuilding with a different PDF engine could change the visual layout or wording, so the PDF was left unchanged and remains an accessibility gate.

The full `npm run verify:deployed` script was not run: it sends two Mini Byte POST requests, and the deployed server could use a paid model provider. The source-version verifier performs only a GET. Local tests and CI cover Mini Byte fallback conversations, citations, and refusals without a live provider call. Eleven of twelve unique external URLs extracted from the production bundles returned 200 to HEAD; LinkedIn blocks automated checking (405 to HEAD, 999 to GET), so its target needs a manual browser check. Provider retention controls remain unverified.

- Signed-out visual review and physical-device QA remain manual.
- Process-local rate limits do not coordinate across autoscaled instances.
