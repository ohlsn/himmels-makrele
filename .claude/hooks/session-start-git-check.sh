#!/usr/bin/env bash
# SessionStart hook: fetch origin + warn if local is behind/ahead
set -e
cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || cd "$(dirname "$0")/../.."

# Only run if inside a git repo
if ! git rev-parse --git-dir >/dev/null 2>&1; then
  exit 0
fi

# Fetch quietly. Allow up to 5s to avoid hanging on bad networks.
git fetch --quiet 2>/dev/null || true

# Compare local vs upstream
UPSTREAM=$(git rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>/dev/null || echo "")
if [ -z "$UPSTREAM" ]; then
  echo "No upstream tracking branch — skipping drift check."
  exit 0
fi

LOCAL=$(git rev-parse @ 2>/dev/null)
REMOTE=$(git rev-parse @{u} 2>/dev/null)
BASE=$(git merge-base @ @{u} 2>/dev/null)

if [ "$LOCAL" = "$REMOTE" ]; then
  echo "✓ Git in sync with $UPSTREAM"
elif [ "$LOCAL" = "$BASE" ]; then
  AHEAD=$(git rev-list --count HEAD..@{u} 2>/dev/null)
  echo "⚠️  DRIFT: Local is $AHEAD commit(s) BEHIND $UPSTREAM."
  echo "   Run 'git pull --rebase' before making changes, or you'll clobber remote work."
elif [ "$REMOTE" = "$BASE" ]; then
  AHEAD=$(git rev-list --count @{u}..HEAD 2>/dev/null)
  echo "ℹ️  Local is $AHEAD commit(s) ahead of $UPSTREAM (unpushed work)."
else
  AHEAD=$(git rev-list --count @{u}..HEAD 2>/dev/null)
  BEHIND=$(git rev-list --count HEAD..@{u} 2>/dev/null)
  echo "⚠️  DIVERGED: Local has $AHEAD unique commit(s), remote has $BEHIND. Resolve before pushing."
fi
