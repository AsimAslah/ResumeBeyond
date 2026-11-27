# “Bring Your Resume to Life” challenge checklist

Status date: 2026-11-28

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
- [ ] Résumé PDF tags and assistive-technology reading order reviewed
- [ ] Friend or recruiter completes a timed 60-second review

## Engineering and security

- [x] 94 ambassador, integration, and security tests pass locally
- [x] TypeScript, lint, privacy scan, dependency audit, and production build pass locally
- [x] Desktop Chromium and mobile Chromium projects
- [x] 14/14 local desktop Chromium and 14/14 mobile Chromium tests pass
- [x] Mobile WebKit project runs in GitHub Actions; local WebKit cannot launch in this Nix environment
- [x] Static traversal, malformed-path, and SPA fallback symlink-escape regression coverage
- [x] Recursive dependency, credential, and privacy scans
- [x] npm-only reproducible deployment with `npm ci`
- [x] GitHub Actions run 46067052971 passed all four jobs on security-hardening commit `46406d0`, including mobile WebKit; browser reports were retained
- [ ] Reviewer confirms the latest PR-head checks are green before approving merge

## Publication and release

- [ ] PR #4 reviewed and approved
- [x] Existing public Replit deployment is active at `https://resume-beyond.replit.app`
- [x] Read-only GET checks pass for both routes, health, sitemap, and résumé PDF
- [ ] Full deployed-origin verifier passes; deferred because it sends Mini Byte POST requests that could invoke a paid provider
- [ ] Signed-out/private-window verification completed
- [x] README updated with the verified public URL and source-commit limitation
- [ ] User approves merge and release
- [ ] v1.0.0 tag and GitHub Release created

## Release blocker rule

ResumeBeyond must not be described as v1.0.0-released while any publication/release item above is open. Automated browser coverage does not replace the physical-device or timed human review.
