# Initial repository and migration inspection

Original inspection date: 2026-11-14

Current-status correction: 2026-11-15

## Destination

- Repository: `AsimAslah/ResumeBeyond`
- Visibility: public
- Default branch configured on GitHub: `main`
- Initial state: empty repository; local checkout had no commits and no remote.

## Original portfolio

- Repository: `AsimAslah/asim-portfolio`
- Stack: Next.js 16, React 19, TypeScript, Vinext, Tailwind, Cloudflare Workers, D1, Drizzle.
- Reusable: Mini Byte identity, theme language, responsive presentation patterns, verified project screenshots, and project narrative structure.
- Not reusable as-is: Wrangler/Vinext Cloudflare runtime, D1 feedback, production database identifiers, analytics configuration, direct personal contact links, existing resume files, and deployment identity.

## Privacy findings

- The profile data and résumé include a telephone number, personal email, precise location, and WhatsApp deep link.
- Both public resume filenames resolve to the same one-page document and expose the same private contact details.
- The DOCX metadata/content also includes those details.
- Decision: exclude every original resume file and all direct phone/email/WhatsApp data from the sanitized baseline.

## Compatibility findings

- Cloudflare D1 and Worker bindings do not map directly to the target Replit runtime.
- The rating/feedback feature is nonessential to the recruiter journey and introduces cookies, IP-derived rate keys, persistent storage, and a separate database dependency. It will be removed.
- The final migration uses a Vite-built React client and a native Node.js server; no Next.js runtime is present in ResumeBeyond.

## Evidence status

- Verified locally: EvalLens; PIIShift-RAG.
- Verified public repository identity: DataVeil; Image-to-3D; AI Quality Lab; original portfolio.
- No exact Local RAG repository was verified, so it remains excluded rather than guessed. Public Replit deployment evidence remains pending.

