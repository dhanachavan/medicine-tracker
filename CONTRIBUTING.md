# Contributing to Medicine Tracker

Thank you for your interest in contributing to Medicine Tracker! This document provides guidelines for contributing to the project.

## Getting Started

1. **Fork the repository** to your GitHub account
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/medicine-tracker.git
   cd medicine-tracker
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

## Development Guidelines

### Code Standards

- **TypeScript**: Use strict mode, no `any` types
- **React**: Functional components with hooks only (no class components)
- **Types**: Define interfaces in `src/types/` directory
- **Storage**: Use `src/utils/storage.ts` for all localStorage operations
- **Styling**: Use Tailwind CSS utility classes; avoid custom CSS unless necessary

### Project Structure

```
src/
  components/    - React components
  types/         - TypeScript type definitions
  utils/         - Utility functions (storage, helpers)
  assets/        - Static assets (images, icons)
```

### Commit Messages

Use clear, descriptive commit messages:
- `feat: add medication reminder notifications`
- `fix: resolve localStorage sync issue`
- `docs: update README with setup instructions`
- `refactor: simplify medication card component`

## Submitting Changes

### For Core Team Members

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes following the code standards
3. Test thoroughly: `npm run build` and manual testing
4. Commit your changes with clear messages
5. Push and create a Pull Request
6. Request review from maintainers

### For External Contributors

**Note**: External contributions follow a controlled workflow using IssueOps and automated validation. See [docs/external-contributions.md](docs/external-contributions.md) for the full contributor guide.

#### Workflow Overview

This repository uses a three-stage automated workflow:
1. **IssueOps** (`/grant`) — A maintainer creates a dedicated `ext/` branch and grants temporary write access
2. **Validation** — Non-blocking checks run automatically on push and PR events
3. **Cleanup** — Access is revoked and the branch is deleted when the PR is merged or closed

#### Contribution Steps

1. **Create an issue** describing your intended contribution and add the `external-contrib` label (or ask a maintainer to add it).

2. **Wait for access**: A maintainer runs `/grant @your-username` on the issue. You'll receive an automated comment with:
   - ✅ Branch name (format: `ext/issue-<N>/<your-username>/<timestamp>`)
   - ✅ Confirmation of temporary push access

   Example:
   ```bash
   git fetch origin
   git checkout ext/issue-42/your-username/1712345678901
   # Make your changes
   git push origin ext/issue-42/your-username/1712345678901
   ```

3. **Make changes**:
   - Implement your changes following the code standards above
   - Test thoroughly (build, type-check, manual testing)
   - Commit with clear messages

4. **Open a PR** from your `ext/` branch to `main`:
   - Link the original issue
   - Include: what changed, why, and how you tested it

5. **Automated validation** runs and posts guidance as PR and issue comments. Address any feedback.

6. **Completion**:
   - Maintainer reviews and merges your PR
   - Access is automatically revoked and the branch is deleted

> **Note**: Temporary access is scoped to this contribution. If no PR is opened within 14 days, a stale-access reaper will automatically revoke access and delete the branch. A maintainer can re-run `/grant` if needed.

## Testing

Before submitting:
- [ ] Code builds successfully: `npm run build`
- [ ] No TypeScript errors: `npm run type-check` (if available)
- [ ] Manual testing in browser
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Edge cases handled (empty states, invalid input, etc.)

## Code Review Checklist

Your PR will be reviewed for:
- Adherence to TypeScript strict mode
- Proper component structure (functional with hooks)
- Type safety and proper interfaces
- Consistent styling with Tailwind
- Proper storage utility usage
- Browser compatibility
- Code clarity and maintainability

## Questions?

If you have questions about contributing:
- Check existing issues and discussions
- Create a new issue with the `question` label
- Tag maintainers for guidance

## Code of Conduct

- Be respectful and constructive
- Focus on the code, not the person
- Help create a welcoming environment
- Report unacceptable behavior to maintainers

Thank you for contributing to Medicine Tracker! 🎯
