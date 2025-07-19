# Contributing to Prompt Monster 👹

Thank you for your interest in contributing to Prompt Monster! We welcome contributions from the community and appreciate your help in making this tool even more amazing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Guidelines](#guidelines)
- [Submitting Changes](#submitting-changes)
- [Types of Contributions](#types-of-contributions)

## 📜 Code of Conduct

This project adheres to our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🚀 How to Contribute

### 1. Fork the Repository
Click the "Fork" button at the top right of the repository page.

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/prompt-monster.git
cd prompt-monster
```

### 3. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

### 4. Make Your Changes
Follow our [guidelines](#guidelines) while making changes.

### 5. Test Your Changes
```bash
npm start  # Test in development
npm run build  # Ensure production build works
```

### 6. Commit Your Changes
```bash
git add .
git commit -m "feat: add amazing new feature"
```

### 7. Push and Create PR
```bash
git push origin feature/your-feature-name
```
Then create a Pull Request on GitHub.

## 💻 Development Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm (version 6 or higher)
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/risadams/prompt-monster.git
cd prompt-monster

# Install dependencies
npm install

# Start development server
npm start
```

### Project Structure
```
src/
├── components/        # React components
├── data/             # JSON data files
├── App.js           # Main application
├── App.css          # Component styles
├── index.css        # Base styles
└── utils.css        # Utility classes
```

## 📐 Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Follow existing naming conventions
- Write descriptive commit messages
- Add comments for complex logic

### Accessibility
- Maintain WCAG 2.1 AA compliance
- Test with keyboard navigation
- Ensure screen reader compatibility
- Provide proper ARIA labels

### Responsive Design
- Test on mobile, tablet, and desktop
- Use CSS Grid and Flexbox appropriately
- Follow mobile-first approach
- Maintain consistent spacing

### Performance
- Optimize images and assets
- Minimize bundle size
- Use React best practices
- Test loading times

## 📝 Submitting Changes

### Pull Request Process
1. **Update Documentation**: If you change functionality, update relevant docs
2. **Test Thoroughly**: Ensure all features work as expected
3. **Follow Template**: Use our PR template
4. **Be Descriptive**: Explain what your changes do and why

### PR Checklist
- [ ] Code follows project style guidelines
- [ ] Changes are tested on multiple devices
- [ ] Accessibility standards are maintained
- [ ] Documentation is updated if needed
- [ ] Commit messages are descriptive
- [ ] No console errors or warnings

### Review Process
1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be recognized!

## 🎯 Types of Contributions

### 🐛 Bug Fixes
- Report bugs through GitHub Issues
- Include steps to reproduce
- Provide screenshots if helpful
- Test your fix thoroughly

### ✨ Features
- Discuss major features in Issues first
- Keep changes focused and atomic
- Update documentation
- Ensure backward compatibility

### 📚 Documentation
- Fix typos and grammar
- Improve clarity and examples
- Add missing documentation
- Update outdated information

### 🎨 Design Improvements
- Follow brand guidelines
- Maintain accessibility standards
- Test across devices
- Consider user experience impact

### 🔧 Code Quality
- Refactor for better maintainability
- Improve performance
- Add TypeScript types (future)
- Enhance error handling

### 📊 Data Contributions
- Add new prompt templates
- Include new role definitions
- Ensure data quality
- Follow existing format

## 🏷️ Commit Message Format

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```bash
feat: add template search functionality
fix: resolve mobile responsive issues
docs: update installation instructions
style: improve button hover animations
```

## 🔍 Testing

### Manual Testing
- Test all functionality works correctly
- Verify responsive design on different screen sizes
- Check accessibility with keyboard navigation
- Test in multiple browsers

### Accessibility Testing
- Use screen reader to test navigation
- Verify color contrast meets standards
- Test keyboard-only navigation
- Check focus indicators

### Performance Testing
- Run Lighthouse audit
- Check bundle size impact
- Test loading times
- Verify smooth animations

## ❓ Getting Help

### Resources
- [React Documentation](https://react.dev/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Git Tutorial](https://git-scm.com/docs/gittutorial)

### Questions?
- Check existing [Issues](https://github.com/risadams/prompt-monster/issues)
- Start a [Discussion](https://github.com/risadams/prompt-monster/discussions)
- Contact [@risadams](https://github.com/risadams)

## 🎉 Recognition

Contributors will be:
- Listed in our Contributors section
- Mentioned in release notes
- Celebrated in our community

Thank you for helping make Prompt Monster more awesome! 🚀✨
