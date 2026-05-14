---
name: Always git fetch before touching code
description: At session start and before any push/deploy, run git fetch + check status. Never assume local is in sync just because last commit looks familiar.
type: feedback
---

# Always git fetch before touching code

**Rule:** At every session start AND before every `git push` or `vercel deploy`, run `git fetch` and check status against origin. If behind/diverged → stop, inform Oli, do not modify or deploy until resolved.

**Why (origin incident 2026-05-14):**
At session start I checked `git log --oneline` and saw a familiar commit on top, assumed we were synced. Actually origin had 5 unpulled commits with critical features (`/danke` page, live shipping rates, address modal). I then deployed local code to production, **regressing the live site** for several minutes until I noticed and rebased.

**How to apply:**
- SessionStart hook (`.claude/hooks/session-start-git-check.sh`) does the fetch automatically — read its output
- PreToolUse hook (`.claude/hooks/pre-push-deploy-check.sh`) blocks `git push` and `vercel deploy` if behind
- Both hooks together = belt + suspenders. If hooks fail (CI, different machine), fall back to manually running `git fetch && git status -sb` at session start

**Signal phrases to NOT skip the check:**
- "lass uns weitermachen" / "let's continue" — could be from a different machine since last session
- "schnell noch X deployen" — fastest way to regress production
- A familiar-looking last commit — origin may have moved without local seeing it

**The cost of skipping:** today, several minutes of regressed production site, a panicked debugging session, and a hard conversation about trust.
