# nuqs-presets

## 0.1.2 - 2025-11-14

### 🐛 Bug Fixes

- **`useFilters`** - Fixed type safety by properly inferring filter types from parsers using `Values<TParsers>`
- **`useFilters`** - Fixed null handling throughout the filtering system
  - FilterBadges now correctly checks for `!= null` instead of `!== undefined`
  - Product filtering now properly handles null values from parsers
  - Filter removal now sets `null` instead of `undefined` to match nuqs behavior
- Fixed false-positive active filters showing null values (e.g., "Min: $null, Max: $null")
- Fixed products not displaying when all filters were null

## 0.1.1 - 2025-11-13

### 🐛 Bug Fixes

- Fix package.json exports to use correct file extensions (`.js` for ESM, `.cjs` for CJS)
- Fix `main` and `module` fields to point to actual build outputs

## 0.1.0 - 2025-11-13

### 🎉 Initial Release

First stable release of nuqs-presets - a collection of high-level pattern hooks built on top of nuqs for common URL state management patterns.

### ✨ Features

#### Core Hooks
- **`usePagination`** - URL-based pagination with configurable page size and total items
  - Auto-syncs page and pageSize to URL query parameters
  - Provides navigation helpers (next, previous, goToPage)
  - Calculates total pages automatically
  
- **`useSearch`** - Debounced search with URL state synchronization
  - Configurable debounce delay (default: 300ms)
  - Auto-clears on empty input
  - Provides search handler and clear function

- **`useSorting`** - Multi-column sorting with direction support
  - Supports 'asc', 'desc', and null states
  - Provides toggle and update helpers
  - Type-safe sort field definitions

- **`useFilters`** - Type-safe filtering with optional Zod schema validation
  - Set/remove individual or multiple filters
  - Clear all filters at once
  - Runtime validation with Zod schemas

- **`useTabs`** - Tab navigation state management
  - Simple active tab tracking in URL
  - Type-safe tab values
  - Default tab support

- **`useDateRange`** - Date range selection with preset support
  - Built-in presets (today, yesterday, last 7/30/90 days, custom)
  - ISO string serialization
  - Custom preset definitions

- **`useMultiSelect`** - Multi-selection state management
  - Add/remove items
  - Toggle selection
  - Clear all selections

### 📦 Package Features
- Full TypeScript support with strict types
- Modular exports for optimal tree-shaking
- ESM and CJS builds
- Server-side rendering (SSR) compatible
- Zero dependencies (peer deps: nuqs, react)
- Comprehensive test coverage

### 📚 Documentation
- Complete API documentation in README
- Live Next.js 16 example app
- Usage examples for all hooks
- TypeScript examples and best practices

### 🔧 Developer Tools
- Changesets for version management
- Biome for linting and formatting
- Vitest for testing
- Size-limit for bundle size monitoring
- Publint for package validation

---

For detailed usage instructions and API documentation, see the [README](./README.md).
