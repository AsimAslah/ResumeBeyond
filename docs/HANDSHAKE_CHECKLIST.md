# “Bring Your Resume to Life” challenge checklist

Status date: 2026-11-15

## Candidate story and evidence

- [x] One specific target role: Machine Learning Engineer — LLM Applications & Evaluation
- [x] Three memorable capabilities with clickable evidence
- [x] Projects ordered by relevance with problem, contribution, approach, outcome, status, and links
- [x] Academic research, prototypes, released work, and professional experience are distinguished
- [x] Approved-source registry and claim-to-source mapping
- [x] Privacy-safe resume downloads successfully in automated browser coverage
- [x] LinkedIn primary contact and GitHub secondary contact

## Ambassador

- [x] Mini Byte is clearly identified as an AI ambassador
- [x] Four recruiter starter questions
- [x] Grounded citations and in-page section links
- [x] Multi-turn context, reset, loading/error states, and mobile controls
- [x] Exact unsupported response
- [x] Prompt-injection refusal and untrusted-context boundary
- [x] Private information refusal and output filtering
- [x] Deterministic evidence fallback works without a model key
- [ ] Live-model behavior and provider data controls reviewed if a key is enabled
- [x] No chat persistence or prompt/response logging

## Design and accessibility

- [x] Two complete design directions compared
- [x] Recruiter-first direction selected
- [x] Premium direction and Replit comparison evidence preserved
- [x] Desktop and 390 px responsive automated coverage
- [x] Visible focus styles, skip link, and keyboard path
- [ ] Physical mobile device tested
- [ ] Friend or recruiter completes a timed 60-second review

## Engineering and security

- [x] 82 ambassador, integration, and security tests pass locally
- [x] TypeScript, lint, privacy scan, dependency audit, and production build pass locally
- [x] Desktop Chromium and mobile Chromium projects
- [x] Mobile WebKit project runs in GitHub Actions
- [x] Static traversal and symlink-escape regression coverage
- [x] Recursive dependency, credential, and privacy scans
- [x] npm-only reproducible deployment with `npm ci`
- [ ] Current pushed commit passes every GitHub Actions job

## Publication and release

- [ ] PR #4 reviewed and approved
- [ ] Public Replit deployment published
- [ ] Deployment verifier passes against the public URL
- [ ] Signed-out/private-window verification completed
- [ ] Repository homepage/README updated with the verified URL
- [ ] User approves merge and release
- [ ] v1.0.0 tag and GitHub Release created

## Release blocker rule

ResumeBeyond must not be described as v1.0.0-released while any publication/release item above is open. Automated browser coverage does not replace the physical-device or timed human review.
