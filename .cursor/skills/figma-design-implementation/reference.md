# Reference — Figma design implementation (this repo)

## Commands

```bash
pnpm docs:dev                    # preview pages + components
pnpm docs:create-playground      # RTL playground
pnpm test:unit Button            # after component change
pnpm -F @mui/material build      # build material package
```

## Component source layout

```text
packages/mui-material/src/Button/
├── Button.js          # implementation
├── Button.d.ts        # types / API docs
├── buttonClasses.ts   # CSS classes
└── index.js           # export
```

## Page locations

| Type | Path |
|------|------|
| Docs pages | `docs/pages/` |
| Component demos | `docs/data/material/components/<slug>/` |
| Playground | `docs/pages/playground/index.tsx` |

## Component documentation (per skill rule 3)

```text
design-decisions/components/
├── Button.md
├── TextField.md
└── ...
```

Create the folder on first use. One MD per component, append changelog sections.

## RTL

```tsx
import { AppThemeProvider } from '@studiongsoft/design-lead';
```

https://github.com/studiongsoft/design-lead

## Figma MCP

When Figma URL is provided:

1. `get_design_context` + `get_screenshot`
2. Check Code Connect mappings
3. Compare against `packages/mui-material/src/`

## Related skills

- `material-ui-styling` — sx vs styled vs theme overrides
- `material-ui-theming` — colorSchemes, tokens
- Figma `implement-design` plugin skill (if available)
