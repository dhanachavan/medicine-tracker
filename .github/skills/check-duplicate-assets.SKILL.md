---
name: check-duplicate-assets
description: |
  Search for duplicate or similar assets in the codebase (files, components, utilities).
  Use when validating contributions to avoid code duplication.
applyTo:
  - "**/*"
---

# Check Duplicate Assets

Search the codebase for existing files, components, or utilities that might overlap with new contributions.

## Usage

Invoke this skill when:
- Reviewing a pull request from an external contributor
- Adding new components or utilities
- Validating that new functionality doesn't duplicate existing code

## Process

1. **Extract key identifiers** from the files being added:
   - Component names (e.g., `UserProfile`, `MedicationCard`)
   - Utility function names
   - Type definitions
   - Asset filenames

2. **Search for similar names**:
   ```bash
   # Search for similar component names
   grep -r "ComponentName" src/ --include="*.tsx" --include="*.ts"
   
   # Search for similar utility functions
   grep -r "functionName" src/utils/ --include="*.ts"
   
   # Search for similar types
   grep -r "TypeName" src/types/ --include="*.ts"
   ```

3. **Use semantic search** for functional overlap:
   - Search for similar functionality descriptions
   - Look for similar import patterns
   - Check for similar prop types or function signatures

4. **Report findings**:
   - **No overlap**: Confirm no duplicates found
   - **Possible overlap**: List similar files with:
     - File path
     - Similarity description
     - Recommendation (refactor, extend existing, or justify new implementation)

## Output Format

Return a structured report:

```markdown
## Duplicate Asset Check Results

**Status**: PASS ✅ | POSSIBLE OVERLAP ⚠️

### Files Checked
- `src/components/NewComponent.tsx`
- `src/utils/newHelper.ts`

### Similar Assets Found
- `src/components/ExistingComponent.tsx` - Similar functionality for user profile display
- Recommendation: Consider extending existing component or justify separate implementation

### Assets Cleared
- `src/utils/newHelper.ts` - No overlap detected
```

## Notes

- Focus on functional similarity, not just naming
- Consider whether overlap is intentional (e.g., specialized variants)
- Suggest refactoring opportunities when appropriate
