# External Contributions

This repository accepts **controlled external contributions** using temporary access and automated validation.

This document explains what external contributors should expect when contributing.

---

## Prerequisites for Maintainers

> **Important**: The security model of this workflow depends on branch protection being properly configured. Without it, temporary collaborators have push access to all branches.

Before using this workflow, ensure the following are in place:

1. **Branch protection on `main`**:
   - Require pull request reviews before merging
   - Require status checks to pass (if applicable)
   - Restrict who can push directly to `main` (disable direct pushes)
   - Enable "Require CODEOWNERS review" if CODEOWNERS is configured
2. **CODEOWNERS** is present and lists at least one reviewer (e.g., `* @username`)
3. **GitHub App** is installed with `APP_ID` stored as a repository variable and `APP_PRIVATE_KEY` as a secret
4. **Label**: Create an `external-contrib` label — IssueOps commands won't run without it

---

## How Contributions Work

When a maintainer approves an external contribution:

1. You are given a **temporary branch** and **temporary write access**
2. You push changes only to that branch
3. You open a pull request to `main`
4. Validation runs automatically
5. Maintainers review and merge
6. Temporary access is removed automatically

---

## Getting Started

You will receive a comment on the issue with:
- the branch name you should use
- confirmation of temporary write access

### Important
- **Only push to the branch provided**
- Do **not** push directly to `main`
- Access is temporary and scoped to this contribution

---

## Creating Your Pull Request

When opening your pull request, include the following in the description:

- **What problem you’re solving**
- **What changed** (high‑level)
- **How you tested it** (commands + results)
- **Documentation impact** (README updates, diagrams if applicable)

Clear descriptions help reviewers respond faster.

---

## Validation

When you push commits or open a pull request:

- Automated validation runs
- Tests run on a **best‑effort basis** depending on available tooling
- Validation results are posted as a comment on the pull request

If something is flagged, update your PR or reply with clarification.

---

## Reviews and Approval

- Reviews are required before merge
- Reviewers may request changes or documentation updates
- Address feedback by pushing updates to the same branch

---

## Documentation Expectations

If your change modifies externally visible behavior:
- Update the README if needed
- Include diagrams only when they add clarity

If documentation is missing or unclear, reviewers may request updates.

---

## Cleanup

When your pull request is merged or closed:
- Temporary access is automatically removed
- The contribution branch is deleted

No action is required from you.

---

## Questions

If you’re unsure about:
- validation feedback
- documentation expectations
- next steps

Reply on the issue or pull request and a maintainer will help.
