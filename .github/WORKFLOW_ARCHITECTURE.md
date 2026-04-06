# External Contributor Workflow Architecture

This document provides a comprehensive view of the automated external contributor workflow system.

## System Architecture

```mermaid
flowchart TB
    subgraph Triggers["🎯 Workflow Triggers"]
        T1[Maintainer Request<br/>for Contributor Setup]
        T2[Contributor Opens PR]
        T3[PR Merged/Closed]
    end
    
    subgraph DefaultAgent["🤖 Default Agent"]
        DA[Default Copilot Agent]
        DA --> |Detects keywords:<br/>- external contributor<br/>- contribution setup<br/>- branch creation| Delegate
    end
    
    subgraph Stage1["📝 Stage 1: Branch Preparation"]
        S1A[Step1 Agent<br/>Branch Preparer]
        S1A --> S1B[Create Branch<br/>contrib/username-slug]
        S1B --> S1C[Check Existing Access]
        S1C --> |No access| S1D[Grant Temp Push]
        S1C --> |Has access| S1E[Skip Grant]
        S1D --> S1F[Post Instructions]
        S1E --> S1F
    end
    
    subgraph Stage2["🔍 Stage 2: PR Validation"]
        S2A[Step2 Agent<br/>PR Validator]
        S2A --> S2B[Fetch PR Details]
        S2B --> S2C[Run Validation Suite]
        
        S2C --> V1[Test 1:<br/>Description Quality]
        S2C --> V2[Test 2:<br/>Duplicate Assets]
        S2C --> V3[Test 3:<br/>README Check]
        
        V1 --> S2D[Post Results]
        V2 --> S2D
        V3 --> S2D
        
        S2D --> S2E[Summary Table]
    end
    
    subgraph Stage3["🔒 Stage 3: Access Cleanup"]
        S3A[Step3 Agent<br/>Access Cleaner]
        S3A --> S3B[Verify PR Status]
        S3B --> |Still Open| S3C[Block & Notify]
        S3B --> |Closed/Merged| S3D[Check Access Grant]
        S3D --> |Was Granted| S3E[Revoke Access]
        S3D --> |Not Granted| S3F[Skip Revocation]
        S3E --> S3G[Post Confirmation]
        S3F --> S3G
    end
    
    subgraph Skills["🛠️ Reusable Skills"]
        SK1[check-duplicate-assets]
        SK2[validate-readme]
    end
    
    T1 --> DA
    Delegate --> S1A
    T2 --> S2A
    T3 --> S3A
    
    V2 -.uses.-> SK1
    V3 -.uses.-> SK2
    
    S1F -.notifies.-> Contributor[👤 Contributor]
    Contributor -.works on.-> PR[Pull Request]
    PR --> T2
    S2E -.informs.-> Maintainer[👨‍💼 Maintainer]
    Maintainer -.reviews & merges.-> PR
    PR -.triggers.-> T3
    
    style DA fill:#e3f2fd
    style S1A fill:#e1f5ff
    style S2A fill:#fff4e1
    style S3A fill:#ffe1e1
    style SK1 fill:#f3e5f5
    style SK2 fill:#f3e5f5
```

## Component Overview

### 1. Default Agent (Delegation Hub)

**File**: `.github/copilot-instructions.md`

**Purpose**: Detect external contributor requests and delegate to specialized agents

**Trigger Keywords**:
- "external contributor"
- "contribution setup"
- "onboard contributor"
- "new contributor"
- "create branch for @username"
- "temporary access"

**Behavior**: Must NEVER handle contributor setup directly; immediately delegates to Step 1 agent

---

### 2. Stage 1: Branch Preparation Agent

**File**: `.github/agents/step1-contribution-branch-preparer.agent.md`

**Purpose**: Create isolated workspace for contributor

**Capabilities**:
- Extract contributor username from issue
- Generate branch name: `contrib/<username>-<slug>`
- Create branch from latest default branch
- Check existing collaborator permissions
- Grant temporary push access (if needed)
- Post checkout instructions

**Tools Used**: `execute` (GitHub CLI)

**Output**: Comment with branch name, access status, and instructions

---

### 3. Stage 2: PR Validation Agent

**File**: `.github/agents/step2-contribution-pr-validator.agent.md`

**Purpose**: Run automated quality and sanity checks

**Validation Tests**:

#### Test 1: Description Quality
- Checks PR title and body clarity
- Verifies purpose, changes, and context are explained
- Provides constructive feedback if lacking

#### Test 2: Duplicate Asset Detection
- Uses `check-duplicate-assets` skill
- Searches for similar components, utilities, or files
- Flags potential refactoring opportunities

#### Test 3: Documentation Validation
- Uses `validate-readme` skill
- Checks for README presence and completeness
- Generates template if missing

**Tools Used**: `execute`, `read`, `search`

**Output**: Per-test comments + summary table

---

### 4. Stage 3: Access Cleanup Agent

**File**: `.github/agents/step3-contribution-access-cleaner.agent.md`

**Purpose**: Revoke temporary permissions after completion

**Safety Checks**:
- Verifies PR is closed/merged (blocks if open)
- Confirms access was granted in Stage 1
- Does NOT revoke pre-existing access

**Capabilities**:
- Query PR status via GitHub API
- Remove collaborator via API
- Post confirmation or error details

**Tools Used**: `execute` (GitHub CLI)

**Output**: Confirmation comment

---

## Skill System

### Skill: check-duplicate-assets

**File**: `.github/skills/check-duplicate-assets.SKILL.md`

**Purpose**: Search codebase for existing similar functionality

**Process**:
1. Extract component/utility names from PR files
2. Search recursively in relevant directories (`src/components/`, `src/utils/`)
3. Use semantic search for functional similarity
4. Report findings with recommendations

**Used By**: Stage 2 (Test 2)

---

### Skill: validate-readme

**File**: `.github/skills/validate-readme.SKILL.md`

**Purpose**: Ensure comprehensive documentation exists

**Validation Criteria**:
- README file presence
- Required sections (Overview, Usage, API, Examples)
- Visual diagrams for complex flows

**Behavior**:
- If missing: Generate template with Mermaid diagram
- If incomplete: List missing sections
- If complete: Confirm pass

**Used By**: Stage 2 (Test 3)

---

## Data Flow

```mermaid
sequenceDiagram
    participant M as Maintainer
    participant D as Default Agent
    participant S1 as Step1 Agent
    participant C as Contributor
    participant GH as GitHub API
    participant S2 as Step2 Agent
    participant SK as Skills
    participant S3 as Step3 Agent
    
    rect rgb(225, 245, 255)
        Note over M,S1: Stage 1: Setup
        M->>D: Issue: "Setup @alice for feature X"
        D->>D: Detects "external contributor"
        D->>S1: Delegate to Branch Preparer
        S1->>GH: Create branch contrib/alice-feature-x
        S1->>GH: Check alice's permissions
        GH-->>S1: No write access
        S1->>GH: Grant temporary push
        S1->>M: Post instructions comment
        M->>C: Notify contributor
    end
    
    rect rgb(255, 244, 225)
        Note over C,S2: Stage 2: Validation
        C->>C: Make changes
        C->>GH: Open PR #42
        M->>S2: @copilot validate PR
        S2->>GH: Fetch PR details
        S2->>S2: Test 1 - Description
        S2->>SK: Test 2 - Check duplicates
        SK-->>S2: No duplicates found
        S2->>SK: Test 3 - Validate README
        SK-->>S2: README missing
        S2->>GH: Post validation results
        S2->>M: Post summary table
        M->>M: Review & request changes
        C->>C: Address feedback
        M->>GH: Merge PR #42
    end
    
    rect rgb(255, 225, 225)
        Note over M,S3: Stage 3: Cleanup
        M->>S3: @copilot revoke access
        S3->>GH: Check PR #42 status
        GH-->>S3: State: MERGED
        S3->>GH: Remove alice as collaborator
        S3->>M: Post confirmation
        S3->>M: Close setup issue
    end
```

---

## Security Model

### Access Control

| **Phase**     | **Contributor Access**              | **Maintainer Control**           |
|---------------|-------------------------------------|----------------------------------|
| Pre-Setup     | None                                | Full                             |
| Stage 1       | Push to `contrib/*` branch only     | Full (can revoke anytime)        |
| Stage 2       | Same                                | Full (must approve merge)        |
| Stage 3       | None (revoked)                      | Full                             |

### Safety Features

1. **Scoped Permissions**: Push access limited to specific branch
2. **No Merge Rights**: Contributors cannot merge PRs
3. **Audit Trail**: All actions logged in issue/PR comments
4. **Manual Merge Gate**: Maintainers retain final approval
5. **Automatic Cleanup**: Access revoked immediately after completion
6. **State Validation**: Stage 3 blocks if PR still open

---

## Integration Points

### Default Agent Integration

**Delegation Logic** (in `.github/copilot-instructions.md`):

```markdown
When an issue contains:
- "external contributor"
- "contribution setup"  
- "@username" + "branch"

Action: runSubagent("step1-Contribution Branch Preparer")
```

### Skill Integration

**In Agent Files**:
```yaml
tools: ["execute", "read", "search"]
```

**In Validation Code**:
```markdown
Use the check-duplicate-assets skill to search for similar files
```

---

## Extension Points

### Adding New Validation Tests

**File**: `step2-contribution-pr-validator.agent.md`

Add to the "Checks" section:

```markdown
**Test 4 — [Your Check Name]**
[Description of what to check]

**Duplicate-comment guard:** Check for existing `## Test 4: [Name]` comment

Post/update:
## Test 4: [Name]
Status: PASS ✅ / NEEDS WORK ⚠️
```

Update the final summary table to include the new test.

### Creating New Skills

**Location**: `.github/skills/your-skill-name.SKILL.md`

**Required YAML frontmatter**:
```yaml
---
name: your-skill-name
description: Brief purpose
applyTo:
  - "**/*"
---
```

**Content**: Detailed instructions for accomplishing the skill's task

### Custom Branch Naming

**File**: `step1-contribution-branch-preparer.agent.md`

Modify the branch creation logic:
```bash
# Current:
BRANCH_NAME="contrib/$CONTRIBUTOR-$SLUG"

# Custom example:
BRANCH_NAME="external/$SLUG-by-$CONTRIBUTOR"
```

---

## Monitoring & Observability

### Success Indicators

- ✅ Stage 1 completes with "Write access granted" comment
- ✅ Stage 2 completes with validation summary table
- ✅ Stage 3 completes with "Access revoked" confirmation

### Error Patterns

| **Error**                          | **Agent**  | **Resolution**                     |
|------------------------------------|------------|------------------------------------|
| "Could not create branch"          | Stage 1    | Check branch doesn't already exist |
| "Permission denied"                | Stage 1    | Agent needs admin repo permissions |
| "PR not found"                     | Stage 2    | Verify PR number in comment        |
| "PR is still open"                 | Stage 3    | Merge or close PR first            |

### Audit Trail

All agent actions are documented in:
- **Issue comments** (setup and cleanup confirmations)
- **PR comments** (validation results)
- **GitHub collaborator log** (access grants/revokes)

---

## Best Practices

### For Maintainers

1. **Always trigger in issues**, not in PRs
2. **Wait for each stage** to complete before triggering the next
3. **Review validation results** before merging
4. **Manually merge** - agents validate but don't approve
5. **Verify access revoked** after Stage 3 completes

### For Contributors

1. **Wait for branch setup** before starting work
2. **Only push to assigned branch** (`contrib/your-username-*`)
3. **Follow validation feedback** to improve PR
4. **Be patient** - maintainers must manually approve

### For Repository Setup

1. **Grant bot permissions** - Agents need admin access to manage collaborators
2. **Protect default branch** - Require PR reviews
3. **Use issue templates** - Standardize contributor requests
4. **Document clearly** - Keep CONTRIBUTING.md updated

---

## Troubleshooting Guide

### Issue: Agent Doesn't Respond

**Symptoms**: No response after mentioning agent

**Checks**:
- Is agent name exact? (`step1-Contribution Branch Preparer`)
- Is Copilot enabled for the repository?
- Are you in the correct repository?

**Solution**: Re-trigger with exact agent name

---

### Issue: Branch Already Exists

**Symptoms**: Stage 1 fails with "branch exists" error

**Checks**:
- Was branch created in previous attempt?
- Is contributor reusing same feature name?

**Solution**: Delete old branch or use different slug

---

### Issue: Access Not Granted

**Symptoms**: Stage 1 completes but contributor can't push

**Checks**:
- Did agent post "Write access granted"?
- Does agent have admin permissions?

**Solution**: Manually grant via Settings → Collaborators

---

### Issue: Validation Skips Tests

**Symptoms**: Stage 2 doesn't run all tests

**Checks**:
- Are PR files accessible?
- Does PR have enough changes to validate?

**Solution**: Check PR diff availability; re-trigger agent

---

### Issue: Access Not Revoked

**Symptoms**: Stage 3 completes but user still has access

**Checks**:
- Did agent post "Access revoked" confirmation?
- Was access granted in Stage 1?

**Solution**: Manually remove via Settings → Collaborators

---

## Version History

| **Version** | **Date**    | **Changes**                              |
|-------------|-------------|------------------------------------------|
| 1.0         | April 2026  | Initial workflow implementation          |

---

## Related Documentation

- [MAINTAINER_GUIDE.md](MAINTAINER_GUIDE.md) - Detailed usage guide
- [WORKFLOW_QUICK_REFERENCE.md](WORKFLOW_QUICK_REFERENCE.md) - One-page cheat sheet
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contributor guidelines
- [AGENTS.md](../AGENTS.md) - Agent specifications
- [copilot-instructions.md](copilot-instructions.md) - Default agent configuration
