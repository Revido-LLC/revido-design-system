# @revido/design-system — Design Spec

## Overview

A public npm package providing a full catalog of ~60 accessible, themeable React components. Uses React Aria for behavior/accessibility, Tailwind CSS for styling, and CSS variables for shadcn-style theming. Visually inspired by Untitled UI. React Native support planned as a future companion package.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Node.js | 18+ |
| Runtime | React 18+ (peer dependency) |
| Behavior/A11y | react-aria + react-stately |
| Styling | Tailwind CSS 4 (peer dependency) + CSS variables |
| Build | tsup (ESM + CJS + .d.ts) |
| Package manager | npm (workspaces for monorepo) |
| Dev environment | Storybook 8 |
| Testing | Vitest + React Testing Library |
| Linting | ESLint + Prettier |
| Types | TypeScript, ships declarations |
| Build orchestration | Turborepo |
| Versioning | Changesets |
| CI/CD | GitHub Actions |
| Publishing | npm, under `@revido` scope |

## Theming System

Shadcn-style CSS variable approach. Ships with a default theme (Untitled UI-inspired) plus dark mode.

### Token categories

- **Colors:** `--rds-color-primary`, `--rds-color-secondary`, `--rds-color-destructive`, `--rds-color-muted`, etc. (shades 50–950)
- **Typography:** `--rds-font-sans`, `--rds-font-mono`, `--rds-font-size-*`, `--rds-font-weight-*`, `--rds-line-height-*`
- **Spacing:** `--rds-spacing-*` (Tailwind scale: 0.5, 1, 1.5, 2, 3, 4, etc.)
- **Radius:** `--rds-radius-sm`, `--rds-radius-md`, `--rds-radius-lg`, `--rds-radius-full`
- **Shadows:** `--rds-shadow-xs` through `--rds-shadow-2xl`

### Consumer customization

```css
@import '@revido/design-system/styles.css';

:root {
  --rds-color-primary-500: #your-brand-color;
  --rds-radius-md: 0.25rem;
  --rds-font-sans: 'Inter', sans-serif;
}
```

### Dark mode

Supported via `.dark` class or `prefers-color-scheme`. Ships with light + dark themes by default using separate variable values under a dark selector.

### Tailwind preset

```ts
// tailwind.config.ts
import { revido } from '@revido/design-system/tailwind'

export default {
  presets: [revido()],
}
```

Maps CSS variables to Tailwind utilities so `bg-primary-500` works out of the box.

## Component Catalog (~60 components)

### General (8)
Button, IconButton, ButtonGroup, Badge, Avatar, AvatarGroup, Kbd, Separator

### Forms (14)
Input, Textarea, Select, Combobox, Checkbox, CheckboxGroup, Radio, RadioGroup, Switch, Slider, NumberField, OTPField, DatePicker, FileUpload

### Data Display (8)
Table, Card, Accordion, Timeline, List, DescriptionList, Stat, EmptyState

### Feedback (6)
Toast, Alert, Progress, Meter, Skeleton, Spinner

### Overlays (7)
Dialog, AlertDialog, Popover, Tooltip, Sheet (drawer), Menu, ContextMenu

### Navigation (6)
Tabs, Breadcrumb, Pagination, Navbar, Sidebar, Link

### Layout (5)
Container, Stack, Grid, Divider, ScrollArea

### Typography (3)
Heading, Text, Label

### Misc (3)
Collapsible, Toggle, ToggleGroup

## Component API Conventions

Every component follows a consistent API:

- `variant` — visual style (`solid`, `outline`, `ghost`, etc.)
- `size` — `xs`, `sm`, `md`, `lg`, `xl`
- `colorScheme` — maps to theme tokens
- `disabled`, `loading` states where applicable
- Full TypeScript autocompletion
- Ref forwarding via `React.forwardRef`
- Compound components where appropriate (e.g., `Table.Header`, `Table.Row`)

## Project Structure

```
revido-design-system/
├── packages/
│   └── ui/                        # The npm package
│       ├── src/
│       │   ├── components/
│       │   │   ├── button/
│       │   │   │   ├── button.tsx
│       │   │   │   ├── button.test.tsx
│       │   │   │   ├── button.stories.tsx
│       │   │   │   └── index.ts
│       │   │   ├── input/
│       │   │   ├── dialog/
│       │   │   └── ...
│       │   ├── theme/
│       │   │   ├── tokens.css       # CSS variable definitions
│       │   │   ├── dark.css         # Dark mode overrides
│       │   │   └── preset.ts        # Tailwind preset
│       │   ├── hooks/               # Shared internal hooks
│       │   ├── utils/               # Shared internal utilities
│       │   └── index.ts             # Public barrel export
│       ├── package.json
│       └── tsup.config.ts
├── apps/
│   └── docs/                       # Storybook instance
├── package.json                    # npm workspace root
├── tsconfig.json
└── turbo.json                      # Turborepo for build orchestration
```

### Package exports

```json
{
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js",
      "types": "./dist/types/index.d.ts"
    },
    "./styles.css": "./dist/styles.css",
    "./tailwind": "./dist/esm/theme/preset.js"
  }
}
```

## Developer Experience

### Consumer getting started

```bash
npm install @revido/design-system
```

```css
/* globals.css */
@import '@revido/design-system/styles.css';
```

```ts
// tailwind.config.ts
import { revido } from '@revido/design-system/tailwind'
export default { presets: [revido()] }
```

```tsx
import { Button } from '@revido/design-system'
export default () => <Button variant="solid" size="md">Click me</Button>
```

### Development commands

- `npm run dev` — starts Storybook for component development
- `npm run build` — builds the package via tsup
- `npm test` — runs Vitest
- `npm run lint` — ESLint + Prettier
- `npx changeset` — creates a changeset for versioning
- `npm run release` — publishes to npm

### CI/CD (GitHub Actions)

- PR checks: lint, typecheck, test, build
- Main branch: auto-publish via Changesets, deploy Storybook docs

## Future: React Native

A companion package `@revido/design-system-native` will share design tokens and API conventions but use React Native primitives + StyleSheet instead of React Aria + Tailwind. This is out of scope for the initial build.
