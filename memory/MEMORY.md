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

<!-- e.g. - [No fabrication](feedback_no_fabrication.md) — Never invent facts; say "I don't know" instead -->

## Project

<!-- e.g. - [Current status](project_status.md) — what's in flight, blockers, deadlines -->

## Reference

<!-- e.g. - [Hosting](reference_hosting.md) — Netlify + GitHub deploy workflow -->

## Decisions

- [Larry-Orchestrator-Setup](decision_larry_orchestration.md) — Plan zur technischen Verankerung der Team-Regel + Git-Sync-Check beim Session-Start (Subagents, Hooks, CLAUDE.md-Restruktur); umzusetzen sobald himmels-makrele live ist

## Sessions

- [2026-05-14](sessions/session_2026-05-14.md) — Stripe Tax (Test+Live), Pricing-Architektur (pricing.ts), Live-Schaltung auf himmels-makrele.com; nächste Session: echter Test-Kauf
