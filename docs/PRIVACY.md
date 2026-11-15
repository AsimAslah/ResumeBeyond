# Privacy design

Privacy is a product requirement, not a footer statement.

## Public-data policy

ResumeBeyond publishes LinkedIn, GitHub, reviewed professional history, education, skills, and repository-backed project evidence. It excludes phone number, WhatsApp, personal email, residential or precise location, date of birth, identity details, salary expectations, relocation preferences, credentials, and unverified customer or user metrics.

## Migration boundary

The original portfolio and older resume assets expose data on the keep-private list. Those assets were not copied into ResumeBeyond. The generated public resume contains only approved claims and LinkedIn/GitHub contact routes.

One approved source, the original external portfolio repository, currently exposes direct contact information outside this repository. ResumeBeyond uses it only as a public evidence link and does not ingest, display, quote, or return that private-contact content. This is documented as an external privacy boundary in [SOURCE_PRIVACY_REVIEW.md](SOURCE_PRIVACY_REVIEW.md).

## Conversation lifecycle

1. React keeps up to eight bounded messages in memory.
2. The browser sends them to the Node endpoint for the current answer.
3. The server validates and processes them in request memory.
4. No prompt/answer logger, database, cookie, analytics call, browser storage, error-reporting payload, or feedback endpoint receives chat content.
5. Reset, navigation, or closing the page discards client chat memory.

The server retains only an IP-derived rate key and count in process memory for one minute. It does not persist or log the key.

## Optional model provider

When `OPENAI_API_KEY` is configured, the current question and retrieved public evidence are sent server-side to the configured provider. Private-topic and injection classifications are refused before any provider request. Operators must review provider retention, training, geographic, and account data-control settings before enabling a key. No live-provider claim is made without that authorization and review.

## Defense in depth

- 12 KB request body, 1,000 characters per message, 4,000 total characters, eight-message limit
- 12 requests per minute per process-local client key
- privacy, unsupported-claim, and injection classifiers
- eight-second provider timeout
- source-ID allow-list validation
- output rejection for contact links, phone/email data, addresses, identity data, credentials, tokens, and private keys
- React text escaping and no model HTML rendering
- CSP, frame, MIME, referrer, and browser-permission headers
- recursive credential/privacy scan
- adversarial regression tests

## Safe contact

LinkedIn is the primary public contact route. GitHub is the secondary professional route. No direct email, telephone, WhatsApp, or precise-location contact is embedded in the source, browser bundles, API responses, or public resume.
