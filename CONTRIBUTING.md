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

**Note**: External contributions follow an automated, secure workflow managed by specialized AI agents.

#### 🤖 Automated Workflow Overview

This repository uses a three-stage agentic workflow:
1. **Branch Preparation Agent** - Creates your branch and grants temporary access
2. **PR Validation Agent** - Runs automated sanity checks on your submission
3. **Access Cleanup Agent** - Revokes access after completion

#### 📋 Contribution Steps

1. **Request Setup**: Create an issue describing your intended contribution
   ```markdown
   Title: External Contributor Setup: @your-username - [feature name]
   
   Body:
   I'd like to contribute [describe feature/fix].
   GitHub: @your-username
   ```
   - A maintainer will trigger the Branch Preparation agent
   - You'll receive temporary push access to a dedicated branch

2. **Wait for Branch**: You'll receive an automated comment with:
   - ✅ Branch name: `contrib/your-username-feature-name`
   - ✅ Access confirmation
   - ✅ Checkout instructions
   
   Example:
   ```bash
   git fetch origin
   git checkout contrib/your-username-feature-name
   # Make your changes
   git push origin contrib/your-username-feature-name
   ```

3. **Make Changes**: 
   - Implement your changes following our code standards below
   - Test thoroughly (build, type-check, manual testing)
   - Commit with clear messages

4. **Submit PR**:
   - Create Pull Request from your branch to `main`
   - Link the original setup issue
   - Provide detailed description:
     - What changed
     - Why (problem solved)
     - How to test it

5. **Automated Validation**:
   The PR Validation agent will:
   - ✅ Check PR description quality
   - ✅ Detect duplicate functionality
   - ✅ Validate documentation (README)
   - Post results as PR comments

6. **Address Feedback**:
   - Review validation results and maintainer comments
   - Make requested changes
   - Push updates to the same branch

7. **Completion**:
   - ✅ Maintainer merges your PR
   - ✅ Access automatically revoked by Cleanup agent
   - ✅ You're credited in release notes!

> **For Maintainers**: See [.github/MAINTAINER_GUIDE.md](.github/MAINTAINER_GUIDE.md) for workflow details.

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
