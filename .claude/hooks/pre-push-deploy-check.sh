#!/usr/bin/env bash
# PreToolUse hook for `git push` and `vercel deploy` — block if drift detected.
# Reads tool_input from stdin (JSON). If the command contains push/deploy keywords,
# fetch and warn before allowing.

set -e
cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || cd "$(dirname "$0")/../.."

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | grep -oE '"command"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 || echo "")

# Only act on push or vercel deploy commands
if ! echo "$COMMAND" | grep -qE 'git[[:space:]]+push|vercel[[:space:]]+deploy'; then
  exit 0
fi

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  exit 0
fi

git fetch --quiet 2>/dev/null || true

UPSTREAM=$(git rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>/dev/null || echo "")
if [ -z "$UPSTREAM" ]; then
  exit 0
fi

LOCAL=$(git rev-parse @ 2>/dev/null)
REMOTE=$(git rev-parse @{u} 2>/dev/null)
BASE=$(git merge-base @ @{u} 2>/dev/null)

if [ "$LOCAL" != "$REMOTE" ] && [ "$LOCAL" = "$BASE" ]; then
  BEHIND=$(git rev-list --count HEAD..@{u} 2>/dev/null)
  echo "⛔ BLOCKED: Local is $BEHIND commit(s) BEHIND $UPSTREAM. Pull/rebase before push or deploy."
  echo "   This prevents overwriting remote work or deploying regressed code."
  exit 2
fi

if [ "$LOCAL" != "$REMOTE" ] && [ "$REMOTE" != "$BASE" ] && [ "$LOCAL" != "$BASE" ]; then
  echo "⛔ BLOCKED: Local has diverged from $UPSTREAM. Resolve before push or deploy."
  exit 2
fi

exit 0
