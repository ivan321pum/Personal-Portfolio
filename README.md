# Iván Sevilla — Personal Portfolio

This repository contains the source code for my personal portfolio, published
at [ivansevilla.me](https://ivansevilla.me).

The project is a static, multilingual website focused on a fast, accessible,
responsive experience. It combines Astro's static rendering with React
components only where client-side interaction or animation is needed.

## Highlights

- Static site generation for fast delivery and reliable hosting.
- Spanish, English, Catalan, and Dutch routes.
- Responsive layout with a plain-text mobile hero and enhanced desktop
  interactions.
- Accessible theme and language controls with keyboard support and visible
  focus states.
- Album-inspired color themes.
- Contact form powered by Web3Forms.
- Optimized local font loading with Fontsource.
- Responsive custom cursor enabled only for suitable desktop pointers.
- Sitemap generation for search engines.
- GitHub Pages deployment through GitHub Actions.

## Technology stack

| Technology | Purpose |
| --- | --- |
| [Astro](https://astro.build/) | Main framework, routing, static site generation, and layouts |
| [React](https://react.dev/) | Interactive client components |
| [Framer Motion](https://www.framer.com/motion/) | Hero and scroll-based animations |
| [Motion](https://motion.dev/) | Reactive custom cursor effects |
| [Tailwind CSS](https://tailwindcss.com/) | Utility classes, responsive styles, and design tokens |
| [Fontsource](https://fontsource.org/) | Self-hosted variable Manrope font |
| [astro-icon](https://github.com/natemoo-re/astro-icon) | Material Design icons |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe `.ts` and `.tsx` components |
| [GitHub Actions](https://github.com/features/actions) | Automated build and GitHub Pages deployment |

Dependency versions are defined in `package.json` and locked in
`package-lock.json`.

## Project structure

```text
.
├── public/
│   └── assets/
│       ├── images/                 # Public images
│       └── videos/                 # Videos used in the portfolio
├── src/
│   ├── components/
│   │   ├── react/                  # Interactive React components
│   │   ├── AboutMe.astro           # About section
│   │   ├── Contact.astro           # Contact form
│   │   ├── DockLayout.astro        # Floating controls
│   │   ├── Header.astro            # Header and identity
│   │   ├── Hero.astro              # Introductory hero
│   │   ├── Navigation.astro        # Main and social navigation
│   │   ├── Projects.astro          # Project cards
│   │   └── ThemePicker.astro       # Theme selector
│   ├── data/
│   │   ├── projects.json           # Project content
│   │   └── themes.ts               # Theme definitions
│   ├── i18n/
│   │   └── ui.js                  # Translations
│   ├── layouts/
│   │   └── BaseLayout.astro        # Global HTML layout
│   ├── pages/                      # Localized routes
│   └── styles/
│       └── global.css              # Tailwind entry point and global styles
├── .github/workflows/              # Deployment workflow
├── astro.config.mjs                # Astro and Vite configuration
├── package.json                    # Scripts and dependencies
└── tsconfig.json                   # TypeScript configuration
```

## Local development

### Requirements

- Node.js 22 or a version compatible with the current Astro release.
- npm.
- Git.

### Setup

```bash
git clone https://github.com/ivan321pum/ivan321pum.github.io.git
cd ivan321pum.github.io
npm install
npm run dev
```

The development server is normally available at
`http://localhost:4321`.

### Available commands

```bash
# Start the development server
npm run dev

# Alias for the development server
npm start

# Build the production site
npm run build

# Preview the production build locally
npm run preview
```

The production build is generated in `dist/`.

## Rendering model

Astro renders the page structure, translations, navigation, forms, and most
content as static HTML. React is hydrated only for features that need browser
JavaScript:

- `client:load` initializes the custom cursor immediately on compatible
  desktop devices.
- `client:visible` delays below-the-fold interactive cards until they enter the
  viewport.
- The hero uses regular HTML headings on mobile, while the desktop version
  uses Framer Motion.

This keeps the default page payload small while preserving the enhanced
experience where it provides value.

## Performance, accessibility, and Lighthouse

The site is built to achieve Lighthouse scores close to 100 across
**Performance, Accessibility, Best Practices, and SEO**. The main practices
supporting that goal are:

- Static HTML output through Astro.
- Local font delivery through Fontsource instead of a runtime Google Fonts
  request.
- Responsive images and optimized static assets.
- Minimal client-side JavaScript and selective React hydration.
- No custom cursor on touch or coarse-pointer devices.
- Plain, non-animated hero text on mobile.
- Semantic links, buttons, form controls, labels, and accessible names.
- Keyboard-operable floating menus with `aria-expanded`, `aria-controls`,
  `aria-pressed`, and Escape-to-close behavior.
- Focus-visible styles for interactive controls.
- Canonical language routes and a generated sitemap.

Lighthouse results can vary with the browser, network, device emulation,
third-party services, and deployment environment. Run the audit against the
production URL or a production preview rather than the development server.

## Deployment

The site is deployed as a static build to GitHub Pages through the workflow in
`.github/workflows/`. A successful production build is the required baseline
before publishing:

```bash
npm run build
```

## License

The reusable **source code and website architecture** in this repository are
available under the [MIT License](./LICENSE). You may reuse, adapt, and
incorporate the architecture and code into other projects, provided that the
MIT copyright and permission notice is preserved.

The MIT License does **not** grant permission to reuse my personal content.
Unless a file states otherwise, all portfolio text, translations, personal
identity, photographs, videos, artwork, project descriptions, and branding
remain the property of Iván Sevilla Gómez and are **not** licensed for
redistribution or commercial reuse.

Third-party dependencies and assets remain subject to their own licenses.
