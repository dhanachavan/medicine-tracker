# Copilot Instructions (Repo-wide)

You are assisting maintainers and contributors working in a multi-language repository.

## Security & Safety
- Default to least-privilege recommendations for GitHub Actions and automation.
- Do NOT suggest using `pull_request_target` to run untrusted code from forks or external contributors.
- Avoid designs that require secrets for validation or external contribution workflows.

## Architectural Hygiene
- Before proposing new components or files, search the codebase for similar assets by name and function.
- Prefer reuse or extension over duplication.
- If overlap exists, clearly justify whether the change should merge with existing code or remain separate.

## Documentation Principle
- If a change alters externally observable behavior, documentation should be updated accordingly.