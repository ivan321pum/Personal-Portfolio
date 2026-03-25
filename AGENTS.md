# AGENTS.md - Portafolio Personal Astro Project

## Project Overview

This is a **personal portfolio website** built with **Astro 6** + **React 19** + **TypeScript**.

**Key Stack:**
- **Framework**: Astro 6.0.8 (static site generation with hybrid rendering)
- **Component Library**: React 19.2.4 (interactive components only)
- **Animations**: Framer Motion 12.34.3 (React motion library)
- **Styling**: Scoped Astro styles + global CSS variables
- **Language**: TypeScript with Astro's strict config

## Architecture & Component Boundaries

### File Organization
```
src/
├── pages/          # Route endpoints (Astro files, auto-routed)
├── layouts/        # Reusable templates with <slot> injection
├── components/     # Reusable UI components (both .astro and .jsx)
└── assets/         # Static images & resources
```

### Design Pattern: Astro + React Hybrid

- **Astro Components** (`.astro`): Static-first, server-rendered, CSS scoped by default
  - Example: `BaseLayout.astro`, `Header.astro`, `Hero.astro`, `Navigation.astro`
  - Use `client:load` directive to hydrate React components on page load
  
- **React Components** (`.jsx`): Client-side interactivity with animations
  - Example: `AnimatedHero.jsx`, `AnimatedAboutMe.jsx`
  - Import directly into Astro components with `client:load` for immediate hydration
  - Use Framer Motion for animations (apply to `motion.*` elements)

### Key Data Flow

1. `pages/index.astro` → imports `BaseLayout` → wraps content in template
2. `BaseLayout.astro` → renders `Header`, then injects page content via `<slot/>`
3. `Hero.astro` → imports `AnimatedHero.jsx` component
4. `AnimatedHero.jsx` → uses Framer Motion to animate hero title/subtitle

**Global CSS Variables** (defined in `BaseLayout.astro`):
```css
--color-primario: #D72638      /* Primary red */
--color-secundario: #104547    /* Dark teal */
--color-fondo-secundario: #FF9F1C /* Orange header */
--color-fondo: #f4f4f4         /* Light gray */
--color-texto: #333333         /* Dark text */
```

## Critical Development Workflows

### Build Commands
- `npm run dev` or `npm start` → Dev server (Astro hot reload)
- `npm run build` → Production build (static output to `dist/`)
- `npm run preview` → Preview production build locally

### Project Root Configuration Files
- `astro.config.mjs` → Main config; React integration enabled
- `tsconfig.json` → Extends `astro/tsconfigs/strict`; JSX mode set to `react-jsx`
- `package.json` → Dependency management

## Project-Specific Conventions & Patterns

### Naming Conventions
- Astro components: PascalCase (e.g., `Hero.astro`)
- React animated components: Prefix with "Animated" (e.g., `AnimatedHero.jsx`)
- CSS classes: Lowercase with hyphens (e.g., `hero-title`, `profile-frame`)
- Astro styles with `:global()` wrapper for components that apply styles across elements

### Styling Approach
1. **Layout & container**: Global styles in `BaseLayout.astro` (`:global` blocks)
2. **Scoped component styles**: Each `.astro` component defines `<style>` blocks
3. **Color scheme**: Centralized CSS variables in `:root`
4. **Responsive**: Container max-width 1100px with 2rem padding

### Component Integration Pattern
```astro
---
import ReactComponent from "../components/AnimatedHero.jsx"
---
<section>
    <ReactComponent client:load></ReactComponent>
</section>
<style>
    :global(.component-class) { /* Styles from React component */ }
</style>
```

**Key Directives:**
- `client:load` → Hydrate immediately when page loads (used for animated components)
- `<slot/>` → Content injection point in layouts

## Integration Points & Dependencies

### External Dependencies
- `@astrojs/react@^5.0.1` → React integration adapter
- `framer-motion@^12.34.3` → Smooth animations (applied to React components)
- `react@^19.2.4` & `react-dom@^19.2.4` → React library

### Asset Management
- Images stored in `public/assets/images/` (referenced as `/assets/images/...`)
- Fonts: Google Fonts (Archivo) imported in `BaseLayout.astro`

## Common Development Tasks

### Adding a New Section
1. Create `.jsx` component in `src/components/` if animation needed (use Framer Motion)
2. Create `.astro` component wrapper in `src/components/` that imports React component
3. Add `client:load` directive to hydrate
4. Use global CSS variables for consistent colors

### Modifying the Header/Navigation
- Edit `src/components/Header.astro` or `Navigation.astro`
- Header uses flex layout with profile image (80px circle) + name + navigation
- Apply `:global()` wrapper to styles if they affect child React components

### Updating Colors
- Modify CSS variables in `BaseLayout.astro` `:root` selector
- All components reference these variables (e.g., `color: var(--color-primario)`)

## Important Notes

- **No build-time rendering of React**: React components only render on the client (via `client:load`)
- **TypeScript strict mode**: Follow Astro's strict TypeScript config
- **No API routes**: This is a static portfolio; consider adding separate backend if needed
- **Responsive design**: Main container uses max-width + padding; adjust breakpoints if needed

