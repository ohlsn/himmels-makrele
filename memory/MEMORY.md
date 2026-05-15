# Project Memory Index

This file indexes all persistent context for this project. Read it at the start of every session.

Entries are one-line summaries linking to dedicated files. Keep this file short — under 200 lines — and put detail in the linked files.

## How to use

- **At session start:** read this file + every linked entry that looks relevant to the current task.
- **After any significant decision:** add a new entry below, AND create a dedicated file under `memory/` with full context (what was decided, why, what was rejected, date).
- **At session end (when user says "let's stop here" or equivalent):** write a session summary to `memory/sessions/session_YYYY-MM-DD.md` and link it under "Sessions" below.

Memory types (use as filename prefixes for consistency):
- `user_*.md` — facts about the user, their role, preferences, expertise
- `feedback_*.md` — corrections or guidance the user has given, with the reason
- `project_*.md` — project context, goals, in-flight initiatives, status
- `reference_*.md` — pointers to external systems (URLs, dashboards, repos, accounts)
- `decision_*.md` — significant decisions with rationale and rejected alternatives
- `sessions/session_YYYY-MM-DD.md` — end-of-session summaries

## User

<!-- e.g. - [Role and background](user_role.md) — one-line hook -->

## Feedback

## Project

- [Current status](project_current_status.md) — Stripe + Printful Architektur, Mockup-Inbox, Pricing ohne Versand, naechste Checks

## Reference

<!-- e.g. - [Hosting](reference_hosting.md) — Netlify + GitHub deploy workflow -->

## Decisions

## Sessions

- [2026-05-14](sessions/session_2026-05-14.md) — Stripe Tax (Test+Live), Pricing-Architektur (pricing.ts), Live-Schaltung auf himmels-makrele.com; nächste Session: echter Test-Kauf
- [2026-05-15](sessions/session_2026-05-15.md) — Webhook-Idempotenz/ENV-Härtung, UI-Cleanup, sizeFamily-Auto-Detection aus Printful Catalog Title (Wolf/Hoodies sind Youth, nicht Adult); nächste Session: Live-Test-Kauf + Reflexionsgespräch zu Bug-Origins
