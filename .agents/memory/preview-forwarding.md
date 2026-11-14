---
name: Imported preview forwarding
description: Replit can retain imported port mappings when workflow configuration changes.
---

Verify preview forwarding using the running workflow's actual forwarded port.
Do not assume the bare development domain reaches the current web workflow.

**Why:** During import setup, validated configuration replacement and a workflow
restart did not remove the original forwarding entries. The bare domain returned
502 while the explicit port-5000 URL, app screenshots, health endpoint, and chat
all worked. Repeating restarts did not address the mapping.

**How to apply:** When the server is healthy and screenshots render but the bare
domain fails, compare forwarded-port URLs before changing application code.
