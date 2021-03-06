# Logbook Web App

## Getting Started

### Requirements

- Node.js 12.22 or above

### Installation

```bash
npm install
```

### Run local development server

```bash
npm run dev
```

## Architecture

Logbook is a decentralized static website, without SSR (server-side rendering).

### Tech Stack

We use React framework [Next.js](https://nextjs.org/) for the frontend development, with some out-of-box features:

- [TypeScript](https://nextjs.org/docs/basic-features/typescript)
- [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css) + [PostCSS](https://nextjs.org/docs/advanced-features/customizing-postcss-config)

Recommended Libraries:

- [Formik](https://formik.org/): form components
- [SVGR](https://react-svgr.com/docs/next/): SVG icon components

### Data Fetching

- [The Graph](https://thegraph.com/): indexing service to query on-chan application data
  - Logbook List
  - Logbook Details
  - ...
- Infura/Alchemy: provider to interact with on-chain data/contracts
  - Transfer Logbook
  - Publish a log
  - Read wallet balance
  - Resolve wallet ENS name
  - ...

### File Structure

```bash
src
├── components # all reusable components
│   ├── Button # component files in one folder
│   │   ├── styles.module.css # isolated styles
│   │   └── index.tsx
│   ├── Dialog
│   │   ├── Header # sub-components can be nesting
│   │   │   └── index.tsx
│   │   └── index.tsx
│   ├── Head
│   │   └── index.tsx
│   ├── Icon
│   │   └── index.tsx
│   ├── LogbookCard
│   │   └── index.tsx
│   └── index.tsx
├── enums # enums and contants
│   └── index.tsx
├── utils # global utilities
│   └── index.tsx
├── pages # all pages, import from `views` to avoid page components being compiled as pages
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx # homepage
│   └── logbook.tsx # logbook detail page
├── styles # global styles, imported in `_app.tsx`
│   ├── base.css
│   ├── reset.css
│   └── variables
│       ├── breakpoints.css
│       ├── colors.css
│       ├── spacing.css
│       └── typography.css
└── views # de facto page components used by `pages`
    ├── Homepage
    │   ├── index.tsx
    │   └── styles.module.css
    └── Logbook
        └── index.tsx
```

## Routing

- Homepage: `/`
- Library: `/library`
- Bookcase: `/bookcase?address=ADDRESS`
- Logbook: `/logbook?id=TOKEN_ID`

## Design System

The foundation of [Logbook Deisgn System](https://www.figma.com/file/Ffj9jWOJ8ag4wvApRD0HwZ/Logbook-2.0?node-id=1%3A30) is consisted of:

- Color
- Typography
- Layout
- Interaction
- Components

Responsive Principles:

- **Mobile-First**: write mobile-first styles, and use media queries to scale up to desktop
- **Relative Units**: use `rem` instead of `px`
- **DRY**: Using CSS variables to reduce your code (selectors, properties and media queries)
- **Pure CSS**: use CSS to style your responsive components, not JavaScript
- **Vector Images**: use SVG as icons

## Collaboration

### Environments

- **Development**: `main` branch, `.env.production`
- **Production**: `develop` branch, `.env.development`

### Gitflow

The default branch of [Logbook Repository](https://github.com/thematters/logbook) is `develop`. To start develop new feature, you should fork this branch as your local branch and create a [Pull Request](https://github.com/thematters/logbook/pulls) to the `develop` branch. After the PR is merged, the [GitHub Actions](#testing--deployment) will automatically deploy your changes to development environment.

### Naming Conventions

**JavaScript**

```tsx
// TypeScript type & enum
export type PascalCaseType {}
export enum PascalCaseEnum {}

// constants
export const CONSTANT_CASE = {}
```

**CSS**

```css
/* kebab-case for variables and mixins */
:root {
  --color-primary: #b32d55;
}

/* camelCase for component in CSS Modules */
.authButton {
  ...;
}
```

**Filename**

```bash
├── utils
│   └── api.ts # camelCase for non-component files
└── components
    └── AuthButton # PascalCase for component files
```

### UI Components

Based on Design System, UI components should follow the following principles:

- **Atomic**: the most basic UI components (`<Button>`, `<Icon>`) can't be broken down further
- **Reusable**: more complex components (`<LogbookCard>`) should be composed of other components
- **Stateless**: UI components stay in pure UI as functional components

## Testing && Deployment

We use GitHub Actions for the CI/CD pipeline.

- **Testing**: `.github/workflows/test.yml`:
- **Deployment**: `.github/workflows/deploy.yml`:

Besides, [Husky](https://github.com/typicode/husky) will run linting before you commit the code.
