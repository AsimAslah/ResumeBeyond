# Evaluation report

Date executed: 2026-11-14

## Automated ambassador suite

Command: `npm test`

Result: **56 passed, 0 failed**.

| Category | Cases | Result |
| --- | ---: | --- |
| Normal grounded questions | 16 | Passed |
| Unsupported claims | 8 | Passed |
| Privacy-sensitive questions | 8 | Passed |
| Prompt injection | 8 | Passed |
| Retrieval and multi-turn context | 4 | Passed |
| Model validation and infrastructure failure | 6 | Passed |
| HTTP API integration | 6 | Passed |

The suite includes every mandatory salary, relocation, enterprise-client, experience-length, phone, home-address, private-contact, and Handshake injection prompt from the project brief.

## What the suite measures

- expected evidence retrieval;
- public citation allow-list membership;
- exact unsupported-response behavior;
- privacy and injection classification;
- private-output rejection;
- invented-citation rejection;
- provider error, malformed output, and thrown-request fallback;
- multi-turn topic retention;
- health/no-storage contract;
- JSON/content-type/message-size validation;
- API-level injection refusal.

Model-provider cases are mocked. No live-model evaluation was claimed or billed.

## Other automated checks

| Check | Command | Measured result |
| --- | --- | --- |
| TypeScript | `npm run typecheck` | Passed |
| Privacy/secret scan | `npm run check:privacy` | Passed, 0 findings |
| Production bundle | `npm run build` | Passed; 1,584 modules transformed |
| Home response | local HTTP check | 200 |
| Health response | local HTTP check | 200; `chatStorage: false` |
| Public resume | PDF render/metadata review | One page, no form/JS/encryption, visually passed |

## Browser QA

Browser-controlled local production checks completed:

- 1440 x 900 desktop composition reviewed;
- 390 x 844 mobile composition reviewed;
- no horizontal overflow at either checked layout;
- Mini Byte launcher reduced to 56 x 56 px on mobile after an overlap was discovered;
- mobile dialog measured within the viewport;
- grounded answer displayed approved source links;
- mandatory injection refusal displayed in the browser;
- reset/close behavior checked;
- no browser console errors observed during the tested flows.

## Authored but not executed here

The Playwright specification covers the 60-second scan, Mini Byte citations/reset, mandatory injection, mobile overflow/dialog close, keyboard focus, and resume download on desktop Chromium and a 390 px mobile project. The package registry did not provide the Playwright test package to this workspace, so the authored Playwright suite remains a CI/manual-environment check; equivalent core flows were completed through the visible local browser.

## Known limitations

- Process-local rate limits are not global across Replit autoscale instances.
- Lexical retrieval is intentionally simple and optimized for the small curated registry.
- Live-provider quality, latency, retention, and data-control settings require deployment-time verification.
- Signed-out public deployment tests have not run because no Replit URL exists yet.

