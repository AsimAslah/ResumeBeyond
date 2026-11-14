# Privacy design

Privacy is a product requirement, not a footer statement.

## Public-data policy

ResumeBeyond publishes LinkedIn, GitHub, approved professional history, education, skills, and repository-backed project evidence. It does not publish phone number, WhatsApp, personal email, residential/precise location, date of birth, identity details, salary expectations, relocation preferences, credentials, or unverified customer/user metrics.

## Migration audit

The original portfolio profile, resume PDF, and DOCX contain a phone number, personal email, precise location, and WhatsApp link. None were copied into the public baseline. The replacement resume was generated from the approved claim registry and rendered for visual review.

## Conversation lifecycle

1. React keeps up to eight bounded messages in memory.
2. The browser sends them to the Node endpoint for the current answer.
3. The server validates and processes them in request memory.
4. No prompt/answer logger, database, cookie, analytics call, local storage write, session storage write, error-reporting payload, or feedback endpoint receives chat content.
5. Closing/resetting the page discards client memory.

The server keeps only an IP-derived rate key and count in process memory for one minute. It does not persist or log the key.

## Optional model provider

When `OPENAI_API_KEY` is configured, the current question and retrieved public evidence are sent server-side to the configured provider. Private-topic and injection classifications are refused before a provider call. Operators must verify provider retention and data-control settings at deployment time; this repository cannot prove the configuration of a future Replit secret or provider account.

## Defense in depth

- 12 KB request-body cap, 1,000 characters per message, 4,000 total characters, eight-message limit
- 12 requests per minute per process-local client key
- privacy, unsupported-claim, and injection classifiers
- eight-second provider timeout
- source-ID allow-list validation
- phone-like and email-like output rejection
- React text escaping
- no user/model HTML rendering
- CSP, frame, MIME, referrer, and browser-permission headers
- repository privacy/secret scan

## Safe contact

LinkedIn is the primary public contact route. GitHub provides a secondary professional route. No direct email or telephone contact is embedded in source, browser bundles, API responses, or the public resume.

