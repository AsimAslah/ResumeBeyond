# Approved-source privacy review

Review date: 2026-11-15

## Result

The ResumeBeyond source registry contains public professional repositories, a release page, a project case study, and a GitHub profile. The bounded claims used by the application are professional and appropriate for publication.

One approved link—the original portfolio repository—exposes direct contact information that is on ResumeBeyond's keep-private list. That content exists outside this repository. ResumeBeyond does not ingest it into the knowledge base, copy it into the public resume, include it in model context, or return it from Mini Byte.

## Controls

- Evidence records contain curated statements/excerpts rather than fetched page bodies.
- External pages are never treated as instructions.
- Private-topic questions are refused before optional provider calls.
- Model output is filtered for direct contact, address/identity, and credential patterns.
- Source links identify their external destination; ownership and privacy of the destination remain outside the ResumeBeyond runtime boundary.

## Recommended manual action

The owner may sanitize the original portfolio's public contact surface independently. That change is outside ResumeBeyond and is not required to keep private data out of this application's source, bundle, API, or resume. The external link should be re-reviewed after any upstream change.
