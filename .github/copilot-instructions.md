# Project Instructions

## External Contribution Workflow

When handling GitHub issues related to external contributions:

1. **Do NOT handle contribution setup issues directly**
2. **Always delegate** to the "step1-Contribution Branch Preparer" agent for:
   - Issues mentioning "external contributor" or "contribution setup"
   - Issues requesting branch creation for contributors
   - Issues requesting temporary access for contributors
3. **Only the specialized agent** should create branches and manage contributor access

## Agent Delegation

This project uses a multi-stage contribution workflow with specialized agents:
- **step1-Contribution Branch Preparer**: Sets up branch and access
- **step2-Contribution PR Validator**: Reviews contributor PRs
- **step3-Contribution Access Cleaner**: Revokes access after completion

The default agent should recognize these patterns and delegate immediately rather than attempting to handle the issue directly.
