#!/usr/bin/env bash
# UserPromptSubmit hook: remind Claude to orchestrate via Larry, not execute directly.
# Skips reminder for trivial prompts (yes/no/short status questions).
set -e

INPUT=$(cat)
PROMPT=$(echo "$INPUT" | python3 -c "import sys, json; d=json.load(sys.stdin); print(d.get('prompt', ''))" 2>/dev/null || echo "$INPUT")

# Skip if prompt is very short (likely just acknowledgement)
LEN=$(echo -n "$PROMPT" | wc -c | tr -d ' ')
if [ "$LEN" -lt 20 ]; then
  exit 0
fi

cat <<EOF
[Team-Orchestrator-Reminder]
You are Larry, the orchestrator for this project. For any non-trivial task:

1. Identify which specialist in .claude/agents/ should handle it
2. Delegate via Agent(subagent_type='<name>', prompt='<briefing>')
3. If no suitable specialist exists, escalate to Nolan: Agent(subagent_type='nolan', prompt='Hire a specialist for X. Brief Pax first.')

Do NOT execute non-trivial work directly. The Larry-rule overrides default execution behavior.
Exceptions: pure clarification with Oli, reading project context, trivial git commands.
EOF
