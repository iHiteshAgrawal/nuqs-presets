# Contributing to nuqs-presets

Thank you for your interest in contributing to nuqs-presets! We welcome contributions from the community.

## Development Setup

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run tests:
   ```bash
   npm test
   ```

4. Build the package:
   ```bash
   npm run build
   ```

## Development Workflow

This project maintains **two distribution methods**:
1. **NPM Package** - Built from `src/` directory
2. **shadcn Registry** - Built from `registry/default/` directory

### Understanding the Two-Source System

**Why two sources?**
- **NPM users** expect standard package imports with TypeScript path aliases (`@/types`, `@/utils`)
- **Registry users** need files with relative imports that work when installed via shadcn CLI
- **shadcn CLI** copies file content verbatim without transforming imports
- **Automated sync** keeps both distributions identical in functionality

**Directory Structure:**
```
src/                          # Source for NPM package (@/ imports)
  hooks/
    pagination/
      usePagination.ts        # Uses @/types, @/utils
registry/default/             # Source for shadcn registry (relative imports)
  pagination/
    usePagination.ts          # Uses ../types, ../../lib/utils/validation
public/r/                     # Built registry JSON files
scripts/sync-registry.js      # Automated sync script
```

### Making Changes

**1. Edit files in `src/` directory (source of truth)**

```bash
# Make your changes in src/ - this is the NPM package source
# Use TypeScript path aliases: @/types, @/utils
```

**2. Sync changes to registry**

```bash
npm run registry:sync
```

This automatically:
- Copies files from `src/` to `registry/default/`
- Transforms `@/types` → `../types` or `../../types`
- Transforms `@/utils` → `../../lib/utils/[specific-file]`
- Intelligently detects imported utilities (clamp, daysBetween, useDebounce)
- Ensures registry matches NPM package exactly

**3. Build both distributions**

```bash
# Build NPM package
npm run build

# Build registry
npm run registry:build
```

**4. Test both distributions**

```bash
# Test NPM package
npm test
npm run build

# Test registry installation
cd /tmp/test-project
npx shadcn add /path/to/nuqs-presets/public/r/use-pagination.json
npm run build  # Should succeed
```

**5. Commit and PR**

Create a new branch for your feature or bugfix:
```bash
git checkout -b feature/my-new-feature
```

Make your changes and ensure:
- All tests pass (`npm test`)
- Code is properly formatted (`npm run format`)
- No linting errors (`npm run lint`)
- Types are correct (`npm run check-types`)
- Registry is synced (`npm run registry:sync`)
- Registry builds (`npm run registry:build`)

Commit your changes (include both `src/` and `registry/` files):
```bash
git add src/ registry/ public/r/
git commit -m "feat: add new feature"
```

Push your branch and create a pull request
```bash
git push origin feature/my-new-feature
```

### Import Transformation Examples

The sync script intelligently transforms imports:

**Types:**
```typescript
// src/hooks/pagination/types.ts
import type { BaseHookOptions } from '@/types'

// registry/default/pagination/types.ts
import type { BaseHookOptions } from '../types'
```

**Utilities (specific detection):**
```typescript
// src/hooks/pagination/utils.ts
import { clamp } from '@/utils'

// registry/default/pagination/utils.ts
import { clamp } from '../../lib/utils/validation'
```

The script detects what's imported and transforms to the correct file:
- `clamp` → `validation.ts`
- `daysBetween`, `formatDate` → `date.ts`
- `useDebounce` → `debounce.ts`

## Code Style

- Use TypeScript for all code
- Follow the existing code style (enforced by Biome)
- Write clear, concise comments only for complex logic
- Ensure all exports are properly typed

## Testing

- Write tests for all new features
- Maintain >90% code coverage
- Test edge cases and error conditions
- Use descriptive test names

## Pull Request Guidelines

- Keep PRs focused on a single feature or bugfix
- Write a clear description of the changes
- Reference any related issues
- Ensure all CI checks pass
- Be responsive to feedback

## Questions?

Feel free to open an issue for any questions or concerns!
