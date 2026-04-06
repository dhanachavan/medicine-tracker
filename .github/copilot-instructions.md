# Medicine Tracker — Repository Instructions

## Project Overview

Medicine Tracker is [brief description of the application — e.g., a web application for tracking medication schedules and adherence]. Update this section with the project's technology stack, frameworks, and runtime versions so that Copilot can work efficiently without repeated exploration.

<!-- TODO: Add build, test, lint, and run commands here. Example:
- install:  npm install
- build:    npm run build
- test:     npm test
- lint:     npm run lint
-->

---

## External Contribution Workflow — Delegation Rules

This project uses a strict, multi-stage process for all issues involving **external contributors** (anyone outside the core maintainer team). The process exists to enforce security, maintain an audit trail, and ensure contributors receive correctly scoped access.

### Rules for the Default Agent

> **These rules are mandatory and must never be overridden.**

1. The default agent **must not** create branches, grant repository access, or perform any setup for external contributors.
2. The default agent **must immediately delegate** to `step1-Contribution Branch Preparer` whenever an issue matches **any** of the following triggers:
   - The issue text contains "external contributor", "contribution setup", or "onboarding contributor".
   - The issue requests branch creation for a contributor.
   - The issue requests temporary access for a contributor.
3. The default agent **must never** attempt to resolve, close, or partially handle an external-contribution issue on its own.
4. **If uncertain** whether an issue falls under this workflow, the default agent **must** err on the side of delegation to `step1-Contribution Branch Preparer` or flag the issue for a human maintainer — never proceed autonomously.

### Multi-Stage Agent Roles

External contributions are processed sequentially through three specialised agents. Each agent is responsible for exactly one stage:

| Stage | Agent Identifier | Responsibility | Trigger |
|-------|-----------------|----------------|---------|
| 1 | `step1-Contribution Branch Preparer` | Creates a dedicated branch and grants the external contributor temporary, scoped access. | Delegated by the default agent when an external-contribution issue is detected (see rules above). |
| 2 | `step2-Contribution PR Validator` | Reviews and validates pull requests submitted by the external contributor against project standards. | Activated when a pull request is opened on a branch created by Step 1. |
| 3 | `step3-Contribution Access Cleaner` | Revokes the contributor's temporary access and cleans up the contribution branch after the PR is merged or closed. | Activated when the contribution PR is merged, closed, or abandoned. |

### Prohibited Actions (All Agents)

- No agent may **skip a stage** or combine responsibilities from multiple stages.
- No agent may **grant persistent write access** to an external contributor; all access must be temporary and scoped to the contribution branch.
- No agent may **merge a contribution PR** without Step 2 validation completing successfully.

### Escalation

If any agent encounters an error or an issue that does not fit the workflow above, it **must** stop processing and notify a human maintainer rather than attempting a workaround.

---

## Coding Conventions

<!-- TODO: Add project-specific coding conventions, linting rules, and style preferences here so Copilot can follow them in all interactions. -->