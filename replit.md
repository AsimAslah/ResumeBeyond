# ResumeBeyond on Replit

## Run

- Runtime: Node.js 22.13 or newer (Replit uses the Node.js 22 module).
- Install dependencies with `npm ci` when restoring from the lockfile.
- Use the **Start application** workflow or Run button. It executes
  `npm run dev -- --port 5000`.
- The existing Node server binds to `0.0.0.0:5000` and serves both the
  React/Vite development UI and `/api/*` routes. Vite permits Replit's proxy hosts.
- Outside Replit, `npm run dev` continues to default to port 3000.
- The preview currently forwards port 5000 explicitly. If the bare development
  domain returns 502, use the preview's port-5000 URL; the imported port-3000
  mapping can remain attached to the bare domain.

## Configuration

No secrets or external services are required. Mini Byte uses its approved
evidence registry without an API key. Optional server-side AI configuration is
documented in `.env.example`; configure credentials through Replit Secrets,
never in browser-exposed variables. No database is needed.

## Verify

- `npm run check` runs type checking, source lint, ambassador evaluations,
  the privacy scan, and the production build.
- `npm run audit:dependencies` recursively audits retained npm lockfiles for
  high-severity advisories.
- `/api/health` should return `status: "ok"` and `chatStorage: false`.
- Check `/`, `/directions/evolution`, and `/Asim_Aslah_Public_Resume.pdf`.
- `npm run test:e2e` uses the production build on port 3000 and requires
  Playwright browser binaries.

## Publishing

The existing deployment configuration builds and checks the app, then runs
`server.mjs` on the platform-assigned port (3000 by default).
The development preview is not a published site. See
`docs/REPLIT_DEPLOYMENT.md` and `docs/HANDSHAKE_CHECKLIST.md` for the remaining
release checks; do not mark those checks complete without performing them.
After publication, run `npm run verify:deployed -- https://<public-domain>`
from a trusted checkout and repeat the critical flows in a signed-out window.
