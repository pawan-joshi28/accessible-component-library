# Accessible Component Library

A zero-runtime-dependency React design system that targets **WCAG 2.1 AA**, documented in **Storybook** and shared across apps with **Webpack Module Federation**.

## Components

| Component | Accessibility behaviour |
|-----------|-------------------------|
| `Button` | 44px minimum target, visible focus ring, native `disabled` |
| `TextField` | Programmatic label, hint and error via `aria-describedby`, `aria-invalid`, error announced with `role="alert"` |
| `Tabs` | WAI-ARIA tabs pattern: roving `tabindex`, Arrow/Home/End keys |
| `Modal` | `role="dialog"`, labelled, focus trap, Escape to close, scroll lock, focus restored to the trigger |
| `Alert` | `role="status"` or `role="alert"` depending on tone |

Colour tokens are CSS custom properties (`--ui-*`) in `src/styles.css`. The only dependencies are `react` and `react-dom` as peer dependencies.

## Quality checks

- `npm test`: Vitest + Testing Library, including **axe** (`jest-axe`) checks and keyboard-interaction tests for Tabs and Modal.
- Storybook ships the **a11y addon** for per-story audits.

## Module Federation

`webpack.config.cjs` builds two apps:

- **remote** (`:3001`) exposes `Button`, `TextField`, `Tabs`, `Modal` and `Alert` through `remoteEntry.js`.
- **host** (`:3000`) lazy-loads them at runtime (`import("uiRemote/Button")`). React and React DOM are shared singletons so hooks work across the boundary.

## Scripts

```bash
npm install
npm run storybook          # docs on :6006
npm run dev:federation     # remote on :3001, host on :3000
npm test
npm run build:lib          # ESM + type declarations in dist/lib
npm run build:pages        # storybook + host + remote in dist/
```

## Use as a package

```tsx
import { Button, TextField } from "accessible-component-library";
import "accessible-component-library/styles.css";
```

The package is ESM and intended for bundlers.

## Deploy

Run the **Deploy to GitHub Pages** workflow (Settings → Pages → Source: GitHub Actions). It tests, builds with the correct public path and remote URL, and publishes Storybook, host and remote under one site.
