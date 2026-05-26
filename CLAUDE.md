# @revido/design-system

Accessible, themeable React component library by Revido.

- **npm:** `@revido/design-system` (published, public)
- **GitHub:** https://github.com/Revido-LLC/revido-design-system
- **npm org:** https://www.npmjs.com/settings/revido/packages

## Tech Stack

- React 18+ (peer dependency)
- React Aria + React Stately (accessibility/behavior)
- Tailwind CSS 4 (peer dependency, styling)
- CSS variables for theming (`--rds-*` prefix)
- TypeScript (strict)
- tsup (build: ESM + CJS + .d.ts)
- Vitest + React Testing Library (tests)
- Storybook 8 (docs/dev)
- npm workspaces + Turborepo (monorepo)
- Changesets (versioning)

## Project Structure

```
packages/ui/          → @revido/design-system (the npm package)
apps/docs/            → Storybook instance
```

Each component lives in `packages/ui/src/components/<name>/` with four files:
- `<name>.tsx` — component implementation
- `<name>.test.tsx` — vitest tests
- `<name>.stories.tsx` — storybook story
- `index.ts` — barrel export

All components must be re-exported from `packages/ui/src/index.ts`.

## Commands

Run from `packages/ui/`:

```bash
npx vitest run                    # run all tests
npx vitest run src/components/X/  # run tests for component X
npx tsup                          # build package
```

Run from `apps/docs/`:

```bash
npx storybook dev -p 6006        # start storybook
```

Run from project root:

```bash
npm run build                     # build all (via turborepo)
npm test                          # test all
npm run dev                       # start storybook
```

## Component Conventions

- Use React Aria hooks for behavior/accessibility (useButton, useTextField, useCheckbox, useSelect, etc.)
- Use `cn()` from `../../utils/cn` for Tailwind class merging (clsx + tailwind-merge)
- Use shared types from `../../types/common`: `Size`, `Variant`, `ColorScheme`
- Consistent prop API: `variant`, `size`, `colorScheme`, `isDisabled`, `isLoading`, `className`
- Forward refs with `forwardRef` where applicable
- Tailwind classes reference CSS variables via the Tailwind preset (e.g., `bg-primary-600`)

## Theming

- CSS variables defined in `src/theme/tokens.css` (light) and `src/theme/dark.css`
- Tailwind preset at `src/theme/preset.ts` — maps `--rds-*` vars to Tailwind utilities
- Consumers import `@revido/design-system/styles.css` and use the `revido()` Tailwind preset
- Dark mode via `.dark` class or `[data-theme='dark']`

## Publishing

- Package manager: npm (not pnpm)
- npm publish token stored in Infisical as `NPM_PUBLISH_TOKEN`
- `publishConfig.access` is set to `public` in package.json
- Build before publishing: `npx tsup` from `packages/ui/`
- Publish: set token in root `.npmrc`, run `npm publish --access public` from `packages/ui/`

## Current Components (v0.1.0)

General: Button, Badge, Avatar, Separator
Forms: Input, Textarea, Checkbox, Switch, Select
Overlays: Dialog, Tooltip
Data Display: Card
Typography: Heading, Text
