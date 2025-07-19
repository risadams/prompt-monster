# 👹 Prompt Monster

<div align="center">

![Prompt Monster Logo](public/logo.svg)

**Unleash your creativity with monstrously good prompts!**

[![React](https://img.shields.io/badge/React-19.1.0-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![Accessibility](https://img.shields.io/badge/WCAG-2.1%20AA-green?style=flat-square)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Responsive](https://img.shields.io/badge/Design-Responsive-blue?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[Live Demo](http://localhost:3000) • [Features](#features) • [Getting Started](#getting-started) • [Documentation](#documentation)

</div>

---

## 🎭 About Prompt Monster

Prompt Monster is a fun, approachable, and powerful tool for crafting effective prompts for GPT and AI applications. Our intuitive prompt builder combines playful monster imagery with professional functionality, making prompt engineering feel like a creative adventure!

### 🌟 Why Prompt Monster?

- **🎨 Beautiful Design**: Modern, brand-aligned interface with vibrant colors and smooth animations
- **📱 Fully Responsive**: Works seamlessly on mobile, tablet, and desktop devices
- **♿ Accessible**: WCAG 2.1 AA compliant with full keyboard navigation and screen reader support
- **🚀 Fast & Modern**: Built with React 19 and optimized for performance
- **🎯 User-Friendly**: Intuitive interface that makes prompt creation effortless

---

## ✨ Features

### 🔧 Prompt Building

- **Role-Based Prompts**: Choose from predefined roles or create custom ones
- **Structured Framework**: Task → Goal → Context → Details structure for effective prompts
- **Real-Time Preview**: See your prompt generate as you type
- **One-Click Copy**: Copy generated prompts to clipboard instantly

### 📚 Template System

- **Curated Templates**: Pre-built templates for common use cases
- **Smart Search**: Find templates by name, role, or task
- **Quick Application**: Apply template values with a single click
- **Extensible**: Easy to add new templates

### 🎨 Design & UX

- **Monster Branding**: Playful monster mascot with floating animation
- **Gradient Backgrounds**: Beautiful color transitions throughout the interface
- **Smooth Interactions**: Hover effects, loading states, and micro-animations
- **Visual Feedback**: Clear success states and error handling

### ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support with skip links
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **High Contrast Mode**: Enhanced visibility for users with visual impairments
- **Focus Management**: Clear focus indicators and logical tab order
- **Reduced Motion**: Respects user's motion preferences

### 📱 Responsive Design

- **Mobile-First**: Optimized for touch devices with appropriate target sizes
- **Flexible Layouts**: CSS Grid-based responsive design
- **Breakpoint System**: Tailored experiences for mobile, tablet, and desktop
- **Performance Optimized**: Fast loading on all devices

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (version 6 or higher)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/risadams/prompt-monster.git
   cd prompt-monster
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**

   ```
   http://localhost:3000
   ```

The app will automatically reload when you make changes to the source code.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder, ready for deployment.

---

## 🎯 Usage Guide

### Creating Your First Prompt

1. **Select a Role**: Choose from predefined roles (Product Owner, Developer, etc.) or select "Other" for custom roles
2. **Define the Task**: Describe what you want the AI to do
3. **Set Your Goal**: Explain what you want to achieve
4. **Add Context** (Optional): Provide background information
5. **Specify Details** (Optional): Add requirements, constraints, or formatting instructions
6. **Copy & Use**: Click "Copy to Clipboard" and paste into your AI application

### Using Templates

1. **Browse Templates**: Use the template library on the left sidebar
2. **Search**: Type keywords to find relevant templates
3. **Apply Template**: Click "Use Template" to populate the form with template values
4. **Customize**: Modify the applied template to fit your specific needs

### Example Workflow

```
Role: UX Designer
Task: Create a user persona
Goal: Better understand our target audience for a mobile banking app
Context: We're designing for millennials who prefer digital banking
Details: Include demographics, goals, frustrations, and preferred features
```

**Generated Prompt:**

```
Acting as a "UX Designer" I want to "Create a user persona" so that I can "Better understand our target audience for a mobile banking app".

Here is the context: Role Description: Designs user experiences and interfaces.
We're designing for millennials who prefer digital banking

Details: Include demographics, goals, frustrations, and preferred features
```

---

## 🏗️ Project Structure

```
prompt-monster/
├── public/                 # Static assets
│   ├── index.html         # HTML template
│   ├── logo.svg           # Monster logo
│   ├── manifest.json      # PWA manifest
│   └── robots.txt         # SEO robots file
├── src/                   # Source code
│   ├── components/        # React components
│   │   └── AppHeader.js   # Header component
│   ├── data/             # Application data
│   │   ├── Role.json     # Role definitions
│   │   └── Templates.json # Prompt templates
│   ├── App.js            # Main application component
│   ├── App.css           # Component styles
│   ├── index.css         # Base styles & CSS custom properties
│   ├── utils.css         # Utility classes
│   └── index.js          # Application entry point
└── README.md             # This file
```

---

## 🎨 Design System

### Color Palette

- **Primary Purple**: `#8B5CF6` - Main brand color, primary actions
- **Secondary Blue**: `#6366f1` - Secondary elements, links
- **Accent Green**: `#10b981` - Success states, validation
- **Neutral Grays**: Various shades for text and backgrounds

### Typography

- **UI Font**: [Inter](https://fonts.google.com/specimen/Inter) - Modern, readable sans-serif
- **Code Font**: [Fira Code](https://fonts.google.com/specimen/Fira+Code) - Monospace for generated prompts
- **Responsive Scaling**: Fluid typography that adapts to screen size

### Components

- **Cards**: Rounded corners with subtle shadows and hover effects
- **Buttons**: Gradient backgrounds with focus states and animations
- **Forms**: Enhanced inputs with validation states and clear labeling
- **Grid**: Responsive CSS Grid layout system

For detailed design documentation, see [DESIGN.md](DESIGN.md).

---

## 🔧 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Starts development server on <http://localhost:3000> |
| `npm run build` | Creates production build in `build/` folder |
| `npm test` | Runs test suite (when tests are added) |
| `npm run eject` | Ejects from Create React App (irreversible) |

### Adding New Templates

1. Edit `src/data/Templates.json`
2. Add a new template object with required fields:

   ```json
   {
     "id": "unique-id",
     "name": "Template Name",
     "role": "Role Name",
     "task": "Task description",
     "goal": "Goal description",
     "context": "Optional context",
     "details": "Optional details"
   }
   ```

### Adding New Roles

1. Edit `src/data/Role.json`
2. Add a new role object:

   ```json
   {
     "id": "ROLE_ID",
     "name": "Role Name",
     "description": "Role description for context"
   }
   ```

### Customizing Styles

The application uses CSS custom properties for consistent theming:

```css
:root {
  --monster-purple: #8B5CF6;
  --monster-blue: #6366f1;
  --monster-green: #10b981;
  /* Modify these values to customize the theme */
}
```

---

## ♿ Accessibility

Prompt Monster is built with accessibility as a core principle:

### WCAG 2.1 AA Compliance

- ✅ Color contrast ratios meet standards
- ✅ All interactive elements are keyboard accessible
- ✅ Screen readers can access all content
- ✅ Focus indicators are clearly visible
- ✅ Error messages are descriptive and helpful

### Testing Tools

- [WAVE Web Accessibility Evaluator](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse)

---

## 📱 Browser Support

Prompt Monster supports all modern browsers:

- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+

### Progressive Enhancement

- **JavaScript Required**: Core functionality requires JavaScript
- **Graceful Degradation**: Informative fallback for disabled JavaScript
- **Print Support**: Optimized styles for printing prompts

---

## 🚀 Deployment

### Recommended Platforms

- **[Vercel](https://vercel.com/)**: Zero-config deployment for React apps
- **[Netlify](https://netlify.com/)**: Continuous deployment from Git
- **[GitHub Pages](https://pages.github.com/)**: Free hosting for public repositories
- **[Firebase Hosting](https://firebase.google.com/docs/hosting)**: Google's hosting platform

### Quick Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy

### Environment Variables

No environment variables are required for basic functionality.

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly (including accessibility)
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Ensure accessibility standards are maintained
- Test on multiple devices and browsers
- Update documentation as needed
- Add appropriate comments for complex logic

### Areas for Contribution

- 🎨 New prompt templates
- 🔧 Feature enhancements
- 🐛 Bug fixes
- 📚 Documentation improvements
- ♿ Accessibility improvements
- 🌐 Internationalization (i18n)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Create React App**: For the solid foundation
- **Inter & Fira Code**: For beautiful typography
- **React Community**: For excellent documentation and tools
- **Accessibility Community**: For comprehensive guidelines and tools

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/risadams/prompt-monster/issues)
- **Discussions**: [GitHub Discussions](https://github.com/risadams/prompt-monster/discussions)
- **Author**: [Ris Adams](https://risadams.com)

---

<div align="center">

**Made with 💜 for the AI community**

*Prompt Monster - Where prompt engineering meets creativity!* 🎭

[⬆ Back to Top](#-prompt-monster)

</div>
