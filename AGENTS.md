# AGENTS.md

## Stack

- Node.js via the repository CI matrix
- `pnpm` workspace with packages under `packages/*`
- Rspress plugin packages published as TypeScript ESM packages
- Build: mostly `tsc`, with `rspress-plugin-file-tree` using Rslib
- Unit tests: Rstest
- E2E tests: Playwright
- Lint and format: Rslint and Prettier

## Commands (run early)

```bash
# setup
corepack enable && pnpm install

# checks
pnpm lint
pnpm test

# build / package validation
pnpm run build
```

## Project structure

```text
packages/   # published Rspress plugin packages
templates/  # plugin template sources
e2e/        # Playwright end-to-end tests
```

## Code style

- Use single quotes and existing Prettier conventions.
- Keep TypeScript strict-safe; avoid `any`.
- Naming: camelCase (functions/files), PascalCase (types/classes).
