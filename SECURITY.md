# Security policy

## Supported version

Security fixes target the current `main` branch and the latest tagged release.

## Reporting a vulnerability

Use the repository's **Security** tab to submit a private vulnerability report. Do not open a public issue containing credentials, private candidate data, prompt-injection payloads that expose a real secret, or exploitable deployment details.

## Security boundaries

- Model calls are server-side; secrets never enter the Vite bundle.
- Conversations stay in request/React memory and are not logged or persisted.
- Inputs are content-type checked, size bounded, schema checked, rate limited, and time limited.
- Retrieved evidence is data, not instructions.
- Model citations must match the retrieved source allow-list.
- Model output containing phone-like or email-like data is rejected.
- The public contact surface is LinkedIn and GitHub only.

## Known limits

- Rate limiting is process-local and is not a distributed quota across autoscaled instances.
- Pattern-based private-output filtering is defense in depth, not a complete DLP system.
- An optional model provider receives the recruiter question and curated evidence when configured. Operators must review the provider's data controls and retention terms.
- No model key is configured by default; the deterministic evidence fallback remains functional.

