# Replit deployment guide

Deployment status: **public deployment active** at `https://resume-beyond.replit.app` as of 2026-11-28. Replit deployment metadata does not expose the serving source SHA. A future build will expose its checked-out SHA at `/build-info.json`; the current public deployment predates that file. No deployment setting or production build was changed during this review.

## Synchronize the branch

Use a separate worktree for release verification so the preserved local-only branch and its `.replit` configuration remain untouched:

```bash
git fetch origin
git worktree add --detach ../resumebeyond-release-verification origin/feat/recruiter-first-browser-verification
cd ../resumebeyond-release-verification
npm ci
npm run check
npm run audit:dependencies
```

Do not pull into the original divergent local branch; it contains local-only configuration commits. The separate worktree follows the current PR head without replacing the original working tree's local configuration.

Do not import the original portfolio's D1 database, Worker configuration, analytics token, feedback records, environment files, or legacy resume assets. Use Node.js 22.13 or newer and npm 10 or newer; npm is the only supported package manager.

## Build and run

The checked-in `.replit` configuration uses:

```text
build: npm ci && npm run audit:dependencies && npm run check
run:   node server.mjs --port ${PORT:-3000}
```

The server binds `0.0.0.0` and reads `PORT`.

## Source version marker

Every production build writes `dist/build-info.json` with the full Git SHA used to build it. Replit does not provide a commit-SHA environment variable; the build uses `GITHUB_SHA` in GitHub Actions and otherwise reads `git rev-parse HEAD`. The normal `.replit` build command runs `npm run check`, which runs this build step.

After a future publish, compare the public marker with the exact source commit intended for that publish:

```bash
npm run verify:deployed-version -- https://resume-beyond.replit.app <full-40-character-commit-sha>
```

This verifier performs one GET request and makes no Mini Byte calls. Before the next authorized publish, `/build-info.json` on the current live deployment returns the SPA HTML, not commit JSON; do not treat that as a verified version.

## Optional secrets

The app is functional without an AI key. To enable optional model synthesis, add values only through Replit Secrets after reviewing provider data controls:

```text
OPENAI_API_KEY=<server-side secret>
OPENAI_MODEL=gpt-5-mini
OPENAI_BASE_URL=https://api.openai.com/v1
PUBLIC_SITE_URL=https://<verified-public-domain>
```

Never create `VITE_OPENAI_API_KEY`; Vite-prefixed values can enter the browser bundle.

## Deployment verification

Read-only GET checks on 2026-11-28 returned HTTP 200 for `/`, `/directions/evolution`, `/api/health`, `/sitemap.xml`, and `/Asim_Aslah_Public_Resume.pdf`. The PDF was 77,613 bytes and began with `%PDF-`. These checks do not prove the current PR source is deployed.

The complete `npm run verify:deployed` script was not run because it sends two Mini Byte POST requests and the deployed instance could use a paid provider. Mini Byte conversations, citation validation, unsupported/privacy refusals, and fallback behavior are covered by local tests and CI without a paid provider call.

## Merge and post-merge verification

Do not merge automatically. After human review of the current exact PR head and green checks, use:

```bash
gh pr checks 4 --watch
gh pr view 4 --json state,mergeable,headRefOid
gh pr merge 4 --squash
```

Only run the merge command after the user explicitly approves and the PR is still open, mergeable, and at the reviewed head. This repository permits squash merging; the command does not delete the source branch.

After merge, verify the default branch in a separate worktree so the preserved divergent local branch and `.replit` remain untouched:

```bash
git fetch origin
git worktree add --detach ../resumebeyond-postmerge-check origin/main
cd ../resumebeyond-postmerge-check
npm ci
npm run audit:dependencies
npm run check
gh run list --branch main --limit 5
```

Confirm the post-merge workflow run for the new `main` commit is green before release preparation.

## Publish and verify after explicit approval

1. Do not publish from the preserved divergent workspace branch. Use a fresh Replit checkout synced to the reviewed `main` commit; do not overwrite this workspace's `.replit` or local-only commits.
2. Confirm the exact source SHA and that `npm ci`, `npm run audit:dependencies`, and `npm run check` pass in that checkout.
3. Publish only after explicit user approval; retain the existing URL unless the user requests a domain change.
4. Confirm `PUBLIC_SITE_URL` matches the verified URL if it is configured.
5. From the trusted checkout, verify the runtime marker:

```bash
npm run verify:deployed-version -- https://resume-beyond.replit.app <published-source-sha>
```

6. Run only read-only GET checks before any Mini Byte interaction:

```bash
ORIGIN=https://resume-beyond.replit.app
for path in / /directions/evolution /api/health /sitemap.xml /Asim_Aslah_Public_Resume.pdf; do
  curl -sS -o /dev/null -w "$path %{http_code} %{content_type}\n" "$ORIGIN$path"
done
```

Run the full verifier only if Mini Byte provider use is confirmed cost-free.
7. Open the URL in a signed-out/private window and verify the résumé download, contact links, both directions, and 390 px layout.
8. Record the URL, marker SHA, and owner acceptance results in the Handshake checklist before tagging.

## Rollback

Replit does not roll a published deployment back directly. If a published release must be reverted, first identify the known-good checkpoint or commit in the Replit History/Git pane, review its diff and the affected workspace state, then restore that checkpoint and republish only after explicit approval. Restoring a checkpoint changes project files; do not do it automatically. See [Replit checkpoints and rollbacks](https://docs.replit.com/features/version-control/checkpoints-and-rollbacks).

## Manual owner acceptance

Do not check these on the owner's behalf:

- Test both design routes in a signed-out/private window.
- Check on physical Android and iPhone devices where available.
- Interact with Mini Byte only in a confirmed no-provider fallback build; do not risk a paid production request.
- Review PDF download, document language, tags, and screen-reader order; the current public PDF is untagged.
- Ask a recruiter or friend for a timed 60-second scan and record their feedback.

The existing full verifier continues to check core routes, PDF, health, sitemap, Mini Byte citations/refusal, and external links. It sends two Mini Byte POSTs, so do not run it until paid-provider use is ruled out.

## Design evidence

The Replit comparison selected the recruiter-first direction while preserving the premium direction. The bulky generated sandbox was removed because it duplicated production code and dependencies; routes and written evidence remain in [REPLIT_DESIGN_EVIDENCE.md](REPLIT_DESIGN_EVIDENCE.md).

## Release boundary

Do not merge PR #4, create the v1.0.0 tag, or publish a GitHub Release until the user approves and every required manual gate is complete.
