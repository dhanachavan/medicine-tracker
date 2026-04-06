# Maintainer Guide: External Contributor Workflow

## Prerequisites

- Repository admin permissions
- GitHub CLI (`gh`) installed and authenticated
- Copilot with agent support enabled

## Commands

### Stage 1 — Set up branch & access

Create an issue mentioning the contributor's `@username` and what they'll work on, then comment:

```
@copilot Use step1-Contribution Branch Preparer
```

The agent creates `contrib/<username>-<slug>`, grants temporary push access, and posts checkout instructions.

### Stage 2 — Validate the PR

After the contributor opens a PR, comment on the issue or PR:

```
@copilot Use step2-Contribution PR Validator
```

The agent checks description quality, duplicate assets, and README documentation, then posts a summary table.

### Stage 3 — Revoke access

After you merge or close the PR, comment on the original issue:

```
@copilot Use step3-Contribution Access Cleaner
```

The agent verifies the PR is closed, revokes temporary access, and posts confirmation.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Agent doesn't respond | Use exact agent names; verify Copilot permissions |
| Access not granted | Agent may lack admin perms — grant manually via Settings → Collaborators |
| Validation doesn't run | Ensure PR is from a `contrib/*` branch; re-trigger the agent |
| Access not revoked | Merge/close the PR first; if blocked, remove manually via Settings → Collaborators |

## Security

- **Scoped**: Contributors get push access to their branch only — no merge rights
- **Temporary**: Access auto-revoked via Stage 3 after PR completion
- **Audited**: All actions logged as issue/PR comments

## Customization

Edit the `.agent.md` files in `.github/agents/` to change validation rules, branch naming, or access behaviour.
