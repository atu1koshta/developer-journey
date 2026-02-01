# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

A statically-generated portfolio site built with Next.js 16 (App Router) showcasing professional contributions. The Next.js app lives in `portfolio/`. Content is authored in YAML/JSON and consumed at build time — no backend, no API calls, no database.

## Commands

All commands run from `portfolio/`:

```bash
npm run dev      # Dev server at localhost:3000
npm run build    # Static export to out/
npm run lint     # ESLint (Next.js core-web-vitals + TypeScript)
```

## Architecture

**`/contributions.yaml`** (repo root) is the single source of truth for skills, experience timeline, and contributions. Any change to this file should be reflected across the entire portfolio app.

Most data is auto-derived from the YAML at build time (contribution lists, tech tags, category filters, stat counts). The following are **hardcoded and must be updated manually** when the YAML changes:

- **`portfolio/src/lib/constants.ts`** — `CATEGORY_COLORS`, `CATEGORY_VALUE_WEIGHT`: a new contribution category in the YAML will render without color or sort weight unless added here. `SKILL_CATEGORY_LABELS`: a new skill category needs a display label.
- **`portfolio/src/lib/data.ts`** — `getKeyProjects()`: fully hardcoded project list, not derived from YAML. `getStats()`: "Systems Built" and "Dashboard Speedup" are hardcoded numbers.

After any YAML change, run `npm run build` from `portfolio/` to verify the site builds correctly.

Additional data sources read at build time:
- **`portfolio/src/data/profile.json`** — name, title, contact links
- **`portfolio/src/data/education.json`** — education credentials

`portfolio/src/lib/data.ts` has all data-fetching functions. `page.tsx` calls these at build time and passes data as props.

Components are feature-based under `portfolio/src/app/components/` (e.g., `hero/`, `contributions/`, `timeline/`). Server components are the default; client components (`"use client"`) handle interactivity (animations, filtering, theme toggle).

Key files:
- `portfolio/src/lib/types.ts` — TypeScript interfaces
- `portfolio/src/lib/constants.ts` — category labels, colors, sort weights
- `portfolio/src/app/globals.css` — Tailwind 4 theme variables (light/dark mode)
- `portfolio/next.config.ts` — `output: "export"` for static site generation

## Contribution Update Workflow

The user will say something like "update contributions" and provide one of the following input forms:

### Input Forms

1. **Direct description** — The user describes the work in plain text. Use this description directly to evaluate and author the entry.
2. **JIRA ticket** — The user provides a ticket key (e.g., `PROJ-123`). Fetch the ticket details using `mcp__jira__jira_get_issue`. Also check for a parent ticket (`parent` field) and fetch it for broader context. Review what the user has done across the ticket and its parent to understand the full scope.
3. **JIRA epic** — The user provides an epic key. Fetch the epic, then search for its child issues (`jql: "parent = EPIC-123"`) to understand the full body of work completed.

### Process

1. **Gather context** — Based on the input form above, collect enough detail to understand what was built and why it matters. If anything is ambiguous — the scope of work, which company/period it belongs to, what the user's specific contribution was vs. team work, or where it should go in the YAML — **ask the user to clarify before proceeding**. Never assume or fill in gaps with vague statements. Only move forward with a clear understanding of the work unit and its placement.
2. **Check for existing section** — Before adding anything, scan `/contributions.yaml` for a pre-existing section under the same company, period, and category that covers related work. If one exists, **append** the new bullet(s) to that section rather than creating a duplicate.
3. **Evaluate** — Read `/contribution-criteria.md` and assess whether the work qualifies. Apply the rules strictly. If it doesn't meet the bar, tell the user why and do not add it.
4. **Confirm with user** — Present the exact YAML content you plan to add or append (formatted as a code block) and wait for explicit user approval before making any changes. Do not proceed until the user confirms.
5. **Add entry** — Only after user confirmation, add to `/contributions.yaml` under the correct company, period, and category (or append to the existing section found in step 2). Follow the language and framing rules in `/contribution-criteria.md`.
6. **Update the app** — Check if the entry introduces a new category or skill category and update the hardcoded maps in `constants.ts` and `data.ts` as described in the Architecture section. Run `npm run build` from `portfolio/` to verify.
