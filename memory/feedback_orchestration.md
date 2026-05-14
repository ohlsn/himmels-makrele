---
name: Orchestrator + Specialists workflow is mandatory
description: For every non-trivial task, the main-thread Claude (the Orchestrator) delegates via the Agent tool — to a built-in agent or a registered custom specialist in .claude/agents/. Direct execution is forbidden except for trivial cases.
type: feedback
---

# Orchestrator + Specialists workflow is mandatory

**Rule:** The Orchestrator (main-thread Claude) never executes non-trivial work directly. Every coding, design, copy, research, debug, or deployment task gets delegated via `Agent(subagent_type='<name>', ...)`. Delegation order:

1. **Built-in agent** when fit: `Explore`, `Plan`, `general-purpose`, `code-simplifier`, plugin-specific.
2. **Custom specialist** when domain/voice/persona matters — project-local `.claude/agents/` beats user-level.
3. **`nolan`** to hire a new specialist if neither fits (briefs `pax` for research, writes the new profile).

**Allowed direct:** clarification with Oli, reading context, trivial git, adapting orchestrator infrastructure.

**Single source of truth:** `~/.claude/CLAUDE.md` (auto-loaded). Don't duplicate the rule across project files.
