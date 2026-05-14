---
name: Larry-Orchestrator-Setup (Plan)
description: Maßnahmen, damit die Larry/Team-Orchestrator-Regel aus CLAUDE.md in zukünftigen Sessions tatsächlich greift — als Template für alle Vibe-Coding-Projekte
type: decision
---

# Larry-Orchestrator-Setup

**Beschluss:** Die Larry-Regel (Larry = nur Orchestrator, delegiert an Specialists) wurde bisher in Sessions ignoriert. Wir wollen sie technisch und prompt-seitig so verankern, dass sie ab nächster Session zuverlässig greift. Dieselbe Lösung soll als Template für alle Vibe-Coding-Projekte dienen.

**Datum:** 2026-05-14
**Status:** beschlossen, Implementierung steht noch aus (kommt nach Repricing-Task)

---

## Warum es bisher nicht griff (Diagnose)

1. CLAUDE.md-Identity-Sektion liest sich als Roleplay-Flavor, nicht als technischer Zwang
2. `.claude/team/*.md` sind reine Markdown-Personas, technisch nicht als Subagenten aufrufbar (Claude Code erkennt nur `.claude/agents/*.md` mit YAML-Frontmatter als `subagent_type`)
3. Vercel-Skill-Injections und System-Reminders bei jedem Tool-Call überlagern die ruhige Persona-Regel
4. Session-Ende-Speicherung wird vergessen, weil kein Trigger erkennt "okay, wir hören auf"
5. MEMORY.md aktuell nur Template ohne Inhalt → kein Echo-Effekt in laufender Session

---

## Maßnahmen (A + B + C + D)

### A. Echte Subagenten in `.claude/agents/`
- Migration: `.claude/team/*.md` → `.claude/agents/*.md` mit YAML-Frontmatter (`name`, `description`, `tools`)
- Dann existiert "Larry" / "Nolan" / "Pax" als echter `subagent_type`, aufrufbar im Agent-Tool
- Nicht mehr nur Roleplay, sondern echte delegierbare Entität

### B. Hook für Session-Routing
- `.claude/hooks/route_via_larry.sh` (UserPromptSubmit Hook)
- Vor jedem User-Prompt: System-Reminder injecten "Du bist Larry. Delegiere an Specialists."
- Hooks wirken (Skill-Injections funktionieren ja über denselben Mechanismus)

### C. CLAUDE.md restrukturieren
- Team-Regel **an den Anfang**, vor Architektur
- "MUST" / "IMPORTANT" Sprache statt erzählend
- Konkretes Beispiel: "Beim ersten Schritt jedes nicht-trivialen Tasks: Agent-Tool mit subagent_type=larry aufrufen"
- Session-Ende-Trigger explizit machen: Wenn Nutzer "gute nacht", "bis morgen", "wir hören auf", "das war's für heute" o.ä. sagt → AUTOMATISCH `memory/sessions/session_YYYY-MM-DD.md` schreiben

### D. Memory mit echtem Inhalt füllen
- Mindestens 2–3 Feedback-Memorys in MEMORY.md, damit die in laufender Session als Echo wirken
- Diese decision-Datei selbst zählt als erstes Beispiel

### E. Git-Sync-Check beim Session-Start + vor Deploys

**Problem:** Heute (2026-05-14) habe ich am Session-Start nur `git log` und `git status` geprüft, aber kein `git fetch`. Lokale Historie sah vertraut aus, also nahm ich an: synchron. Tatsächlich war origin 5 Commits voraus (mit `/danke`, Live-Shipping-Rates, Address-Modal). Beim ersten Production-Deploy habe ich diese 5 Commits versehentlich überschrieben → Live-Regression auf himmels-makrele.com.

**Maßnahme:**
- **SessionStart-Hook** (`.claude/hooks/git-sync-check.sh`): bei Sessionstart automatisch `git fetch` + `git status -sb` ausführen. Wenn lokaler Branch behind/ahead von origin: als System-Reminder injecten "⚠️ Drift erkannt — vor Code-Änderungen klären".
- **PreToolUse-Hook für `vercel deploy` und `git push`**: bevor diese Befehle laufen, erneuter `git fetch` + Drift-Check. Bei behind-Status: Hook blockiert oder warnt mit explizitem System-Reminder.
- **CLAUDE.md-Klausel** (zusätzlich zum Hook, als Backup): "Beim Session-Start IMMER `git fetch && git status` ausführen. Bei Drift stoppen und User informieren."

**Warum nicht nur CLAUDE.md-Regel:** Wie bei Larry — weiche Regeln werden im Aktionsmodus überlagert. Hooks sind die einzige zuverlässige Methode.

---

## Wenn umgesetzt → Übertragung in Template

- Alle fünf Maßnahmen (A–E) unter `_template/` (Pfad: `/Users/oli/Documents/Vibe-Coding projects/_template/`) replizieren
- Damit jedes neue Vibe-Coding-Projekt mit Larry-Setup + Git-Sync-Schutz startet
- Hook-Skripte parametrieren so, dass sie projektneutral funktionieren

---

## Aktueller Stand der Session-Routine (Soll-Ist)

| Soll laut CLAUDE.md | Ist (Stand 2026-05-14) |
|---|---|
| MEMORY.md beim Start lesen | ✅ tu ich |
| Larry-Modus (orchestrieren, nicht ausführen) | ❌ ignoriert |
| Session-Ende-Memo schreiben | ❌ wurde vergessen |
| Decisions als `memory/decision_*.md` ablegen | ⚠️ jetzt erstmals umgesetzt (diese Datei) |

---

## Rejected Alternative

**"Larry-Regel komplett rauswerfen, weil zu fragil"** — verworfen, weil der User explizit das Orchestrator-Modell will. Statt es zu kippen, machen wir's technisch belastbar.
