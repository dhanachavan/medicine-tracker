# Agent Definitions

This file defines specialized agents for handling external contributions to the Medicine Tracker project.

## External Contribution Workflow

This project uses a strict, multi-stage process for all issues involving **external contributors** (anyone outside the core maintainer team). The process enforces security, maintains an audit trail, and ensures contributors receive correctly scoped access.

### Default Agent Delegation Rules

> **These rules are mandatory and must never be overridden.**

1. The default agent **must not** create branches, grant repository access, or perform any setup for external contributors.
2. The default agent **must immediately delegate** to `step1-Contribution Branch Preparer` whenever an issue matches **any** of these triggers:
   - Issue text contains "external contributor", "contribution setup", or "onboarding contributor"
   - Issue requests branch creation for a contributor
   - Issue requests temporary access for a contributor
3. The default agent **must never** attempt to resolve, close, or partially handle an external-contribution issue on its own.
4. **If uncertain** whether an issue falls under this workflow, the default agent **must** err on the side of delegation or flag for human review.

---

## Agent: step1-Contribution Branch Preparer

**Purpose**: Set up branches and access for external contributors

**Responsibilities**:
- Create a dedicated feature branch for the external contributor
- Grant temporary, scoped repository access
- Document the branch and access grant in the issue
- Notify the contributor with next steps

**Activation Triggers**:
- Delegated by default agent when external-contribution issue detected
- Issue contains keywords: "external contributor", "contribution setup", "onboarding contributor"

**Prohibited Actions**:
- Must not grant persistent write access
- Must not skip security validation
- Must not merge PRs (that's step 2's role)

**Tools/Permissions Required**:
- GitHub API access for branch creation
- Repository admin permissions for access grants
- Issue comment/update permissions

---

## Agent: step2-Contribution PR Validator

**Purpose**: Review and validate external contributor pull requests

**Responsibilities**:
- Validate PR meets project standards (tests, lint, types)
- Review code quality and security
- Check that changes align with the original issue
- Approve or request changes
- Notify step3 agent when PR is merged/closed

**Activation Triggers**:
- Pull request opened on a branch created by step1 agent
- PR labeled with "external-contribution"

**Validation Checklist**:
- [ ] TypeScript strict mode compliance (no `any` types)
- [ ] Functional components with hooks (no class components)
- [ ] Types defined in `src/types/` directory
- [ ] Storage operations use `src/utils/storage.ts`
- [ ] Tailwind utility classes (minimal custom CSS)
- [ ] Build succeeds (`npm run build`)
- [ ] Code follows existing patterns

**Prohibited Actions**:
- Must not revoke access (that's step 3's role)
- Must not skip validation steps
- Must not merge without full validation

---

## Agent: step3-Contribution Access Cleaner

**Purpose**: Clean up after contribution is complete

**Responsibilities**:
- Revoke temporary contributor access
- Clean up the contribution branch (if not needed)
- Update issue with final status
- Archive contribution metadata

**Activation Triggers**:
- PR merged by maintainer after step2 validation
- PR closed without merge
- Contribution abandoned (no activity for 30+ days)

**Cleanup Actions**:
1. Revoke repository access granted in step 1
2. Delete branch (if PR merged and branch not needed)
3. Add completion comment to original issue
4. Close issue if all work complete

**Prohibited Actions**:
- Must not revoke access before PR is closed/merged
- Must not delete branches with unmerged commits
- Must not skip audit trail documentation

---

## Escalation Rules (All Agents)

If any agent encounters:
- Errors during execution
- Security concerns
- Issues that don't fit the workflow
- Ambiguous or conflicting requirements

**Action**: Stop processing and notify human maintainer immediately. Do not attempt workarounds or autonomous decisions on security-sensitive operations.
