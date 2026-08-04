# AGENTS.md

## Stack

- Node.js 24.18.0 in CI; Rstack CLI requires Node.js 22.12+
- pnpm 11 workspace with packages under `packages/*`
- Rspress plugin packages published as TypeScript ESM packages
- Build, lint, tests, and Git hooks: Rstack CLI
- Build: shared Rslib v1 configuration, with package-specific entries only when required
- Unit tests: Rstest through `rs test`
- E2E tests: Playwright through `@rstest/playwright`
- Lint and format: `rs lint --type-check` and `rs fmt`

## Commands (run early)

```bash
# setup (also installs Rstack-managed Git hooks and builds packages)
corepack enable
pnpm install

# checks
pnpm lint
pnpm test
pnpm e2e

# build / docs validation
pnpm build
pnpm docs:build
```

## Project structure

```text
packages/   # published Rspress plugin packages
scripts/    # shared Rstack library configuration
templates/  # plugin template sources
e2e/        # Playwright end-to-end tests
```

## Code style

- Use single quotes and existing Prettier conventions.
- Keep TypeScript strict-safe; avoid `any`.
- Naming: camelCase (functions/files), PascalCase (types/classes).
