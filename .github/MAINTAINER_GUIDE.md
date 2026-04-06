# Maintainer Guide: External Contributor Workflow

This guide explains how to use the automated agentic workflow for managing external contributors.

## Overview

The workflow automates three critical stages of external contribution management:

1. **Branch Preparation** - Create a working branch and grant temporary access
2. **PR Validation** - Run automated sanity checks on contributor submissions
3. **Access Cleanup** - Revoke temporary permissions after contribution completion

## Prerequisites

- Repository admin or maintainer permissions
- GitHub CLI (`gh`) installed and authenticated
- Copilot with agent support enabled

---

## Stage 1: Setting Up a Contributor

### When to Use
- An external contributor wants to contribute but lacks repository access
- You need to create a dedicated branch for their work
- You want to grant temporary push permissions

### Steps

1. **Create an issue** describing the contribution:
   ```markdown
   Title: Set up branch for @contributor-username - [feature description]
   
   Body:
   External contributor @contributor-username wants to work on [describe feature/fix].
   
   Please set up a contribution branch and grant temporary access.
   ```

2. **Trigger the agent** by mentioning it in a comment or assigning:
   ```
   @copilot Use step1-Contribution Branch Preparer to set up this contributor
   ```

3. **What happens automatically**:
   - ✅ Branch created: `contrib/<username>-<slug>`
   - ✅ Temporary push access granted (if needed)
   - ✅ Instructions posted for the contributor
   - ✅ Issue updated with branch details

### Expected Output

The agent will post a comment like:

> 🌿 **Branch prepared: `contrib/jdoe-fix-login-bug`**
>
> **Write access granted** to @jdoe (temporary push permission).
>
> To get started:
> ```bash
> git fetch origin
> git checkout contrib/jdoe-fix-login-bug
> ```
>
> When your changes are ready, open a pull request targeting `main`.

---

## Stage 2: Validating the Pull Request

### When to Use
- Contributor has opened a PR from their contribution branch
- You want automated sanity checks before manual review

### Steps

1. **Wait for PR creation** - Contributor opens the PR when ready

2. **Trigger validation** by commenting on the PR or issue:
   ```
   @copilot Use step2-Contribution PR Validator to review this PR
   ```

3. **What happens automatically**:
   - ✅ **Test 1**: PR description quality assessment
   - ✅ **Test 2**: Duplicate asset/component detection
   - ✅ **Test 3**: README documentation validation
   - ✅ Summary table posted with results

### Expected Output

The agent will post validation comments:

> ## Test 1: PR Description Quality
> Status: PASS ✅
>
> The PR description clearly outlines the purpose, changes made, and testing approach.

> ## Test 2: Existing Asset Check  
> Status: POSSIBLE OVERLAP ⚠️
>
> Found similar component: `src/components/LoginForm.tsx`
> - Similar authentication logic
> - Recommendation: Consider refactoring to share common logic

> ## Test 3: Documentation
> Status: README missing ⚠️
>
> Suggested README:
> ```markdown
> ## AuthHelper Utility
> ...
> ```

**Final Summary Table**:

| **Check**               | **Result**                      |
|--------------------------|---------------------------------|
| Description quality      | PASS ✅                         |
| Duplicate functionality  | ⚠️ Overlap found                |
| Documentation            | ⚠️ README drafted               |

### Your Action Required

- Review the validation results
- Request changes if needed (work with contributor)
- Approve and merge when ready

> **Note**: The agent does NOT merge PRs. You maintain full control over merging.

---

## Stage 3: Cleaning Up After Merge

### When to Use
- PR has been merged or closed
- You want to revoke the contributor's temporary access
- Branch can be deleted (optional)

### Steps

1. **Merge or close the PR** manually

2. **Trigger cleanup** by commenting on the original issue:
   ```
   @copilot Use step3-Contribution Access Cleaner to revoke access
   ```

3. **What happens automatically**:
   - ✅ Verifies PR is closed/merged (blocks if still open)
   - ✅ Revokes temporary push access
   - ✅ Posts confirmation comment
   - ✅ Closes the original setup issue (if appropriate)

### Expected Output

The agent will post:

> 🔒 **Access revoked for @jdoe.**  
> The temporary collaborator permission has been removed. Thank you for your contribution!

---

## Complete Example Workflow

### Scenario
External contributor `@alex` wants to add a new medication reminder feature.

#### Day 1: Setup
```markdown
Maintainer creates issue:
Title: Setup contribution for @alex - medication reminders

@copilot Use step1-Contribution Branch Preparer
```

Agent creates `contrib/alex-medication-reminders` and grants access.

#### Day 5: PR Submitted
Alex opens PR #42 with their changes.

```markdown
Maintainer comments on PR:
@copilot Use step2-Contribution PR Validator
```

Agent validates:
- ✅ Description quality: PASS
- ⚠️ Duplicate check: Similar to existing `ReminderCard` component
- ⚠️ Documentation: README template drafted

Maintainer requests Alex merge similar logic with `ReminderCard`.

#### Day 7: PR Updated and Merged
Alex addresses feedback. Maintainer approves and merges PR #42.

```markdown
Maintainer comments on original issue:
@copilot Use step3-Contribution Access Cleaner
```

Agent revokes Alex's push access and closes the issue.

---

## Troubleshooting

### Agent doesn't respond
- Ensure you're using exact agent names: `step1-Contribution Branch Preparer`, etc.
- Check issue/PR is in the correct repository
- Verify Copilot has required permissions

### Access not granted
- Agent may lack repository admin permissions
- Manually grant via: `Settings → Collaborators → Add people`
- Agent will note this in the comment

### Validation fails to run
- Ensure PR is from a `contrib/*` branch
- Check that PR diff is accessible
- Re-trigger manually: `@copilot Use step2-Contribution PR Validator`

### Access not revoked
- Agent confirms if PR is still open - merge/close first
- If blocked, manually remove: `Settings → Collaborators → Remove`

---

## Security Notes

- **Temporary access only**: Contributors get push access to their branch only
- **No merge permissions**: Contributors cannot merge; maintainers retain control
- **Automatic revocation**: Access removed after PR completion (merged or closed)
- **Audit trail**: All actions documented in issue/PR comments

---

## Customization

### Modify validation rules
Edit `.github/agents/step2-contribution-pr-validator.agent.md` to adjust:
- Validation criteria
- Comment format
- Additional checks

### Change branch naming
Edit `.github/agents/step1-contribution-branch-preparer.agent.md`:
```bash
# Current: contrib/<username>-<slug>
# Modify to: feature/<slug>-by-<username>
```

### Skip access grant
If contributors should fork instead:
1. Modify step 1 agent to skip access grant
2. Instruct contributors to fork and open PRs from forks

---

## Questions or Issues?

- See [AGENTS.md](../AGENTS.md) for detailed agent specifications
- Review [CONTRIBUTING.md](../CONTRIBUTING.md) for contributor guidelines
- GitHub Discussions: Ask the community
- File an issue: Report bugs or suggest improvements
