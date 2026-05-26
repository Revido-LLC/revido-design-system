# @revido/design-system Foundation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the monorepo, build the theming system, and ship the first 15 core components with tests and Storybook stories.

**Architecture:** npm workspaces monorepo with Turborepo orchestration. Components use React Aria for accessible behavior, styled with Tailwind CSS 4, themed via CSS variables. tsup builds ESM + CJS + types. Storybook 8 for dev/docs.

**Tech Stack:** React 18+, React Aria, Tailwind CSS 4, TypeScript, tsup, Turborepo, Storybook 8, Vitest, React Testing Library, Changesets

---

## File Structure

```
revido-design-system/
├── package.json                          # npm workspace root
├── turbo.json                            # Turborepo config
├── tsconfig.json                         # Base TS config
├── .gitignore
├── .prettierrc
├── .eslintrc.cjs
├── packages/
│   └── ui/
│       ├── package.json                  # @revido/design-system package
│       ├── tsconfig.json                 # Extends root tsconfig
│       ├── tsup.config.ts                # Build config
│       ├── vitest.config.ts              # Test config
│       ├── src/
│       │   ├── index.ts                  # Public barrel export
│       │   ├── theme/
│       │   │   ├── tokens.css            # CSS variable definitions (light)
│       │   │   ├── dark.css              # Dark mode variable overrides
│       │   │   └── preset.ts             # Tailwind preset
│       │   ├── utils/
│       │   │   └── cn.ts                 # Tailwind class merge utility
│       │   ├── components/
│       │   │   ├── button/
│       │   │   │   ├── button.tsx
│       │   │   │   ├── button.test.tsx
│       │   │   │   ├── button.stories.tsx
│       │   │   │   └── index.ts
│       │   │   ├── icon-button/
│       │   │   │   ├── icon-button.tsx
│       │   │   │   ├── icon-button.test.tsx
│       │   │   │   ├── icon-button.stories.tsx
│       │   │   │   └── index.ts
│       │   │   ├── badge/
│       │   │   │   ├── badge.tsx
│       │   │   │   ├── badge.test.tsx
│       │   │   │   ├── badge.stories.tsx
│       │   │   │   └── index.ts
│       │   │   ├── avatar/
│       │   │   │   ├── avatar.tsx
│       │   │   │   ├── avatar.test.tsx
│       │   │   │   ├── avatar.stories.tsx
│       │   │   │   └── index.ts
│       │   │   ├── separator/
│       │   │   │   ├── separator.tsx
│       │   │   │   ├── separator.test.tsx
│       │   │   │   ├── separator.stories.tsx
│       │   │   │   └── index.ts
│       │   │   ├── input/
│       │   │   │   ├── input.tsx
│       │   │   │   ├── input.test.tsx
│       │   │   │   ├── input.stories.tsx
│       │   │   │   └── index.ts
│       │   │   ├── textarea/
│       │   │   │   ├── textarea.tsx
│       │   │   │   ├── textarea.test.tsx
│       │   │   │   ├── textarea.stories.tsx
│       │   │   │   └── index.ts
│       │   │   ├── checkbox/
│       │   │   │   ├── checkbox.tsx
│       │   │   │   ├── checkbox.test.tsx
│       │   │   │   ├── checkbox.stories.tsx
│       │   │   │   └── index.ts
│       │   │   ├── switch/
│       │   │   │   ├── switch.tsx
│       │   │   │   ├── switch.test.tsx
│       │   │   │   ├── switch.stories.tsx
│       │   │   │   └── index.ts
│       │   │   ├── select/
│       │   │   │   ├── select.tsx
│       │   │   │   ├── select.test.tsx
│       │   │   │   ├── select.stories.tsx
│       │   │   │   └── index.ts
│       │   │   ├── dialog/
│       │   │   │   ├── dialog.tsx
│       │   │   │   ├── dialog.test.tsx
│       │   │   │   ├── dialog.stories.tsx
│       │   │   │   └── index.ts
│       │   │   ├── tooltip/
│       │   │   │   ├── tooltip.tsx
│       │   │   │   ├── tooltip.test.tsx
│       │   │   │   ├── tooltip.stories.tsx
│       │   │   │   └── index.ts
│       │   │   ├── card/
│       │   │   │   ├── card.tsx
│       │   │   │   ├── card.test.tsx
│       │   │   │   ├── card.stories.tsx
│       │   │   │   └── index.ts
│       │   │   ├── heading/
│       │   │   │   ├── heading.tsx
│       │   │   │   ├── heading.test.tsx
│       │   │   │   ├── heading.stories.tsx
│       │   │   │   └── index.ts
│       │   │   └── text/
│       │   │       ├── text.tsx
│       │   │       ├── text.test.tsx
│       │   │       ├── text.stories.tsx
│       │   │       └── index.ts
│       │   └── types/
│       │       └── common.ts             # Shared types (Size, Variant, etc.)
├── apps/
│   └── docs/
│       ├── package.json                  # Storybook app
│       ├── .storybook/
│       │   ├── main.ts                   # Storybook config
│       │   └── preview.ts               # Global decorators, theme CSS import
│       └── tsconfig.json
```

---

## Task 1: Initialize Git Repository

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: Initialize git**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system
git init
```

- [ ] **Step 2: Create .gitignore**

```gitignore
node_modules/
dist/
.turbo/
*.tsbuildinfo
storybook-static/
.DS_Store
```

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: initialize repository"
```

---

## Task 2: Scaffold Monorepo Root

**Files:**
- Create: `package.json`
- Create: `turbo.json`
- Create: `tsconfig.json`
- Create: `.prettierrc`
- Create: `.eslintrc.cjs`

- [ ] **Step 1: Create root package.json**

```json
{
  "name": "revido-design-system",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "test": "turbo test",
    "lint": "turbo lint",
    "format": "prettier --write .",
    "release": "turbo build && changeset publish"
  },
  "devDependencies": {
    "@changesets/cli": "^2.27.0",
    "eslint": "^8.57.0",
    "prettier": "^3.3.0",
    "turbo": "^2.3.0",
    "typescript": "^5.6.0"
  },
  "engines": {
    "node": ">=18"
  }
}
```

- [ ] **Step 2: Create turbo.json**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "lint": {}
  }
}
```

- [ ] **Step 3: Create tsconfig.json (base config)**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 4: Create .prettierrc**

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "printWidth": 100
}
```

- [ ] **Step 5: Create .eslintrc.cjs**

```js
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  ignorePatterns: ['dist/', 'node_modules/', 'storybook-static/'],
}
```

- [ ] **Step 6: Commit**

```bash
git add package.json turbo.json tsconfig.json .prettierrc .eslintrc.cjs
git commit -m "chore: scaffold monorepo root with npm workspaces and turborepo"
```

---

## Task 3: Scaffold UI Package

**Files:**
- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`
- Create: `packages/ui/tsup.config.ts`
- Create: `packages/ui/vitest.config.ts`
- Create: `packages/ui/src/index.ts`
- Create: `packages/ui/src/types/common.ts`
- Create: `packages/ui/src/utils/cn.ts`

- [ ] **Step 1: Create packages/ui/package.json**

```json
{
  "name": "@revido/design-system",
  "version": "0.0.1",
  "description": "Accessible, themeable React component library by Revido",
  "license": "MIT",
  "main": "./dist/cjs/index.js",
  "module": "./dist/esm/index.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js",
      "types": "./dist/types/index.d.ts"
    },
    "./styles.css": "./dist/styles.css",
    "./tailwind": {
      "import": "./dist/esm/theme/preset.js",
      "require": "./dist/cjs/theme/preset.js",
      "types": "./dist/types/theme/preset.d.ts"
    }
  },
  "files": ["dist"],
  "sideEffects": ["*.css"],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint src/ --ext .ts,.tsx"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0",
    "tailwindcss": ">=4.0.0"
  },
  "dependencies": {
    "react-aria": "^3.35.0",
    "react-stately": "^3.33.0",
    "tailwind-merge": "^2.5.0",
    "clsx": "^2.1.0"
  },
  "devDependencies": {
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.6.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "jsdom": "^25.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "tsup": "^8.3.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: Create packages/ui/tsconfig.json**

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create packages/ui/tsup.config.ts**

```ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/theme/preset.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  outDir: 'dist',
  splitting: true,
  treeshake: true,
  clean: true,
  external: ['react', 'react-dom', 'tailwindcss'],
})
```

- [ ] **Step 4: Create packages/ui/vitest.config.ts**

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

- [ ] **Step 5: Create packages/ui/src/test-setup.ts**

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 6: Create packages/ui/src/types/common.ts**

These are shared types used across all components for consistent API.

```ts
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type Variant = 'solid' | 'outline' | 'ghost' | 'soft' | 'link'

export type ColorScheme =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'muted'
```

- [ ] **Step 7: Create packages/ui/src/utils/cn.ts**

Utility to merge Tailwind classes safely, avoiding conflicts like `px-4 px-2`.

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 8: Create packages/ui/src/index.ts (empty barrel for now)**

```ts
export { cn } from './utils/cn'
export type { Size, Variant, ColorScheme } from './types/common'
```

- [ ] **Step 9: Install dependencies and verify build**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system
npm install
cd packages/ui
npx tsup
```

Expected: Build succeeds, `dist/` folder created with ESM, CJS, and type files.

- [ ] **Step 10: Commit**

```bash
git add packages/ui/
git commit -m "chore: scaffold @revido/design-system package with tsup build"
```

---

## Task 4: Build Theming System

**Files:**
- Create: `packages/ui/src/theme/tokens.css`
- Create: `packages/ui/src/theme/dark.css`
- Create: `packages/ui/src/theme/preset.ts`

- [ ] **Step 1: Create packages/ui/src/theme/tokens.css**

Design tokens as CSS variables, inspired by Untitled UI's visual language.

```css
:root {
  /* Primary - Untitled UI uses a clean indigo/blue */
  --rds-color-primary-25: #f5f8ff;
  --rds-color-primary-50: #eef4ff;
  --rds-color-primary-100: #d1e0ff;
  --rds-color-primary-200: #b2ccff;
  --rds-color-primary-300: #84adff;
  --rds-color-primary-400: #528bff;
  --rds-color-primary-500: #2970ff;
  --rds-color-primary-600: #155eef;
  --rds-color-primary-700: #004eeb;
  --rds-color-primary-800: #0040c1;
  --rds-color-primary-900: #00359e;
  --rds-color-primary-950: #002266;

  /* Secondary - Neutral gray */
  --rds-color-secondary-25: #fcfcfd;
  --rds-color-secondary-50: #f9fafb;
  --rds-color-secondary-100: #f2f4f7;
  --rds-color-secondary-200: #eaecf0;
  --rds-color-secondary-300: #d0d5dd;
  --rds-color-secondary-400: #98a2b3;
  --rds-color-secondary-500: #667085;
  --rds-color-secondary-600: #475467;
  --rds-color-secondary-700: #344054;
  --rds-color-secondary-800: #182230;
  --rds-color-secondary-900: #101828;
  --rds-color-secondary-950: #0c111d;

  /* Destructive - Red */
  --rds-color-destructive-25: #fffbfa;
  --rds-color-destructive-50: #fef3f2;
  --rds-color-destructive-100: #fee4e2;
  --rds-color-destructive-200: #fecdca;
  --rds-color-destructive-300: #fda29b;
  --rds-color-destructive-400: #f97066;
  --rds-color-destructive-500: #f04438;
  --rds-color-destructive-600: #d92d20;
  --rds-color-destructive-700: #b42318;
  --rds-color-destructive-800: #912018;
  --rds-color-destructive-900: #7a271a;
  --rds-color-destructive-950: #55160c;

  /* Success - Green */
  --rds-color-success-25: #f6fef9;
  --rds-color-success-50: #ecfdf3;
  --rds-color-success-100: #dcfae6;
  --rds-color-success-200: #abefc6;
  --rds-color-success-300: #75e0a7;
  --rds-color-success-400: #47cd89;
  --rds-color-success-500: #17b26a;
  --rds-color-success-600: #079455;
  --rds-color-success-700: #067647;
  --rds-color-success-800: #085d3a;
  --rds-color-success-900: #074d31;
  --rds-color-success-950: #053321;

  /* Warning - Yellow/Amber */
  --rds-color-warning-25: #fffcf5;
  --rds-color-warning-50: #fffaeb;
  --rds-color-warning-100: #fef0c7;
  --rds-color-warning-200: #fedf89;
  --rds-color-warning-300: #fec84b;
  --rds-color-warning-400: #fdb022;
  --rds-color-warning-500: #f79009;
  --rds-color-warning-600: #dc6803;
  --rds-color-warning-700: #b54708;
  --rds-color-warning-800: #93370d;
  --rds-color-warning-900: #7a2e0e;
  --rds-color-warning-950: #4e1d09;

  /* Background and foreground */
  --rds-color-background: #ffffff;
  --rds-color-foreground: #101828;
  --rds-color-muted: #f9fafb;
  --rds-color-muted-foreground: #667085;
  --rds-color-border: #eaecf0;
  --rds-color-ring: #2970ff;
  --rds-color-input: #d0d5dd;

  /* Typography */
  --rds-font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --rds-font-mono: 'JetBrains Mono', ui-monospace, monospace;
  --rds-font-size-xs: 0.75rem;
  --rds-font-size-sm: 0.875rem;
  --rds-font-size-md: 1rem;
  --rds-font-size-lg: 1.125rem;
  --rds-font-size-xl: 1.25rem;
  --rds-font-size-2xl: 1.5rem;
  --rds-font-size-3xl: 1.875rem;
  --rds-font-size-4xl: 2.25rem;
  --rds-font-weight-normal: 400;
  --rds-font-weight-medium: 500;
  --rds-font-weight-semibold: 600;
  --rds-font-weight-bold: 700;
  --rds-line-height-tight: 1.25;
  --rds-line-height-normal: 1.5;
  --rds-line-height-relaxed: 1.75;

  /* Spacing */
  --rds-spacing-0: 0;
  --rds-spacing-0-5: 0.125rem;
  --rds-spacing-1: 0.25rem;
  --rds-spacing-1-5: 0.375rem;
  --rds-spacing-2: 0.5rem;
  --rds-spacing-2-5: 0.625rem;
  --rds-spacing-3: 0.75rem;
  --rds-spacing-3-5: 0.875rem;
  --rds-spacing-4: 1rem;
  --rds-spacing-5: 1.25rem;
  --rds-spacing-6: 1.5rem;
  --rds-spacing-8: 2rem;
  --rds-spacing-10: 2.5rem;
  --rds-spacing-12: 3rem;
  --rds-spacing-16: 4rem;

  /* Radius */
  --rds-radius-none: 0;
  --rds-radius-sm: 0.25rem;
  --rds-radius-md: 0.5rem;
  --rds-radius-lg: 0.75rem;
  --rds-radius-xl: 1rem;
  --rds-radius-2xl: 1.5rem;
  --rds-radius-full: 9999px;

  /* Shadows */
  --rds-shadow-xs: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
  --rds-shadow-sm: 0 1px 3px 0 rgba(16, 24, 40, 0.1), 0 1px 2px -1px rgba(16, 24, 40, 0.1);
  --rds-shadow-md: 0 4px 8px -2px rgba(16, 24, 40, 0.1), 0 2px 4px -2px rgba(16, 24, 40, 0.06);
  --rds-shadow-lg: 0 12px 16px -4px rgba(16, 24, 40, 0.08), 0 4px 6px -2px rgba(16, 24, 40, 0.03);
  --rds-shadow-xl: 0 20px 24px -4px rgba(16, 24, 40, 0.08), 0 8px 8px -4px rgba(16, 24, 40, 0.03);
  --rds-shadow-2xl: 0 24px 48px -12px rgba(16, 24, 40, 0.18);
}
```

- [ ] **Step 2: Create packages/ui/src/theme/dark.css**

```css
.dark,
[data-theme='dark'] {
  --rds-color-primary-25: #002266;
  --rds-color-primary-50: #00359e;
  --rds-color-primary-100: #0040c1;
  --rds-color-primary-200: #004eeb;
  --rds-color-primary-300: #155eef;
  --rds-color-primary-400: #2970ff;
  --rds-color-primary-500: #528bff;
  --rds-color-primary-600: #84adff;
  --rds-color-primary-700: #b2ccff;
  --rds-color-primary-800: #d1e0ff;
  --rds-color-primary-900: #eef4ff;
  --rds-color-primary-950: #f5f8ff;

  --rds-color-secondary-25: #0c111d;
  --rds-color-secondary-50: #101828;
  --rds-color-secondary-100: #182230;
  --rds-color-secondary-200: #344054;
  --rds-color-secondary-300: #475467;
  --rds-color-secondary-400: #667085;
  --rds-color-secondary-500: #98a2b3;
  --rds-color-secondary-600: #d0d5dd;
  --rds-color-secondary-700: #eaecf0;
  --rds-color-secondary-800: #f2f4f7;
  --rds-color-secondary-900: #f9fafb;
  --rds-color-secondary-950: #fcfcfd;

  --rds-color-destructive-25: #55160c;
  --rds-color-destructive-50: #7a271a;
  --rds-color-destructive-100: #912018;
  --rds-color-destructive-200: #b42318;
  --rds-color-destructive-300: #d92d20;
  --rds-color-destructive-400: #f04438;
  --rds-color-destructive-500: #f97066;
  --rds-color-destructive-600: #fda29b;
  --rds-color-destructive-700: #fecdca;
  --rds-color-destructive-800: #fee4e2;
  --rds-color-destructive-900: #fef3f2;
  --rds-color-destructive-950: #fffbfa;

  --rds-color-success-25: #053321;
  --rds-color-success-50: #074d31;
  --rds-color-success-100: #085d3a;
  --rds-color-success-200: #067647;
  --rds-color-success-300: #079455;
  --rds-color-success-400: #17b26a;
  --rds-color-success-500: #47cd89;
  --rds-color-success-600: #75e0a7;
  --rds-color-success-700: #abefc6;
  --rds-color-success-800: #dcfae6;
  --rds-color-success-900: #ecfdf3;
  --rds-color-success-950: #f6fef9;

  --rds-color-warning-25: #4e1d09;
  --rds-color-warning-50: #7a2e0e;
  --rds-color-warning-100: #93370d;
  --rds-color-warning-200: #b54708;
  --rds-color-warning-300: #dc6803;
  --rds-color-warning-400: #f79009;
  --rds-color-warning-500: #fdb022;
  --rds-color-warning-600: #fec84b;
  --rds-color-warning-700: #fedf89;
  --rds-color-warning-800: #fef0c7;
  --rds-color-warning-900: #fffaeb;
  --rds-color-warning-950: #fffcf5;

  --rds-color-background: #0c111d;
  --rds-color-foreground: #f9fafb;
  --rds-color-muted: #182230;
  --rds-color-muted-foreground: #98a2b3;
  --rds-color-border: #344054;
  --rds-color-ring: #528bff;
  --rds-color-input: #475467;

  --rds-shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --rds-shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4);
  --rds-shadow-md: 0 4px 8px -2px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3);
  --rds-shadow-lg: 0 12px 16px -4px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
  --rds-shadow-xl: 0 20px 24px -4px rgba(0, 0, 0, 0.4), 0 8px 8px -4px rgba(0, 0, 0, 0.3);
  --rds-shadow-2xl: 0 24px 48px -12px rgba(0, 0, 0, 0.5);
}
```

- [ ] **Step 3: Create packages/ui/src/theme/preset.ts**

This Tailwind preset maps CSS variables to Tailwind utility classes so consumers can use `bg-primary-500`, `text-destructive-600`, etc.

```ts
import type { Config } from 'tailwindcss'

function colorScale(name: string) {
  const shades = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  const scale: Record<string, string> = {}
  for (const shade of shades) {
    scale[shade] = `var(--rds-color-${name}-${shade})`
  }
  return scale
}

export function revido(): Partial<Config> {
  return {
    theme: {
      extend: {
        colors: {
          primary: colorScale('primary'),
          secondary: colorScale('secondary'),
          destructive: colorScale('destructive'),
          success: colorScale('success'),
          warning: colorScale('warning'),
          background: 'var(--rds-color-background)',
          foreground: 'var(--rds-color-foreground)',
          muted: {
            DEFAULT: 'var(--rds-color-muted)',
            foreground: 'var(--rds-color-muted-foreground)',
          },
          border: 'var(--rds-color-border)',
          ring: 'var(--rds-color-ring)',
          input: 'var(--rds-color-input)',
        },
        fontFamily: {
          sans: ['var(--rds-font-sans)'],
          mono: ['var(--rds-font-mono)'],
        },
        fontSize: {
          xs: 'var(--rds-font-size-xs)',
          sm: 'var(--rds-font-size-sm)',
          md: 'var(--rds-font-size-md)',
          lg: 'var(--rds-font-size-lg)',
          xl: 'var(--rds-font-size-xl)',
          '2xl': 'var(--rds-font-size-2xl)',
          '3xl': 'var(--rds-font-size-3xl)',
          '4xl': 'var(--rds-font-size-4xl)',
        },
        borderRadius: {
          none: 'var(--rds-radius-none)',
          sm: 'var(--rds-radius-sm)',
          md: 'var(--rds-radius-md)',
          lg: 'var(--rds-radius-lg)',
          xl: 'var(--rds-radius-xl)',
          '2xl': 'var(--rds-radius-2xl)',
          full: 'var(--rds-radius-full)',
        },
        boxShadow: {
          xs: 'var(--rds-shadow-xs)',
          sm: 'var(--rds-shadow-sm)',
          md: 'var(--rds-shadow-md)',
          lg: 'var(--rds-shadow-lg)',
          xl: 'var(--rds-shadow-xl)',
          '2xl': 'var(--rds-shadow-2xl)',
        },
      },
    },
  }
}
```

- [ ] **Step 4: Update tsup config to include CSS files**

Update `packages/ui/tsup.config.ts`:

```ts
import { defineConfig } from 'tsup'
import { copyFileSync, mkdirSync } from 'fs'

export default defineConfig({
  entry: ['src/index.ts', 'src/theme/preset.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  outDir: 'dist',
  splitting: true,
  treeshake: true,
  clean: true,
  external: ['react', 'react-dom', 'tailwindcss'],
  onSuccess: async () => {
    mkdirSync('dist', { recursive: true })
    copyFileSync('src/theme/tokens.css', 'dist/tokens.css')
    copyFileSync('src/theme/dark.css', 'dist/dark.css')

    const fs = await import('fs')
    const tokens = fs.readFileSync('src/theme/tokens.css', 'utf-8')
    const dark = fs.readFileSync('src/theme/dark.css', 'utf-8')
    fs.writeFileSync('dist/styles.css', `${tokens}\n${dark}`)
  },
})
```

- [ ] **Step 5: Build and verify CSS output**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx tsup
ls dist/styles.css
```

Expected: `dist/styles.css` exists and contains both light and dark theme variables.

- [ ] **Step 6: Commit**

```bash
git add packages/ui/src/theme/ packages/ui/tsup.config.ts
git commit -m "feat: add theming system with CSS variables and Tailwind preset"
```

---

## Task 5: Set Up Storybook

**Files:**
- Create: `apps/docs/package.json`
- Create: `apps/docs/.storybook/main.ts`
- Create: `apps/docs/.storybook/preview.ts`
- Create: `apps/docs/tsconfig.json`

- [ ] **Step 1: Create apps/docs/package.json**

```json
{
  "name": "@revido/docs",
  "private": true,
  "version": "0.0.1",
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "storybook build"
  },
  "dependencies": {
    "@revido/design-system": "*"
  },
  "devDependencies": {
    "@storybook/addon-essentials": "^8.4.0",
    "@storybook/addon-interactions": "^8.4.0",
    "@storybook/blocks": "^8.4.0",
    "@storybook/react": "^8.4.0",
    "@storybook/react-vite": "^8.4.0",
    "storybook": "^8.4.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0"
  }
}
```

- [ ] **Step 2: Create apps/docs/.storybook/main.ts**

```ts
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../../../packages/ui/src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
}

export default config
```

- [ ] **Step 3: Create apps/docs/.storybook/preview.ts**

```ts
import type { Preview } from '@storybook/react'
import '@revido/design-system/styles.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
```

- [ ] **Step 4: Create apps/docs/tsconfig.json**

```json
{
  "extends": "../../tsconfig.json",
  "include": [".storybook/**/*"]
}
```

- [ ] **Step 5: Install and verify Storybook starts**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system
npm install
cd apps/docs
npx storybook dev -p 6006 --no-open
```

Expected: Storybook starts on port 6006 (may show "no stories" which is fine — we haven't created any yet). Press Ctrl+C after verifying.

- [ ] **Step 6: Commit**

```bash
git add apps/docs/
git commit -m "chore: add storybook docs app"
```

---

## Task 6: Button Component

**Files:**
- Create: `packages/ui/src/components/button/button.tsx`
- Create: `packages/ui/src/components/button/button.test.tsx`
- Create: `packages/ui/src/components/button/button.stories.tsx`
- Create: `packages/ui/src/components/button/index.ts`
- Modify: `packages/ui/src/index.ts`

- [ ] **Step 1: Write failing test**

Create `packages/ui/src/components/button/button.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './button'

describe('Button', () => {
  it('renders with text content', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const onClick = vi.fn()
    render(<Button onPress={onClick}>Click</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled when isDisabled is true', () => {
    render(<Button isDisabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies variant classes', () => {
    const { container } = render(<Button variant="outline">Outline</Button>)
    expect(container.firstChild).toHaveClass('border')
  })

  it('applies size classes', () => {
    const { container } = render(<Button size="sm">Small</Button>)
    expect(container.firstChild).toHaveClass('text-sm')
  })
})
```

- [ ] **Step 2: Add @testing-library/user-event to devDependencies**

In `packages/ui/package.json`, add to devDependencies:

```json
"@testing-library/user-event": "^14.5.0"
```

Then run `npm install` from the workspace root.

- [ ] **Step 3: Run test to verify it fails**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/button/button.test.tsx
```

Expected: FAIL — cannot find module `./button`

- [ ] **Step 4: Implement Button**

Create `packages/ui/src/components/button/button.tsx`:

```tsx
import { forwardRef } from 'react'
import { useButton, mergeProps, useFocusRing } from 'react-aria'
import { useRef } from 'react'
import { cn } from '../../utils/cn'
import type { Size, Variant, ColorScheme } from '../../types/common'

export interface ButtonProps {
  children: React.ReactNode
  variant?: Variant
  size?: Size
  colorScheme?: ColorScheme
  isDisabled?: boolean
  isLoading?: boolean
  onPress?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

const variantStyles: Record<Variant, string> = {
  solid:
    'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
  outline:
    'border border-secondary-300 bg-white text-secondary-700 hover:bg-secondary-50 active:bg-secondary-100',
  ghost:
    'text-secondary-700 hover:bg-secondary-50 active:bg-secondary-100',
  soft:
    'bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-200',
  link:
    'text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline',
}

const sizeStyles: Record<Size, string> = {
  xs: 'h-8 px-3 text-xs gap-1.5 rounded-md',
  sm: 'h-9 px-3.5 text-sm gap-1.5 rounded-md',
  md: 'h-10 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-11 px-5 text-md gap-2 rounded-lg',
  xl: 'h-12 px-6 text-md gap-2.5 rounded-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'solid',
      size = 'md',
      isDisabled = false,
      isLoading = false,
      onPress,
      type = 'button',
      className,
      ...rest
    },
    forwardedRef,
  ) => {
    const internalRef = useRef<HTMLButtonElement>(null)
    const ref = (forwardedRef as React.RefObject<HTMLButtonElement>) ?? internalRef

    const { buttonProps } = useButton(
      {
        isDisabled: isDisabled || isLoading,
        onPress,
        type,
        ...rest,
      },
      ref,
    )

    const { focusProps, isFocusVisible } = useFocusRing()

    return (
      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors',
          'disabled:pointer-events-none disabled:opacity-50',
          isFocusVisible && 'outline-none ring-2 ring-ring ring-offset-2',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
      >
        {isLoading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            {children}
          </>
        ) : (
          children
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
```

- [ ] **Step 5: Create barrel export**

Create `packages/ui/src/components/button/index.ts`:

```ts
export { Button, type ButtonProps } from './button'
```

- [ ] **Step 6: Add to package barrel export**

Update `packages/ui/src/index.ts`:

```ts
export { cn } from './utils/cn'
export type { Size, Variant, ColorScheme } from './types/common'

export { Button, type ButtonProps } from './components/button'
```

- [ ] **Step 7: Run tests to verify they pass**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/button/button.test.tsx
```

Expected: All 5 tests PASS.

- [ ] **Step 8: Write Storybook story**

Create `packages/ui/src/components/button/button.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'General/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'soft', 'link'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    isDisabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    size: 'md',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
    size: 'md',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
    size: 'md',
  },
}

export const Loading: Story = {
  args: {
    children: 'Loading',
    isLoading: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    isDisabled: true,
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="md">MD</Button>
      <Button size="lg">LG</Button>
      <Button size="xl">XL</Button>
    </div>
  ),
}
```

- [ ] **Step 9: Commit**

```bash
git add packages/ui/src/components/button/ packages/ui/src/index.ts packages/ui/package.json
git commit -m "feat: add Button component with variants, sizes, loading state"
```

---

## Task 7: Badge Component

**Files:**
- Create: `packages/ui/src/components/badge/badge.tsx`
- Create: `packages/ui/src/components/badge/badge.test.tsx`
- Create: `packages/ui/src/components/badge/badge.stories.tsx`
- Create: `packages/ui/src/components/badge/index.ts`
- Modify: `packages/ui/src/index.ts`

- [ ] **Step 1: Write failing test**

Create `packages/ui/src/components/badge/badge.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Badge } from './badge'

describe('Badge', () => {
  it('renders with text content', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>)
    expect(container.firstChild).toHaveClass('border')
  })

  it('applies size classes', () => {
    const { container } = render(<Badge size="lg">Large</Badge>)
    expect(container.firstChild).toHaveClass('text-sm')
  })

  it('applies colorScheme classes', () => {
    const { container } = render(<Badge colorScheme="success">Done</Badge>)
    expect(container.firstChild).toHaveClass('bg-success-50')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/badge/badge.test.tsx
```

Expected: FAIL — cannot find module `./badge`

- [ ] **Step 3: Implement Badge**

Create `packages/ui/src/components/badge/badge.tsx`:

```tsx
import { forwardRef } from 'react'
import { cn } from '../../utils/cn'
import type { ColorScheme } from '../../types/common'

type BadgeVariant = 'solid' | 'outline' | 'soft'
type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  colorScheme?: ColorScheme
  className?: string
}

const colorSchemeStyles: Record<ColorScheme, Record<BadgeVariant, string>> = {
  primary: {
    solid: 'bg-primary-600 text-white',
    outline: 'border border-primary-300 text-primary-700',
    soft: 'bg-primary-50 text-primary-700',
  },
  secondary: {
    solid: 'bg-secondary-600 text-white',
    outline: 'border border-secondary-300 text-secondary-700',
    soft: 'bg-secondary-50 text-secondary-700',
  },
  destructive: {
    solid: 'bg-destructive-600 text-white',
    outline: 'border border-destructive-300 text-destructive-700',
    soft: 'bg-destructive-50 text-destructive-700',
  },
  success: {
    solid: 'bg-success-600 text-white',
    outline: 'border border-success-300 text-success-700',
    soft: 'bg-success-50 text-success-700',
  },
  warning: {
    solid: 'bg-warning-600 text-white',
    outline: 'border border-warning-300 text-warning-700',
    soft: 'bg-warning-50 text-warning-700',
  },
  muted: {
    solid: 'bg-secondary-500 text-white',
    outline: 'border border-secondary-200 text-secondary-500',
    soft: 'bg-secondary-50 text-secondary-500',
  },
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'soft', size = 'md', colorScheme = 'primary', className }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium rounded-full',
          colorSchemeStyles[colorScheme][variant],
          sizeStyles[size],
          className,
        )}
      >
        {children}
      </span>
    )
  },
)

Badge.displayName = 'Badge'
```

- [ ] **Step 4: Create barrel export**

Create `packages/ui/src/components/badge/index.ts`:

```ts
export { Badge, type BadgeProps } from './badge'
```

- [ ] **Step 5: Add to package barrel export**

Add to `packages/ui/src/index.ts`:

```ts
export { Badge, type BadgeProps } from './components/badge'
```

- [ ] **Step 6: Run tests**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/badge/badge.test.tsx
```

Expected: All 4 tests PASS.

- [ ] **Step 7: Write story**

Create `packages/ui/src/components/badge/badge.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'General/Badge',
  component: Badge,
  argTypes: {
    variant: { control: 'select', options: ['solid', 'outline', 'soft'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'success', 'warning', 'muted'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: { children: 'Badge', colorScheme: 'primary', variant: 'soft' },
}

export const AllColorSchemes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge colorScheme="primary">Primary</Badge>
      <Badge colorScheme="secondary">Secondary</Badge>
      <Badge colorScheme="success">Success</Badge>
      <Badge colorScheme="warning">Warning</Badge>
      <Badge colorScheme="destructive">Destructive</Badge>
      <Badge colorScheme="muted">Muted</Badge>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="soft">Soft</Badge>
    </div>
  ),
}
```

- [ ] **Step 8: Commit**

```bash
git add packages/ui/src/components/badge/ packages/ui/src/index.ts
git commit -m "feat: add Badge component with color schemes and variants"
```

---

## Task 8: Avatar Component

**Files:**
- Create: `packages/ui/src/components/avatar/avatar.tsx`
- Create: `packages/ui/src/components/avatar/avatar.test.tsx`
- Create: `packages/ui/src/components/avatar/avatar.stories.tsx`
- Create: `packages/ui/src/components/avatar/index.ts`
- Modify: `packages/ui/src/index.ts`

- [ ] **Step 1: Write failing test**

Create `packages/ui/src/components/avatar/avatar.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Avatar } from './avatar'

describe('Avatar', () => {
  it('renders an image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User" />)
    expect(screen.getByRole('img', { name: 'User' })).toBeInTheDocument()
  })

  it('renders initials when no src is provided', () => {
    render(<Avatar alt="John Doe" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders single initial for one-word name', () => {
    render(<Avatar alt="John" />)
    expect(screen.getByText('J')).toBeInTheDocument()
  })

  it('applies size classes', () => {
    const { container } = render(<Avatar alt="User" size="lg" />)
    expect(container.firstChild).toHaveClass('h-12')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/avatar/avatar.test.tsx
```

Expected: FAIL

- [ ] **Step 3: Implement Avatar**

Create `packages/ui/src/components/avatar/avatar.tsx`:

```tsx
import { forwardRef, useState } from 'react'
import { cn } from '../../utils/cn'
import type { Size } from '../../types/common'

export interface AvatarProps {
  src?: string
  alt: string
  size?: Size
  className?: string
}

const sizeStyles: Record<Size, string> = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-md',
  xl: 'h-14 w-14 text-lg',
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, size = 'md', className }, ref) => {
    const [imgError, setImgError] = useState(false)
    const showImage = src && !imgError

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center rounded-full bg-secondary-100 overflow-hidden',
          sizeStyles[size],
          className,
        )}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="font-medium text-secondary-600">{getInitials(alt)}</span>
        )}
      </div>
    )
  },
)

Avatar.displayName = 'Avatar'
```

- [ ] **Step 4: Create barrel export**

Create `packages/ui/src/components/avatar/index.ts`:

```ts
export { Avatar, type AvatarProps } from './avatar'
```

- [ ] **Step 5: Add to package barrel export**

Add to `packages/ui/src/index.ts`:

```ts
export { Avatar, type AvatarProps } from './components/avatar'
```

- [ ] **Step 6: Run tests**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/avatar/avatar.test.tsx
```

Expected: All 4 tests PASS.

- [ ] **Step 7: Write story**

Create `packages/ui/src/components/avatar/avatar.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './avatar'

const meta: Meta<typeof Avatar> = {
  title: 'General/Avatar',
  component: Avatar,
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=revido',
    alt: 'Jane Doe',
    size: 'md',
  },
}

export const WithInitials: Story = {
  args: {
    alt: 'Jane Doe',
    size: 'md',
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Avatar alt="User" size="xs" />
      <Avatar alt="User" size="sm" />
      <Avatar alt="User" size="md" />
      <Avatar alt="User" size="lg" />
      <Avatar alt="User" size="xl" />
    </div>
  ),
}
```

- [ ] **Step 8: Commit**

```bash
git add packages/ui/src/components/avatar/ packages/ui/src/index.ts
git commit -m "feat: add Avatar component with image and initials fallback"
```

---

## Task 9: Separator Component

**Files:**
- Create: `packages/ui/src/components/separator/separator.tsx`
- Create: `packages/ui/src/components/separator/separator.test.tsx`
- Create: `packages/ui/src/components/separator/separator.stories.tsx`
- Create: `packages/ui/src/components/separator/index.ts`
- Modify: `packages/ui/src/index.ts`

- [ ] **Step 1: Write failing test**

Create `packages/ui/src/components/separator/separator.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Separator } from './separator'

describe('Separator', () => {
  it('renders a horizontal separator by default', () => {
    const { container } = render(<Separator />)
    expect(container.firstChild).toHaveAttribute('role', 'separator')
    expect(container.firstChild).toHaveClass('h-px')
  })

  it('renders a vertical separator', () => {
    const { container } = render(<Separator orientation="vertical" />)
    expect(container.firstChild).toHaveClass('w-px')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/separator/separator.test.tsx
```

Expected: FAIL

- [ ] **Step 3: Implement Separator**

Create `packages/ui/src/components/separator/separator.tsx`:

```tsx
import { forwardRef } from 'react'
import { useSeparator } from 'react-aria'
import { cn } from '../../utils/cn'

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = 'horizontal', className }, ref) => {
    const { separatorProps } = useSeparator({ orientation })

    return (
      <div
        {...separatorProps}
        ref={ref}
        className={cn(
          'shrink-0 bg-border',
          orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
          className,
        )}
      />
    )
  },
)

Separator.displayName = 'Separator'
```

- [ ] **Step 4: Create barrel export**

Create `packages/ui/src/components/separator/index.ts`:

```ts
export { Separator, type SeparatorProps } from './separator'
```

- [ ] **Step 5: Add to package barrel export**

Add to `packages/ui/src/index.ts`:

```ts
export { Separator, type SeparatorProps } from './components/separator'
```

- [ ] **Step 6: Run tests**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/separator/separator.test.tsx
```

Expected: All 2 tests PASS.

- [ ] **Step 7: Write story**

Create `packages/ui/src/components/separator/separator.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from './separator'

const meta: Meta<typeof Separator> = {
  title: 'General/Separator',
  component: Separator,
}

export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <p>Content above</p>
      <Separator />
      <p>Content below</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', height: '40px', alignItems: 'center' }}>
      <span>Left</span>
      <Separator orientation="vertical" />
      <span>Right</span>
    </div>
  ),
}
```

- [ ] **Step 8: Commit**

```bash
git add packages/ui/src/components/separator/ packages/ui/src/index.ts
git commit -m "feat: add Separator component with horizontal and vertical orientation"
```

---

## Task 10: Input Component

**Files:**
- Create: `packages/ui/src/components/input/input.tsx`
- Create: `packages/ui/src/components/input/input.test.tsx`
- Create: `packages/ui/src/components/input/input.stories.tsx`
- Create: `packages/ui/src/components/input/index.ts`
- Modify: `packages/ui/src/index.ts`

- [ ] **Step 1: Write failing test**

Create `packages/ui/src/components/input/input.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Input } from './input'

describe('Input', () => {
  it('renders with a label', () => {
    render(<Input label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    render(<Input label="Name" />)
    const input = screen.getByLabelText('Name')
    await userEvent.type(input, 'John')
    expect(input).toHaveValue('John')
  })

  it('shows error message', () => {
    render(<Input label="Email" errorMessage="Required field" isInvalid />)
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  it('shows description text', () => {
    render(<Input label="Email" description="We'll never share your email" />)
    expect(screen.getByText("We'll never share your email")).toBeInTheDocument()
  })

  it('is disabled when isDisabled is true', () => {
    render(<Input label="Email" isDisabled />)
    expect(screen.getByLabelText('Email')).toBeDisabled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/input/input.test.tsx
```

Expected: FAIL

- [ ] **Step 3: Implement Input**

Create `packages/ui/src/components/input/input.tsx`:

```tsx
import { forwardRef, useRef } from 'react'
import { useTextField } from 'react-aria'
import { cn } from '../../utils/cn'
import type { Size } from '../../types/common'

export interface InputProps {
  label: string
  description?: string
  errorMessage?: string
  isInvalid?: boolean
  isDisabled?: boolean
  isRequired?: boolean
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'search' | 'number'
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  size?: Size
  className?: string
}

const sizeStyles: Record<Size, string> = {
  xs: 'h-8 px-2.5 text-xs',
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-3.5 text-sm',
  lg: 'h-11 px-4 text-md',
  xl: 'h-12 px-4 text-md',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      description,
      errorMessage,
      isInvalid = false,
      isDisabled = false,
      isRequired = false,
      placeholder,
      type = 'text',
      value,
      defaultValue,
      onChange,
      size = 'md',
      className,
    },
    forwardedRef,
  ) => {
    const internalRef = useRef<HTMLInputElement>(null)
    const ref = (forwardedRef as React.RefObject<HTMLInputElement>) ?? internalRef

    const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
      {
        label,
        description,
        errorMessage,
        isInvalid,
        isDisabled,
        isRequired,
        placeholder,
        type,
        value,
        defaultValue,
        onChange,
      },
      ref,
    )

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        <label
          {...labelProps}
          className="text-sm font-medium text-foreground"
        >
          {label}
          {isRequired && <span className="text-destructive-500 ml-0.5">*</span>}
        </label>
        <input
          {...inputProps}
          ref={ref}
          className={cn(
            'w-full rounded-lg border bg-white text-foreground placeholder:text-muted-foreground',
            'transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary-300',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isInvalid
              ? 'border-destructive-300 focus:ring-destructive-500'
              : 'border-secondary-300',
            sizeStyles[size],
          )}
        />
        {description && !isInvalid && (
          <p {...descriptionProps} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
        {isInvalid && errorMessage && (
          <p {...errorMessageProps} className="text-sm text-destructive-500">
            {errorMessage}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
```

- [ ] **Step 4: Create barrel export**

Create `packages/ui/src/components/input/index.ts`:

```ts
export { Input, type InputProps } from './input'
```

- [ ] **Step 5: Add to package barrel export**

Add to `packages/ui/src/index.ts`:

```ts
export { Input, type InputProps } from './components/input'
```

- [ ] **Step 6: Run tests**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/input/input.test.tsx
```

Expected: All 5 tests PASS.

- [ ] **Step 7: Write story**

Create `packages/ui/src/components/input/input.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    type: { control: 'select', options: ['text', 'email', 'password', 'url', 'tel', 'search', 'number'] },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    description: "We'll never share your email with anyone else.",
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    isInvalid: true,
    errorMessage: 'Please enter a valid email address.',
  },
}

export const Required: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    isRequired: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    isDisabled: true,
  },
}
```

- [ ] **Step 8: Commit**

```bash
git add packages/ui/src/components/input/ packages/ui/src/index.ts
git commit -m "feat: add Input component with label, description, validation"
```

---

## Task 11: Textarea Component

**Files:**
- Create: `packages/ui/src/components/textarea/textarea.tsx`
- Create: `packages/ui/src/components/textarea/textarea.test.tsx`
- Create: `packages/ui/src/components/textarea/textarea.stories.tsx`
- Create: `packages/ui/src/components/textarea/index.ts`
- Modify: `packages/ui/src/index.ts`

- [ ] **Step 1: Write failing test**

Create `packages/ui/src/components/textarea/textarea.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Textarea } from './textarea'

describe('Textarea', () => {
  it('renders with a label', () => {
    render(<Textarea label="Message" />)
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    render(<Textarea label="Message" />)
    const textarea = screen.getByLabelText('Message')
    await userEvent.type(textarea, 'Hello world')
    expect(textarea).toHaveValue('Hello world')
  })

  it('shows error message', () => {
    render(<Textarea label="Message" errorMessage="Required" isInvalid />)
    expect(screen.getByText('Required')).toBeInTheDocument()
  })

  it('is disabled when isDisabled is true', () => {
    render(<Textarea label="Message" isDisabled />)
    expect(screen.getByLabelText('Message')).toBeDisabled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/textarea/textarea.test.tsx
```

Expected: FAIL

- [ ] **Step 3: Implement Textarea**

Create `packages/ui/src/components/textarea/textarea.tsx`:

```tsx
import { forwardRef, useRef } from 'react'
import { useTextField } from 'react-aria'
import { cn } from '../../utils/cn'

export interface TextareaProps {
  label: string
  description?: string
  errorMessage?: string
  isInvalid?: boolean
  isDisabled?: boolean
  isRequired?: boolean
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  rows?: number
  className?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      description,
      errorMessage,
      isInvalid = false,
      isDisabled = false,
      isRequired = false,
      placeholder,
      value,
      defaultValue,
      onChange,
      rows = 3,
      className,
    },
    forwardedRef,
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null)
    const ref = (forwardedRef as React.RefObject<HTMLTextAreaElement>) ?? internalRef

    const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
      {
        label,
        description,
        errorMessage,
        isInvalid,
        isDisabled,
        isRequired,
        placeholder,
        value,
        defaultValue,
        onChange,
        inputElementType: 'textarea',
      },
      ref,
    )

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        <label {...labelProps} className="text-sm font-medium text-foreground">
          {label}
          {isRequired && <span className="text-destructive-500 ml-0.5">*</span>}
        </label>
        <textarea
          {...inputProps}
          ref={ref}
          rows={rows}
          className={cn(
            'w-full rounded-lg border bg-white text-foreground placeholder:text-muted-foreground',
            'transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary-300',
            'disabled:cursor-not-allowed disabled:opacity-50 resize-y',
            isInvalid
              ? 'border-destructive-300 focus:ring-destructive-500'
              : 'border-secondary-300',
            'px-3.5 py-2.5 text-sm',
          )}
        />
        {description && !isInvalid && (
          <p {...descriptionProps} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
        {isInvalid && errorMessage && (
          <p {...errorMessageProps} className="text-sm text-destructive-500">
            {errorMessage}
          </p>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
```

- [ ] **Step 4: Create barrel export**

Create `packages/ui/src/components/textarea/index.ts`:

```ts
export { Textarea, type TextareaProps } from './textarea'
```

- [ ] **Step 5: Add to package barrel export**

Add to `packages/ui/src/index.ts`:

```ts
export { Textarea, type TextareaProps } from './components/textarea'
```

- [ ] **Step 6: Run tests**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/textarea/textarea.test.tsx
```

Expected: All 4 tests PASS.

- [ ] **Step 7: Write story**

Create `packages/ui/src/components/textarea/textarea.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message...',
  },
}

export const WithError: Story = {
  args: {
    label: 'Message',
    isInvalid: true,
    errorMessage: 'Message is required.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Message',
    placeholder: 'Disabled textarea',
    isDisabled: true,
  },
}
```

- [ ] **Step 8: Commit**

```bash
git add packages/ui/src/components/textarea/ packages/ui/src/index.ts
git commit -m "feat: add Textarea component with label, description, validation"
```

---

## Task 12: Checkbox Component

**Files:**
- Create: `packages/ui/src/components/checkbox/checkbox.tsx`
- Create: `packages/ui/src/components/checkbox/checkbox.test.tsx`
- Create: `packages/ui/src/components/checkbox/checkbox.stories.tsx`
- Create: `packages/ui/src/components/checkbox/index.ts`
- Modify: `packages/ui/src/index.ts`

- [ ] **Step 1: Write failing test**

Create `packages/ui/src/components/checkbox/checkbox.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Checkbox } from './checkbox'

describe('Checkbox', () => {
  it('renders with a label', () => {
    render(<Checkbox>Accept terms</Checkbox>)
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument()
  })

  it('toggles on click', async () => {
    const onChange = vi.fn()
    render(<Checkbox onChange={onChange}>Accept</Checkbox>)
    await userEvent.click(screen.getByLabelText('Accept'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('is disabled when isDisabled is true', () => {
    render(<Checkbox isDisabled>Disabled</Checkbox>)
    expect(screen.getByLabelText('Disabled')).toBeDisabled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/checkbox/checkbox.test.tsx
```

Expected: FAIL

- [ ] **Step 3: Implement Checkbox**

Create `packages/ui/src/components/checkbox/checkbox.tsx`:

```tsx
import { useRef } from 'react'
import { useCheckbox, useToggleState, useFocusRing, mergeProps, VisuallyHidden } from 'react-aria'
import { cn } from '../../utils/cn'

export interface CheckboxProps {
  children: React.ReactNode
  isSelected?: boolean
  defaultSelected?: boolean
  onChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  isIndeterminate?: boolean
  value?: string
  className?: string
}

export function Checkbox({
  children,
  isSelected,
  defaultSelected,
  onChange,
  isDisabled = false,
  isIndeterminate = false,
  value,
  className,
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null)
  const state = useToggleState({ isSelected, defaultSelected, onChange })
  const { inputProps } = useCheckbox(
    { children, isDisabled, isIndeterminate, value, 'aria-label': typeof children === 'string' ? children : undefined },
    state,
    ref,
  )
  const { focusProps, isFocusVisible } = useFocusRing()

  const isChecked = state.isSelected

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer',
        isDisabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      <div
        className={cn(
          'h-4 w-4 rounded border-2 flex items-center justify-center transition-colors',
          isChecked || isIndeterminate
            ? 'bg-primary-600 border-primary-600'
            : 'border-secondary-300 bg-white',
          isFocusVisible && 'ring-2 ring-ring ring-offset-2',
        )}
      >
        {isChecked && (
          <svg viewBox="0 0 12 10" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="1.5 6 4.5 9 10.5 1" />
          </svg>
        )}
        {isIndeterminate && !isChecked && (
          <div className="h-0.5 w-2.5 bg-white rounded-full" />
        )}
      </div>
      <span className="text-sm text-foreground">{children}</span>
    </label>
  )
}
```

- [ ] **Step 4: Create barrel export**

Create `packages/ui/src/components/checkbox/index.ts`:

```ts
export { Checkbox, type CheckboxProps } from './checkbox'
```

- [ ] **Step 5: Add to package barrel export**

Add to `packages/ui/src/index.ts`:

```ts
export { Checkbox, type CheckboxProps } from './components/checkbox'
```

- [ ] **Step 6: Run tests**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/checkbox/checkbox.test.tsx
```

Expected: All 3 tests PASS.

- [ ] **Step 7: Write story**

Create `packages/ui/src/components/checkbox/checkbox.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: { children: 'Accept terms and conditions' },
}

export const Checked: Story = {
  args: { children: 'I agree', defaultSelected: true },
}

export const Indeterminate: Story = {
  args: { children: 'Select all', isIndeterminate: true },
}

export const Disabled: Story = {
  args: { children: 'Disabled checkbox', isDisabled: true },
}
```

- [ ] **Step 8: Commit**

```bash
git add packages/ui/src/components/checkbox/ packages/ui/src/index.ts
git commit -m "feat: add Checkbox component with indeterminate state"
```

---

## Task 13: Switch Component

**Files:**
- Create: `packages/ui/src/components/switch/switch.tsx`
- Create: `packages/ui/src/components/switch/switch.test.tsx`
- Create: `packages/ui/src/components/switch/switch.stories.tsx`
- Create: `packages/ui/src/components/switch/index.ts`
- Modify: `packages/ui/src/index.ts`

- [ ] **Step 1: Write failing test**

Create `packages/ui/src/components/switch/switch.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Switch } from './switch'

describe('Switch', () => {
  it('renders with a label', () => {
    render(<Switch>Notifications</Switch>)
    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeInTheDocument()
  })

  it('toggles on click', async () => {
    const onChange = vi.fn()
    render(<Switch onChange={onChange}>Toggle</Switch>)
    await userEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('is disabled when isDisabled is true', () => {
    render(<Switch isDisabled>Disabled</Switch>)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/switch/switch.test.tsx
```

Expected: FAIL

- [ ] **Step 3: Implement Switch**

Create `packages/ui/src/components/switch/switch.tsx`:

```tsx
import { useRef } from 'react'
import { useSwitch, useFocusRing, VisuallyHidden } from 'react-aria'
import { useToggleState } from 'react-stately'
import { cn } from '../../utils/cn'
import type { Size } from '../../types/common'

export interface SwitchProps {
  children?: React.ReactNode
  isSelected?: boolean
  defaultSelected?: boolean
  onChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  size?: Extract<Size, 'sm' | 'md' | 'lg'>
  className?: string
}

const trackSizes: Record<string, string> = {
  sm: 'h-4 w-7',
  md: 'h-5 w-9',
  lg: 'h-6 w-11',
}

const thumbSizes: Record<string, string> = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

const thumbTranslate: Record<string, string> = {
  sm: 'translate-x-3',
  md: 'translate-x-4',
  lg: 'translate-x-5',
}

export function Switch({
  children,
  isSelected,
  defaultSelected,
  onChange,
  isDisabled = false,
  size = 'md',
  className,
}: SwitchProps) {
  const ref = useRef<HTMLInputElement>(null)
  const state = useToggleState({ isSelected, defaultSelected, onChange })
  const { inputProps } = useSwitch(
    { children, isDisabled, 'aria-label': typeof children === 'string' ? children : undefined },
    state,
    ref,
  )
  const { focusProps, isFocusVisible } = useFocusRing()

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer',
        isDisabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <div
        className={cn(
          'relative inline-flex shrink-0 rounded-full transition-colors',
          trackSizes[size],
          state.isSelected ? 'bg-primary-600' : 'bg-secondary-200',
          isFocusVisible && 'ring-2 ring-ring ring-offset-2',
        )}
      >
        <span
          className={cn(
            'inline-block rounded-full bg-white shadow-xs transition-transform',
            thumbSizes[size],
            'absolute top-0.5 left-0.5',
            state.isSelected && thumbTranslate[size],
          )}
        />
      </div>
      {children && <span className="text-sm text-foreground">{children}</span>}
    </label>
  )
}
```

- [ ] **Step 4: Create barrel export**

Create `packages/ui/src/components/switch/index.ts`:

```ts
export { Switch, type SwitchProps } from './switch'
```

- [ ] **Step 5: Add to package barrel export**

Add to `packages/ui/src/index.ts`:

```ts
export { Switch, type SwitchProps } from './components/switch'
```

- [ ] **Step 6: Run tests**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/switch/switch.test.tsx
```

Expected: All 3 tests PASS.

- [ ] **Step 7: Write story**

Create `packages/ui/src/components/switch/switch.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './switch'

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  component: Switch,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: { children: 'Enable notifications' },
}

export const Selected: Story = {
  args: { children: 'Dark mode', defaultSelected: true },
}

export const Disabled: Story = {
  args: { children: 'Disabled switch', isDisabled: true },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Switch size="sm">Small</Switch>
      <Switch size="md">Medium</Switch>
      <Switch size="lg">Large</Switch>
    </div>
  ),
}
```

- [ ] **Step 8: Commit**

```bash
git add packages/ui/src/components/switch/ packages/ui/src/index.ts
git commit -m "feat: add Switch component with sizes"
```

---

## Task 14: Dialog Component

**Files:**
- Create: `packages/ui/src/components/dialog/dialog.tsx`
- Create: `packages/ui/src/components/dialog/dialog.test.tsx`
- Create: `packages/ui/src/components/dialog/dialog.stories.tsx`
- Create: `packages/ui/src/components/dialog/index.ts`
- Modify: `packages/ui/src/index.ts`

- [ ] **Step 1: Write failing test**

Create `packages/ui/src/components/dialog/dialog.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Dialog } from './dialog'
import { Button } from '../button'

describe('Dialog', () => {
  it('opens when trigger is clicked', async () => {
    render(
      <Dialog trigger={<Button>Open</Button>} title="Test Dialog">
        <p>Dialog content</p>
      </Dialog>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Dialog content')).toBeInTheDocument()
  })

  it('renders the title', async () => {
    render(
      <Dialog trigger={<Button>Open</Button>} title="My Dialog">
        <p>Content</p>
      </Dialog>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByText('My Dialog')).toBeInTheDocument()
  })

  it('closes when close button is clicked', async () => {
    render(
      <Dialog trigger={<Button>Open</Button>} title="Dialog">
        <p>Content</p>
      </Dialog>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/dialog/dialog.test.tsx
```

Expected: FAIL

- [ ] **Step 3: Implement Dialog**

Create `packages/ui/src/components/dialog/dialog.tsx`:

```tsx
import { useRef, cloneElement, isValidElement } from 'react'
import {
  useOverlayTriggerState,
} from 'react-stately'
import {
  useOverlayTrigger,
  useDialog,
  useModalOverlay,
  useButton,
  FocusScope,
  OverlayContainer,
} from 'react-aria'
import { cn } from '../../utils/cn'

export interface DialogProps {
  trigger: React.ReactElement
  title: string
  children: React.ReactNode
  isDismissable?: boolean
  className?: string
}

export function Dialog({
  trigger,
  title,
  children,
  isDismissable = true,
  className,
}: DialogProps) {
  const state = useOverlayTriggerState({})
  const triggerRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' },
    state,
    triggerRef,
  )

  return (
    <>
      <button {...triggerProps} ref={triggerRef} className="contents">
        {trigger}
      </button>
      {state.isOpen && (
        <OverlayContainer>
          <DialogOverlay state={state} overlayRef={overlayRef} isDismissable={isDismissable}>
            <DialogContent
              {...overlayProps}
              ref={overlayRef}
              title={title}
              onClose={() => state.close()}
              className={className}
            >
              {children}
            </DialogContent>
          </DialogOverlay>
        </OverlayContainer>
      )}
    </>
  )
}

function DialogOverlay({
  state,
  overlayRef,
  isDismissable,
  children,
}: {
  state: ReturnType<typeof useOverlayTriggerState>
  overlayRef: React.RefObject<HTMLDivElement>
  isDismissable: boolean
  children: React.ReactNode
}) {
  const { modalProps, underlayProps } = useModalOverlay(
    { isDismissable },
    state,
    overlayRef,
  )

  return (
    <div
      {...underlayProps}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div {...modalProps}>{children}</div>
    </div>
  )
}

import { forwardRef } from 'react'

const DialogContent = forwardRef<
  HTMLDivElement,
  {
    title: string
    children: React.ReactNode
    onClose: () => void
    className?: string
  }
>(({ title, children, onClose, className, ...props }, ref) => {
  const { dialogProps, titleProps } = useDialog({ role: 'dialog' }, ref as React.RefObject<HTMLDivElement>)
  const closeRef = useRef<HTMLButtonElement>(null)
  const { buttonProps: closeButtonProps } = useButton({ onPress: onClose, 'aria-label': 'Close' }, closeRef)

  return (
    <FocusScope contain restoreFocus autoFocus>
      <div
        {...dialogProps}
        {...props}
        ref={ref}
        className={cn(
          'relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl',
          'border border-secondary-200',
          className,
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 {...titleProps} className="text-lg font-semibold text-foreground">
            {title}
          </h2>
          <button
            {...closeButtonProps}
            ref={closeRef}
            className="rounded-lg p-1 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-50 transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </FocusScope>
  )
})

DialogContent.displayName = 'DialogContent'
```

- [ ] **Step 4: Create barrel export**

Create `packages/ui/src/components/dialog/index.ts`:

```ts
export { Dialog, type DialogProps } from './dialog'
```

- [ ] **Step 5: Add to package barrel export**

Add to `packages/ui/src/index.ts`:

```ts
export { Dialog, type DialogProps } from './components/dialog'
```

- [ ] **Step 6: Run tests**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/dialog/dialog.test.tsx
```

Expected: All 3 tests PASS.

- [ ] **Step 7: Write story**

Create `packages/ui/src/components/dialog/dialog.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Dialog } from './dialog'
import { Button } from '../button'
import { Input } from '../input'

const meta: Meta<typeof Dialog> = {
  title: 'Overlays/Dialog',
  component: Dialog,
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  args: {
    trigger: <Button>Open Dialog</Button>,
    title: 'Edit Profile',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input label="Name" placeholder="Enter your name" />
        <Input label="Email" placeholder="Enter your email" />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
    ),
  },
}

export const SimpleMessage: Story = {
  args: {
    trigger: <Button variant="outline">Show Info</Button>,
    title: 'Information',
    children: <p style={{ color: '#667085' }}>This is a simple informational dialog.</p>,
  },
}
```

- [ ] **Step 8: Commit**

```bash
git add packages/ui/src/components/dialog/ packages/ui/src/index.ts
git commit -m "feat: add Dialog component with overlay, focus trap, dismissable"
```

---

## Task 15: Tooltip Component

**Files:**
- Create: `packages/ui/src/components/tooltip/tooltip.tsx`
- Create: `packages/ui/src/components/tooltip/tooltip.test.tsx`
- Create: `packages/ui/src/components/tooltip/tooltip.stories.tsx`
- Create: `packages/ui/src/components/tooltip/index.ts`
- Modify: `packages/ui/src/index.ts`

- [ ] **Step 1: Write failing test**

Create `packages/ui/src/components/tooltip/tooltip.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Tooltip } from './tooltip'
import { Button } from '../button'

describe('Tooltip', () => {
  it('shows tooltip on hover', async () => {
    render(
      <Tooltip content="Helpful tip">
        <Button>Hover me</Button>
      </Tooltip>,
    )
    await userEvent.hover(screen.getByRole('button', { name: 'Hover me' }))
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Helpful tip')
  })

  it('hides tooltip on mouse leave', async () => {
    render(
      <Tooltip content="Tip">
        <Button>Hover me</Button>
      </Tooltip>,
    )
    await userEvent.hover(screen.getByRole('button'))
    expect(await screen.findByRole('tooltip')).toBeInTheDocument()
    await userEvent.unhover(screen.getByRole('button'))
    await new Promise((r) => setTimeout(r, 500))
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/tooltip/tooltip.test.tsx
```

Expected: FAIL

- [ ] **Step 3: Implement Tooltip**

Create `packages/ui/src/components/tooltip/tooltip.tsx`:

```tsx
import { useRef, cloneElement, isValidElement } from 'react'
import { useTooltipTriggerState } from 'react-stately'
import { useTooltipTrigger, useTooltip, mergeProps, useOverlayPosition } from 'react-aria'
import { cn } from '../../utils/cn'

export interface TooltipProps {
  children: React.ReactElement
  content: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  className?: string
}

export function Tooltip({
  children,
  content,
  placement = 'top',
  delay = 300,
  className,
}: TooltipProps) {
  const state = useTooltipTriggerState({ delay })
  const triggerRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const { triggerProps, tooltipProps: triggerTooltipProps } = useTooltipTrigger(
    { delay },
    state,
    triggerRef,
  )

  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement,
    offset: 8,
    isOpen: state.isOpen,
  })

  return (
    <>
      {cloneElement(children, { ...triggerProps, ref: triggerRef })}
      {state.isOpen && (
        <TooltipContent
          ref={overlayRef}
          state={state}
          style={positionProps.style}
          className={className}
          {...triggerTooltipProps}
        >
          {content}
        </TooltipContent>
      )}
    </>
  )
}

import { forwardRef } from 'react'

const TooltipContent = forwardRef<
  HTMLDivElement,
  {
    state: ReturnType<typeof useTooltipTriggerState>
    children: React.ReactNode
    className?: string
    style?: React.CSSProperties
  }
>(({ state, children, className, style, ...props }, ref) => {
  const { tooltipProps } = useTooltip(props, state)

  return (
    <div
      {...tooltipProps}
      ref={ref}
      style={style}
      className={cn(
        'z-50 rounded-lg bg-secondary-900 px-3 py-1.5 text-xs text-white shadow-lg',
        className,
      )}
    >
      {children}
    </div>
  )
})

TooltipContent.displayName = 'TooltipContent'
```

- [ ] **Step 4: Create barrel export**

Create `packages/ui/src/components/tooltip/index.ts`:

```ts
export { Tooltip, type TooltipProps } from './tooltip'
```

- [ ] **Step 5: Add to package barrel export**

Add to `packages/ui/src/index.ts`:

```ts
export { Tooltip, type TooltipProps } from './components/tooltip'
```

- [ ] **Step 6: Run tests**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/tooltip/tooltip.test.tsx
```

Expected: All 2 tests PASS.

- [ ] **Step 7: Write story**

Create `packages/ui/src/components/tooltip/tooltip.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './tooltip'
import { Button } from '../button'

const meta: Meta<typeof Tooltip> = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
}

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', padding: '64px', justifyContent: 'center' }}>
      <Tooltip content="Top" placement="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom" placement="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left" placement="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
      <Tooltip content="Right" placement="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
    </div>
  ),
}
```

- [ ] **Step 8: Commit**

```bash
git add packages/ui/src/components/tooltip/ packages/ui/src/index.ts
git commit -m "feat: add Tooltip component with placement support"
```

---

## Task 16: Card Component

**Files:**
- Create: `packages/ui/src/components/card/card.tsx`
- Create: `packages/ui/src/components/card/card.test.tsx`
- Create: `packages/ui/src/components/card/card.stories.tsx`
- Create: `packages/ui/src/components/card/index.ts`
- Modify: `packages/ui/src/index.ts`

- [ ] **Step 1: Write failing test**

Create `packages/ui/src/components/card/card.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Card } from './card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders header and footer', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card.Header>
        <Card.Body>Body content</Card.Body>
        <Card.Footer>Footer content</Card.Footer>
      </Card>,
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Body content')).toBeInTheDocument()
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('applies variant styles', () => {
    const { container } = render(<Card variant="outline">Content</Card>)
    expect(container.firstChild).toHaveClass('border')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/card/card.test.tsx
```

Expected: FAIL

- [ ] **Step 3: Implement Card**

Create `packages/ui/src/components/card/card.tsx`:

```tsx
import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

type CardVariant = 'elevated' | 'outline' | 'filled'

export interface CardProps {
  children: React.ReactNode
  variant?: CardVariant
  className?: string
}

const variantStyles: Record<CardVariant, string> = {
  elevated: 'bg-white shadow-md border border-secondary-100',
  outline: 'bg-white border border-secondary-200',
  filled: 'bg-secondary-50 border border-secondary-100',
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'outline', className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('rounded-xl overflow-hidden', variantStyles[variant], className)}
      >
        {children}
      </div>
    )
  },
)
CardRoot.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn('px-6 pt-6', className)}>
      {children}
    </div>
  ),
)
CardHeader.displayName = 'Card.Header'

const CardTitle = forwardRef<HTMLHeadingElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <h3 ref={ref} className={cn('text-lg font-semibold text-foreground', className)}>
      {children}
    </h3>
  ),
)
CardTitle.displayName = 'Card.Title'

const CardDescription = forwardRef<
  HTMLParagraphElement,
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground mt-1', className)}>
    {children}
  </p>
))
CardDescription.displayName = 'Card.Description'

const CardBody = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn('px-6 py-4', className)}>
      {children}
    </div>
  ),
)
CardBody.displayName = 'Card.Body'

const CardFooter = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 pb-6 pt-0 flex items-center gap-2', className)}
    >
      {children}
    </div>
  ),
)
CardFooter.displayName = 'Card.Footer'

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
})
```

- [ ] **Step 4: Create barrel export**

Create `packages/ui/src/components/card/index.ts`:

```ts
export { Card, type CardProps } from './card'
```

- [ ] **Step 5: Add to package barrel export**

Add to `packages/ui/src/index.ts`:

```ts
export { Card, type CardProps } from './components/card'
```

- [ ] **Step 6: Run tests**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/card/card.test.tsx
```

Expected: All 3 tests PASS.

- [ ] **Step 7: Write story**

Create `packages/ui/src/components/card/card.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './card'
import { Button } from '../button'

const meta: Meta<typeof Card> = {
  title: 'Data Display/Card',
  component: Card,
  argTypes: {
    variant: { control: 'select', options: ['elevated', 'outline', 'filled'] },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: '400px' }}>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>A short description of the card content.</Card.Description>
      </Card.Header>
      <Card.Body>
        <p style={{ color: '#667085' }}>This is the card body with some content.</p>
      </Card.Body>
      <Card.Footer>
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Confirm</Button>
      </Card.Footer>
    </Card>
  ),
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Card variant="outline" style={{ padding: '24px', flex: 1 }}>Outline</Card>
      <Card variant="elevated" style={{ padding: '24px', flex: 1 }}>Elevated</Card>
      <Card variant="filled" style={{ padding: '24px', flex: 1 }}>Filled</Card>
    </div>
  ),
}
```

- [ ] **Step 8: Commit**

```bash
git add packages/ui/src/components/card/ packages/ui/src/index.ts
git commit -m "feat: add Card compound component with header, body, footer"
```

---

## Task 17: Heading and Text Components

**Files:**
- Create: `packages/ui/src/components/heading/heading.tsx`
- Create: `packages/ui/src/components/heading/heading.test.tsx`
- Create: `packages/ui/src/components/heading/heading.stories.tsx`
- Create: `packages/ui/src/components/heading/index.ts`
- Create: `packages/ui/src/components/text/text.tsx`
- Create: `packages/ui/src/components/text/text.test.tsx`
- Create: `packages/ui/src/components/text/text.stories.tsx`
- Create: `packages/ui/src/components/text/index.ts`
- Modify: `packages/ui/src/index.ts`

- [ ] **Step 1: Write failing tests for Heading**

Create `packages/ui/src/components/heading/heading.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Heading } from './heading'

describe('Heading', () => {
  it('renders as h2 by default', () => {
    render(<Heading>Title</Heading>)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Title')
  })

  it('renders with specified level', () => {
    render(<Heading as="h1">Main Title</Heading>)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Title')
  })

  it('applies size classes', () => {
    const { container } = render(<Heading size="3xl">Big</Heading>)
    expect(container.firstChild).toHaveClass('text-3xl')
  })
})
```

- [ ] **Step 2: Write failing tests for Text**

Create `packages/ui/src/components/text/text.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Text } from './text'

describe('Text', () => {
  it('renders as p by default', () => {
    render(<Text>Paragraph</Text>)
    expect(screen.getByText('Paragraph').tagName).toBe('P')
  })

  it('renders as span when specified', () => {
    render(<Text as="span">Inline</Text>)
    expect(screen.getByText('Inline').tagName).toBe('SPAN')
  })

  it('applies muted color', () => {
    const { container } = render(<Text color="muted">Subtle</Text>)
    expect(container.firstChild).toHaveClass('text-muted-foreground')
  })
})
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/heading/ src/components/text/
```

Expected: FAIL

- [ ] **Step 4: Implement Heading**

Create `packages/ui/src/components/heading/heading.tsx`:

```tsx
import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

export interface HeadingProps {
  children: React.ReactNode
  as?: HeadingLevel
  size?: HeadingSize
  className?: string
}

const sizeStyles: Record<HeadingSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
}

const defaultSizeForLevel: Record<HeadingLevel, HeadingSize> = {
  h1: '4xl',
  h2: '3xl',
  h3: '2xl',
  h4: 'xl',
  h5: 'lg',
  h6: 'md',
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, as = 'h2', size, className }, ref) => {
    const Tag = as
    const resolvedSize = size ?? defaultSizeForLevel[as]

    return (
      <Tag
        ref={ref}
        className={cn('font-semibold tracking-tight text-foreground', sizeStyles[resolvedSize], className)}
      >
        {children}
      </Tag>
    )
  },
)

Heading.displayName = 'Heading'
```

- [ ] **Step 5: Implement Text**

Create `packages/ui/src/components/text/text.tsx`:

```tsx
import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

type TextElement = 'p' | 'span' | 'div' | 'label'
type TextSize = 'xs' | 'sm' | 'md' | 'lg'
type TextColor = 'default' | 'muted' | 'destructive' | 'success'

export interface TextProps {
  children: React.ReactNode
  as?: TextElement
  size?: TextSize
  color?: TextColor
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  className?: string
}

const sizeStyles: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
}

const colorStyles: Record<TextColor, string> = {
  default: 'text-foreground',
  muted: 'text-muted-foreground',
  destructive: 'text-destructive-500',
  success: 'text-success-600',
}

const weightStyles: Record<string, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ children, as = 'p', size = 'md', color = 'default', weight = 'normal', className }, ref) => {
    const Tag = as as keyof JSX.IntrinsicElements

    return (
      <Tag
        ref={ref as any}
        className={cn(sizeStyles[size], colorStyles[color], weightStyles[weight], className)}
      >
        {children}
      </Tag>
    )
  },
)

Text.displayName = 'Text'
```

- [ ] **Step 6: Create barrel exports**

Create `packages/ui/src/components/heading/index.ts`:

```ts
export { Heading, type HeadingProps } from './heading'
```

Create `packages/ui/src/components/text/index.ts`:

```ts
export { Text, type TextProps } from './text'
```

- [ ] **Step 7: Add to package barrel export**

Add to `packages/ui/src/index.ts`:

```ts
export { Heading, type HeadingProps } from './components/heading'
export { Text, type TextProps } from './components/text'
```

- [ ] **Step 8: Run tests**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/heading/ src/components/text/
```

Expected: All 6 tests PASS.

- [ ] **Step 9: Write Heading story**

Create `packages/ui/src/components/heading/heading.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from './heading'

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  argTypes: {
    as: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] },
  },
}

export default meta
type Story = StoryObj<typeof Heading>

export const Default: Story = {
  args: { children: 'Heading Text', as: 'h2' },
}

export const AllLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Heading as="h1">Heading 1</Heading>
      <Heading as="h2">Heading 2</Heading>
      <Heading as="h3">Heading 3</Heading>
      <Heading as="h4">Heading 4</Heading>
      <Heading as="h5">Heading 5</Heading>
      <Heading as="h6">Heading 6</Heading>
    </div>
  ),
}
```

- [ ] **Step 10: Write Text story**

Create `packages/ui/src/components/text/text.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './text'

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    color: { control: 'select', options: ['default', 'muted', 'destructive', 'success'] },
    weight: { control: 'select', options: ['normal', 'medium', 'semibold', 'bold'] },
  },
}

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {
  args: { children: 'This is a paragraph of text.' },
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Text color="default">Default color</Text>
      <Text color="muted">Muted color</Text>
      <Text color="destructive">Destructive color</Text>
      <Text color="success">Success color</Text>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Text size="xs">Extra small text</Text>
      <Text size="sm">Small text</Text>
      <Text size="md">Medium text</Text>
      <Text size="lg">Large text</Text>
    </div>
  ),
}
```

- [ ] **Step 11: Commit**

```bash
git add packages/ui/src/components/heading/ packages/ui/src/components/text/ packages/ui/src/index.ts
git commit -m "feat: add Heading and Text typography components"
```

---

## Task 18: Select Component

**Files:**
- Create: `packages/ui/src/components/select/select.tsx`
- Create: `packages/ui/src/components/select/select.test.tsx`
- Create: `packages/ui/src/components/select/select.stories.tsx`
- Create: `packages/ui/src/components/select/index.ts`
- Modify: `packages/ui/src/index.ts`

- [ ] **Step 1: Write failing test**

Create `packages/ui/src/components/select/select.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Select } from './select'

const items = [
  { key: 'apple', label: 'Apple' },
  { key: 'banana', label: 'Banana' },
  { key: 'cherry', label: 'Cherry' },
]

describe('Select', () => {
  it('renders with a label', () => {
    render(<Select label="Fruit" items={items} />)
    expect(screen.getByText('Fruit')).toBeInTheDocument()
  })

  it('opens dropdown on click', async () => {
    render(<Select label="Fruit" items={items} />)
    await userEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Banana')).toBeInTheDocument()
  })

  it('selects an item', async () => {
    const onSelectionChange = vi.fn()
    render(<Select label="Fruit" items={items} onSelectionChange={onSelectionChange} />)
    await userEvent.click(screen.getByRole('button'))
    await userEvent.click(screen.getByText('Banana'))
    expect(onSelectionChange).toHaveBeenCalledWith('banana')
  })

  it('shows placeholder text', () => {
    render(<Select label="Fruit" items={items} placeholder="Choose a fruit" />)
    expect(screen.getByText('Choose a fruit')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/select/select.test.tsx
```

Expected: FAIL

- [ ] **Step 3: Implement Select**

Create `packages/ui/src/components/select/select.tsx`:

```tsx
import { useRef } from 'react'
import type { Key } from 'react-aria'
import { useSelectState } from 'react-stately'
import {
  useSelect,
  useButton,
  useListBox,
  useOption,
  HiddenSelect,
  useFocusRing,
  mergeProps,
  useOverlayPosition,
} from 'react-aria'
import { Item } from 'react-stately'
import { cn } from '../../utils/cn'
import type { Size } from '../../types/common'

export interface SelectItem {
  key: string
  label: string
}

export interface SelectProps {
  label: string
  items: SelectItem[]
  placeholder?: string
  selectedKey?: string
  onSelectionChange?: (key: string) => void
  isDisabled?: boolean
  isRequired?: boolean
  errorMessage?: string
  isInvalid?: boolean
  size?: Size
  className?: string
}

const sizeStyles: Record<Size, string> = {
  xs: 'h-8 px-2.5 text-xs',
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-3.5 text-sm',
  lg: 'h-11 px-4 text-md',
  xl: 'h-12 px-4 text-md',
}

export function Select({
  label,
  items,
  placeholder = 'Select an option',
  selectedKey,
  onSelectionChange,
  isDisabled = false,
  isRequired = false,
  errorMessage,
  isInvalid = false,
  size = 'md',
  className,
}: SelectProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listBoxRef = useRef<HTMLUListElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const state = useSelectState({
    children: (item: SelectItem) => <Item key={item.key}>{item.label}</Item>,
    items,
    selectedKey,
    onSelectionChange: onSelectionChange as ((key: Key) => void) | undefined,
    isDisabled,
    isRequired,
  })

  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    {
      label,
      isDisabled,
      isRequired,
      children: (item: SelectItem) => <Item key={item.key}>{item.label}</Item>,
      items,
    },
    state,
    triggerRef,
  )

  const { buttonProps } = useButton(triggerProps, triggerRef)
  const { focusProps, isFocusVisible } = useFocusRing()

  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: 'bottom start',
    offset: 4,
    isOpen: state.isOpen,
  })

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label {...labelProps} className="text-sm font-medium text-foreground">
        {label}
        {isRequired && <span className="text-destructive-500 ml-0.5">*</span>}
      </label>
      <HiddenSelect state={state} triggerRef={triggerRef} label={label} />
      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={triggerRef}
        className={cn(
          'w-full rounded-lg border bg-white text-left flex items-center justify-between',
          'transition-colors',
          'disabled:cursor-not-allowed disabled:opacity-50',
          isFocusVisible && 'outline-none ring-2 ring-ring',
          isInvalid ? 'border-destructive-300' : 'border-secondary-300',
          sizeStyles[size],
        )}
      >
        <span
          {...valueProps}
          className={cn(!state.selectedItem && 'text-muted-foreground')}
        >
          {state.selectedItem ? state.selectedItem.rendered : placeholder}
        </span>
        <svg className="h-4 w-4 text-secondary-400" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {state.isOpen && (
        <div
          {...positionProps}
          ref={overlayRef}
          className="z-50"
        >
          <ListBox {...menuProps} state={state} listBoxRef={listBoxRef} />
        </div>
      )}
      {isInvalid && errorMessage && (
        <p className="text-sm text-destructive-500">{errorMessage}</p>
      )}
    </div>
  )
}

function ListBox({
  state,
  listBoxRef,
  ...props
}: {
  state: ReturnType<typeof useSelectState>
  listBoxRef: React.RefObject<HTMLUListElement>
} & Record<string, any>) {
  const { listBoxProps } = useListBox(props, state, listBoxRef)

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      className="w-full mt-1 rounded-lg border border-secondary-200 bg-white shadow-lg py-1 max-h-60 overflow-auto"
    >
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ul>
  )
}

function Option({
  item,
  state,
}: {
  item: any
  state: ReturnType<typeof useSelectState>
}) {
  const ref = useRef<HTMLLIElement>(null)
  const { optionProps, isSelected, isFocused } = useOption({ key: item.key }, state, ref)

  return (
    <li
      {...optionProps}
      ref={ref}
      className={cn(
        'px-3.5 py-2 text-sm cursor-pointer outline-none',
        isFocused && 'bg-secondary-50',
        isSelected && 'text-primary-600 font-medium',
        !isSelected && 'text-foreground',
      )}
    >
      {item.rendered}
    </li>
  )
}
```

- [ ] **Step 4: Create barrel export**

Create `packages/ui/src/components/select/index.ts`:

```ts
export { Select, type SelectProps, type SelectItem } from './select'
```

- [ ] **Step 5: Add to package barrel export**

Add to `packages/ui/src/index.ts`:

```ts
export { Select, type SelectProps, type SelectItem } from './components/select'
```

- [ ] **Step 6: Run tests**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run src/components/select/select.test.tsx
```

Expected: All 4 tests PASS.

- [ ] **Step 7: Write story**

Create `packages/ui/src/components/select/select.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './select'

const fruits = [
  { key: 'apple', label: 'Apple' },
  { key: 'banana', label: 'Banana' },
  { key: 'cherry', label: 'Cherry' },
  { key: 'date', label: 'Date' },
  { key: 'elderberry', label: 'Elderberry' },
]

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    label: 'Favorite Fruit',
    items: fruits,
    placeholder: 'Choose a fruit',
  },
}

export const WithError: Story = {
  args: {
    label: 'Fruit',
    items: fruits,
    isInvalid: true,
    errorMessage: 'Please select a fruit.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Fruit',
    items: fruits,
    isDisabled: true,
  },
}
```

- [ ] **Step 8: Commit**

```bash
git add packages/ui/src/components/select/ packages/ui/src/index.ts
git commit -m "feat: add Select component with listbox, keyboard navigation"
```

---

## Task 19: Final Build Verification

- [ ] **Step 1: Run full test suite**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx vitest run
```

Expected: All tests PASS.

- [ ] **Step 2: Run build**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/packages/ui
npx tsup
```

Expected: Build succeeds, `dist/` contains ESM, CJS, types, and styles.css.

- [ ] **Step 3: Verify Storybook starts**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system/apps/docs
npx storybook dev -p 6006 --no-open
```

Expected: Storybook starts and shows all component stories. Ctrl+C to stop.

- [ ] **Step 4: Commit any remaining changes**

```bash
cd /mnt/c/Projetos/Revido/revido-design-system
git add -A
git status
```

If there are uncommitted changes:

```bash
git commit -m "chore: final build verification for foundation phase"
```

---

## Summary of Foundation Phase Deliverables

After completing all tasks, the project will have:

- **Monorepo setup:** npm workspaces + Turborepo
- **Build pipeline:** tsup (ESM + CJS + types)
- **Theming:** CSS variables (light + dark) + Tailwind preset
- **15 components:** Button, Badge, Avatar, Separator, Input, Textarea, Checkbox, Switch, Dialog, Tooltip, Card, Heading, Text, Select
- **Tests:** Vitest + RTL for every component
- **Stories:** Storybook 8 for every component
- **All components use React Aria for accessible behavior**

### Next Phase

The next implementation plan will cover the remaining ~45 components across: IconButton, ButtonGroup, AvatarGroup, RadioGroup, CheckboxGroup, Combobox, Slider, NumberField, OTPField, DatePicker, FileUpload, Table, Accordion, Timeline, List, DescriptionList, Stat, EmptyState, Toast, Alert, Progress, Meter, Skeleton, Spinner, AlertDialog, Popover, Sheet, Menu, ContextMenu, Tabs, Breadcrumb, Pagination, Navbar, Sidebar, Link, Container, Stack, Grid, Divider, ScrollArea, Label, Collapsible, Toggle, ToggleGroup, Kbd.
