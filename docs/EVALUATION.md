# Evaluation report

Date executed: 2026-11-15

## Automated evaluation

Command: `npm test`

Local result: **82 passed, 0 failed**.

| Category | Cases | Result |
| --- | ---: | --- |
| Normal grounded questions | 16 | Passed |
| Unsupported claims | 8 | Passed |
| Privacy-sensitive questions | 8 | Passed |
| Prompt injection | 14 | Passed |
| Retrieval and multi-turn context | 4 | Passed |
| Section navigation | 5 | Passed |
| Model validation and infrastructure failure | 11 | Passed |
| Static-path security | 10 | Passed |
| HTTP API integration | 6 | Passed |

The suite verifies expected evidence retrieval, allow-listed citations, the exact unsupported response, private-topic refusal, adversarial instruction handling, private-output rejection, model failure fallback, multi-turn topic retention, section mapping, health/no-storage behavior, request validation, and path containment. Provider behavior is mocked; no live-model evaluation is claimed.

## Local engineering checks

| Check | Command | Result |
| --- | --- | --- |
| Clean dependency install | `npm ci` | Passed; 92 packages audited, 0 vulnerabilities |
| TypeScript | `npm run typecheck` | Passed |
| Source lint | `npm run lint` | Passed |
| Privacy/credential scan | `npm run check:privacy` | Passed, 0 findings |
| Recursive dependency audit | `npm run audit:dependencies` | Passed, retained lockfiles free of high-severity findings |
| Production bundle | `npm run build` | Passed; 1,585 modules, 38.94 kB CSS, 265.94 kB JS |

## Browser coverage

The Playwright suite contains 11 tests per project and covers:

- recruiter-first 60-second scan and premium route preservation;
- grounded citations and all section destinations;
- exact unsupported, private-contact, and injection refusals;
- chat reset, close, keyboard focus, and mobile dialog bounds;
- resume download, LinkedIn/GitHub contact navigation, and responsive overflow.

Projects are desktop Chromium, mobile Chromium at 390 × 844, and mobile WebKit at 390 × 844. Local results and GitHub Actions evidence are maintained in [BROWSER_VERIFICATION.md](BROWSER_VERIFICATION.md). WebKit is considered verified only by the Linux GitHub Actions job; no unsupported local WebKit claim is made.

GitHub Actions run 43660156236 passed the verify job and all three browser jobs on the hardened commit, including 11/11 mobile WebKit tests.

## Deterministic versus live-model behavior

Without `OPENAI_API_KEY`, Mini Byte performs deterministic lexical retrieval and evidence synthesis. This path is fully exercised and is the guaranteed no-secret fallback. With an authorized key, the server can request strict JSON synthesis from an OpenAI-compatible provider; output still must pass citation and privacy validation or the deterministic response replaces it.

No authorized provider configuration was used for this evaluation, so live-model quality, latency, retention, and account data controls remain unverified.

## Deployment limitations

- No public Replit URL exists, so `npm run verify:deployed -- <url>` has not been run.
- Signed-out production behavior, public link navigation, and platform secret configuration remain manual deployment checks.
- Process-local rate limits do not coordinate across autoscaled instances.
