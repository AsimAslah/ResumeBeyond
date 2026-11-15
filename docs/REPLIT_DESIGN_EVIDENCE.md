# Replit design comparison evidence

Date reviewed: 2026-11-15

## Preserved directions

- Recruiter-first visual resume: `/` and `components/recruiter-portfolio.tsx`
- Premium portfolio evolution: `/directions/evolution` and `components/evolution-portfolio.tsx`

Both are built from the production knowledge base and share Mini Byte. Browser checks exercise both routes and every ambassador section destination.

## Decision

The Replit comparison selected the recruiter-first direction because the target role, three capabilities, and claim-to-evidence links are visible fastest. The premium direction was preserved as an intentionally complete alternative rather than discarded or folded into a redesign.

## Artifact cleanup

The branch originally included `artifacts/mockup-sandbox`, a generated standalone copy of the app with duplicated images, UI components, source, resume, and a separate package tree. Its useful output had already been integrated into production. Keeping it inflated PR #4 and introduced an isolated vulnerable dependency without adding release functionality.

The sandbox was removed. Evidence remains in:

- both production routes and source components;
- the PR commit history and review diff;
- [DESIGN_DIRECTIONS.md](DESIGN_DIRECTIONS.md);
- browser verification covering both directions.

This cleanup preserves the approved design decision while ensuring there is one production implementation and one dependency graph.
