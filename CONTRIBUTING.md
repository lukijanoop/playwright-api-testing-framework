# 🤝 Contributing to Playwright API Testing Framework

Thank you for your interest in contributing! This project welcomes contributions from everyone, from beginners to advanced users.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Ways to Contribute](#ways-to-contribute)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing Your Changes](#testing-your-changes)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)

## 🌟 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## 🚀 Getting Started

### Prerequisites
- Node.js 16 or higher
- npm or yarn package manager
- Git
- Basic knowledge of TypeScript and Playwright

### Quick Setup
```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/playwright-api-testing-framework.git
cd playwright-api-testing-framework

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run tests to verify setup
npm test
```

## 💡 Ways to Contribute

### 🐛 Bug Reports
- Search existing issues first
- Use the bug report template
- Include steps to reproduce
- Provide environment details

### ✨ Feature Requests
- Check if the feature already exists
- Use the feature request template
- Describe the use case
- Explain the expected behavior

### 📝 Documentation
- Improve README files
- Add code examples
- Create tutorials
- Fix typos and grammar

### 🧪 Test Contributions
- Add new test cases
- Improve existing tests
- Add performance tests
- Create integration tests

### 💻 Code Contributions
- Fix bugs
- Add new features
- Improve performance
- Refactor code
- Add TypeScript types

## 🛠️ Development Setup

### 1. Fork the Repository
```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/playwright-api-testing-framework.git
```

### 2. Add Upstream Remote
```bash
# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/playwright-api-testing-framework.git

# Verify remotes
git remote -v
```

### 3. Create a Branch
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/your-bug-fix-name
```

## ✏️ Making Changes

### Branch Naming Convention
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `test/` - Test improvements
- `refactor/` - Code refactoring

### Commit Message Format
```
type(scope): short description

Longer description if needed

Fixes #123
```

**Types:**
- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation changes
- `test` - Test changes
- `refactor` - Code refactoring
- `style` - Code style changes
- `chore` - Maintenance tasks

**Examples:**
```bash
feat(auth): add support for OAuth authentication
fix(api-client): handle timeout errors properly
docs(readme): add quick start section
test(api): add user profile test cases
```

## 🧪 Testing Your Changes

### Run All Tests
```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests in headed mode
npm run test:headed

# Debug tests
npm run test:debug
```

### Test Categories
```bash
# Run only basic tests
npm run test:basic

# Run only advanced tests
npm run test:advanced

# Run tests with coverage
npm run test:coverage
```

### Manual Testing Checklist
- [ ] All tests pass locally
- [ ] New functionality works as expected
- [ ] Error handling works properly
- [ ] Documentation is updated
- [ ] No TypeScript errors
- [ ] Performance is acceptable

## 📤 Submitting Changes

### 1. Push Your Changes
```bash
# Push feature branch
git push origin feature/your-feature-name
```

### 2. Create Pull Request
- Use the pull request template
- Fill out all sections
- Add screenshots for UI changes
- Link related issues
- Request review from maintainers

### 3. Pull Request Checklist
- [ ] All tests pass
- [ ] Code follows style guidelines
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] No merge conflicts
- [ ] Self-review completed

## 📏 Coding Standards

### TypeScript Guidelines
```typescript
// ✅ Use explicit types
const userId: number = 123;
const userName: string = 'john';

// ✅ Use interfaces for objects
interface User {
  id: number;
  name: string;
  email: string;
}

// ✅ Use proper naming conventions
class AuthManager { /* ... */ }
const authManager = new AuthManager();

// ✅ Use async/await properly
async function login(credentials: AuthCredentials): Promise<User> {
  try {
    const response = await this.apiClient.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
}
```

### Test Guidelines
```typescript
// ✅ Use descriptive test names
test('AuthManager should login with valid credentials', async () => {
  // Test implementation
});

// ✅ Use proper assertions
expect(user.username).toBe('testuser');
expect(result.status).toBe(200);

// ✅ Test error cases
test('should handle login failure gracefully', async () => {
  await expect(dummyJsonAuth.login(invalidCredentials))
    .rejects.toThrow('Login failed');
});

// ✅ Clean up after tests
test.afterEach(async () => {
  await dummyJsonAuth.logout();
});
```

### File Organization
```
project/
├── helpers/
│   ├── api-client.ts       # HTTP client
│   ├── auth-manager.ts     # Authentication
│   └── test-data-manager.ts # Test utilities
├── types/
│   └── api.ts              # TypeScript interfaces
├── tests/
│   ├── api-tests.spec.ts   # Main test file
│   ├── auth.spec.ts        # Auth-specific tests
│   └── utils/
│       └── test-helpers.ts # Test utilities
└── config/
    ├── environments.ts     # Environment configs
    └── api-config.ts       # API configurations
```

### Code Style Rules
- **Indentation:** 2 spaces
- **Semicolons:** Always use semicolons
- **Quotes:** Use single quotes for strings
- **Line length:** Max 100 characters
- **Variables:** Use camelCase
- **Constants:** Use UPPER_SNAKE_CASE
- **Classes:** Use PascalCase
- **Functions:** Use camelCase

## 📚 Documentation Standards

### README Updates
- Keep language clear and concise
- Use code examples
- Add screenshots for UI changes
- Update table of contents
- Include installation instructions

### Code Comments
```typescript
/**
 * Authenticates a user with the API
 * @param credentials - User login credentials
 * @returns Promise that resolves to user object
 * @throws {Error} If authentication fails
 */
async login(credentials: AuthCredentials): Promise<User> {
  // Implementation
}
```

## 🎯 Issue Guidelines

### Bug Reports
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. Windows 10]
- Node: [e.g. 16.0.0]
- Playwright: [e.g. 1.30.0]
```

### Feature Requests
```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
A clear description of any alternative solutions.

**Additional context**
Add any other context or screenshots.
```

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special mentions for exceptional help

## 📞 Getting Help

- **GitHub Discussions:** General questions and ideas
- **GitHub Issues:** Bug reports and feature requests
- **Discord:** Real-time chat (invite link in README)

## 🙏 Thank You

Thank you for contributing to the Playwright API Testing Framework! Your efforts help make this project better for everyone.

---

**Happy Contributing! 🎉**