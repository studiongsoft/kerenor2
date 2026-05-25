# AGENTS.md

Guidance for AI agents working in the kerenor repository.

## Project

**kerenor** — RTL SPA for campaign/permissions management. Design team builds UI; dev team replaces mocks with real API.

## Stack

React, TypeScript, Vite, MobX, React Router, Axios, MUI (workspace), design-lead.

## Structure

| Path | Purpose |
|------|---------|
| `src/pages/` | Pages — design team composes here |
| `src/components/` | Shared + feature components |
| `src/stores/` | MobX stores |
| `src/services/` | Axios + mocks |
| `packages/mui-material/src/` | MUI component source — change appearance here |
| `design-decisions/` | Component change docs |
| `docs/design-team/` | Handoff guides and contract |

## Commands

```bash
pnpm install
pnpm dev              # http://localhost:5173
pnpm build
pnpm typescript
pnpm build:packages   # rebuild MUI workspace packages
```

## Design to code

See [DESIGN-TO-CODE.md](./DESIGN-TO-CODE.md) and [docs/design-team/](./docs/design-team/README.md).

- **RTL always** — `AppThemeProvider` from design-lead
- **Pages compose only** — no one-off styling in pages; change components or theme
- **Light + dark** required for component changes
- Document every component change in `design-decisions/components/<Name>.md`

## Package manager

**pnpm only.** Never use npm/yarn.
