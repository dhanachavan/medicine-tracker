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

**Note**: External contributions follow a structured workflow for security and quality control.

1. **Request Setup**: Create an issue titled "External Contributor Setup: [Your Name]"
   - Include: Your GitHub username, brief description of intended contribution
   - An automated agent will create a dedicated branch and grant you access

2. **Wait for Branch**: You'll receive a comment with:
   - Branch name to use
   - Access confirmation
   - Next steps

3. **Make Changes**: 
   - Clone the repository and checkout your assigned branch
   - Implement your changes following code standards
   - Test thoroughly

4. **Submit PR**:
   - Create Pull Request from your branch
   - Reference the original setup issue
   - Describe your changes clearly

5. **Review Process**:
   - Automated validation will check code standards
   - Maintainers will review and provide feedback
   - Address any requested changes

6. **Completion**:
   - Once merged, your access will be automatically revoked
   - Your branch will be cleaned up
   - You'll be credited in the release notes!

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
