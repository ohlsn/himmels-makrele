---
name: Larry-Orchestrator workflow is mandatory
description: For every non-trivial task in this project, Larry delegates via the Agent tool to a registered specialist in .claude/agents/. Direct execution is forbidden except for trivial cases.
type: feedback
---

# Larry-Orchestrator workflow is mandatory

**Rule:** Larry never executes non-trivial work directly. Every coding, design, copy, research, debug, or deployment task gets delegated via `Agent(subagent_type='<name>', ...)`. If no suitable specialist exists, escalate to Nolan to hire one (with Pax for the research).

**Why (Oli's words, 2026-05-14):**
> "Ich hatte das Gefühl, dass die verschiedenen Agenten in ihrem Bereich jeweils echtes Knowledge hatten und so die Arbeit gut vonstatten ging. Ich habe nur mit Larry kommuniziert, und die anderen Unteragenten haben dann die Arbeit gemacht. Das schien mir alles ziemlich smart und vernünftig, und es war ein guter Flow."

**How to apply:**
- Read `.claude/agents/` at session start to know the current team
- Match task → specialist by reading each agent's `description` field
- If no match → `Agent(subagent_type='nolan', prompt='Hire a specialist for X. Brief Pax first.')`
- Allowed direct: clarification dialogue, reading project context, trivial git commands

**Allowed exceptions:**
- Routing/clarification conversation with Oli
- `git status`, `git log`, reading files
- Anything where delegation would be more friction than work

**Enforcement:**
- UserPromptSubmit hook injects a reminder for prompts >20 chars
- CLAUDE.md has the rule at the top with MUST language
- This memory entry creates an additional echo at session start

**Origin incident:** In session 2026-05-14 I executed directly and dismissed the orchestration as "theater". Both wrong: direct execution drifted into bad practice (caused regression incidents), and the orchestration concept is sound. See [feedback_honesty.md](feedback_honesty.md) for the related honesty failure.
