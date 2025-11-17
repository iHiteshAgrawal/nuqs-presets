# nuqs-presets

> High-level pattern hooks for [nuqs](https://nuqs.dev) - Stop reinventing pagination, filtering, sorting, and search.

[![NPM Version](https://img.shields.io/npm/v/nuqs-presets)](https://www.npmjs.com/package/nuqs-presets)
[![License](https://img.shields.io/npm/l/nuqs-presets)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Why?

[nuqs](https://nuqs.dev) is an excellent library for managing URL state, but building common patterns like pagination, filtering, and sorting still requires boilerplate. **nuqs-presets** provides ready-to-use hooks that solve these patterns with best practices baked in.

### Before

```tsx
// 30+ lines of boilerplate for pagination alone
const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
const [pageSize, setPageSize] = useQueryState('pageSize', parseAsInteger.withDefault(10))
// ... handle navigation, validation, edge cases ...
```

### After

```tsx
// 2 lines, everything handled
const { page, pageSize, nextPage, prevPage, hasNextPage } = usePagination()
```

## Features

- ✅ **7 production-ready hooks** - Pagination, filtering, sorting, search, tabs, date ranges, multi-select
- ✅ **Type-safe** - Full TypeScript support with excellent inference
- ✅ **Zero config** - Sensible defaults for immediate use
- ✅ **Customizable** - Override any behavior when needed
- ✅ **Tiny** - Tree-shakeable, minimal bundle size
- ✅ **Framework agnostic** - Works anywhere nuqs works (Next.js, Remix, React Router, etc.)

## Installation

You can install nuqs-presets in two ways:

### Option 1: NPM Package (Recommended for most users)

```bash
npm install nuqs-presets nuqs
# or
pnpm add nuqs-presets nuqs
# or
yarn add nuqs-presets nuqs
# or
bun add nuqs-presets nuqs
```

**Requirements:**
- `nuqs` ^2.0.0
- `react` ^18.3.0 or ^19.0.0

### Option 2: shadcn Registry (For customization)

Install hooks directly into your project for full control and customization:

**Direct URL Installation:**
```bash
npx shadcn add https://ihiteshagrawal.github.io/nuqs-presets/r/use-pagination.json
npx shadcn add https://ihiteshagrawal.github.io/nuqs-presets/r/use-sorting.json
npx shadcn add https://ihiteshagrawal.github.io/nuqs-presets/r/use-filters.json
# ... other hooks
```

**With Namespace (Recommended):**

First, add the registry to your `components.json`:
```json
{
  "aliases": {
    "hooks": "@/hooks",
    "lib": "@/lib"
  },
  "registries": {
    "nuqs-presets": "https://ihiteshagrawal.github.io/nuqs-presets/r"
  }
}
```

Then install hooks by name:
```bash
npx shadcn add nuqs-presets:use-pagination
npx shadcn add nuqs-presets:use-sorting
npx shadcn add nuqs-presets:use-filters
```

**Available Registry Hooks:**
- `use-pagination` - Complete pagination hook
- `use-search` - Debounced search hook
- `use-sorting` - Multi-column sorting hook
- `use-filtering` - Type-safe filter management
- `use-multi-select` - Array-based multi-selection
- `use-tabs` - Type-safe tab navigation
- `use-date-range` - Date range with presets

**When to use Registry vs NPM:**
- **NPM Package**: Stable, versioned releases. Best for most projects.
- **Registry**: Direct file installation. Best when you need to customize implementations, modify behavior, or don't want the package dependency.

## Quick Start

### 1. Set up nuqs adapter

Follow the [nuqs setup guide](https://nuqs.dev/docs/installation) for your framework:

```tsx
// Next.js App Router - app/layout.tsx
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  )
}
```

### 2. Use presets in your components

```tsx
'use client'

import { usePagination, useFilters, useSorting } from 'nuqs-presets'
import { parseAsString, parseAsFloat } from 'nuqs'

const filterParsers = {
  category: parseAsString,
  minPrice: parseAsFloat,
}

export function ProductList() {
  const { page, pageSize, nextPage, prevPage, hasNextPage, hasPrevPage } = usePagination()

  const { filters, setFilter, clearFilters } = useFilters({
    parsers: filterParsers,
  })

  const { sortBy, sortOrder, toggleSort } = useSorting({
    columns: ['name', 'price', 'date'] as const
  })

  return (
    <div>
      {/* Your UI */}
      <button onClick={prevPage} disabled={!hasPrevPage}>Previous</button>
      <span>Page {page}</span>
      <button onClick={nextPage} disabled={!hasNextPage}>Next</button>
    </div>
  )
}
```

## Hooks

### usePagination

Complete pagination with all the bells and whistles.

```tsx
const {
  page,          // Current page (1-indexed)
  pageSize,      // Items per page
  totalPages,    // Total pages (computed)
  hasNextPage,   // Can go forward
  hasPrevPage,   // Can go back
  nextPage,      // Go to next page
  prevPage,      // Go to previous page
  goToPage,      // Go to specific page
  setPageSize,   // Change page size
} = usePagination({
  defaultPageSize: 10,
  totalItems: 1000,
})
```

### useFilters

Type-safe filter management with nuqs parsers.

```tsx
import { parseAsString, parseAsFloat } from 'nuqs'

const filterParsers = {
  category: parseAsString,
  minPrice: parseAsFloat,
  maxPrice: parseAsFloat,
  inStock: parseAsBoolean,
}

const {
  filters,       // Current filters (type-safe)
  setFilter,     // Set a single filter
  clearFilters,  // Clear all filters
  hasFilters,    // Any filters active?
} = useFilters({
  parsers: filterParsers,
})

// filters.category is string | null
// filters.minPrice is number | null
```

### useSorting

Smart column sorting with toggle behavior.

```tsx
const {
  sortBy,        // Current sort column
  sortOrder,     // 'asc' | 'desc' | null
  toggleSort,    // Toggle column (null → asc → desc → null)
  isSortedBy,    // Check if column is sorted
} = useSorting({
  columns: ['name', 'date', 'price'] as const
})
```

### useSearch

Debounced search with min length validation.

```tsx
const {
  query,           // Current search query
  debouncedQuery,  // Debounced value for API calls
  setQuery,        // Update search
  isDebouncing,    // Debounce in progress
} = useSearch({
  debounce: 300,
  minLength: 2,
})
```

### useTabs

Type-safe tab navigation.

```tsx
const {
  activeTab,     // Current tab (type-safe)
  setTab,        // Change tab
  isActive,      // Check if tab is active
} = useTabs(['overview', 'analytics', 'settings'] as const)
```

### useDateRange

Date range selection with presets.

```tsx
const {
  startDate,     // Start date
  endDate,       // End date
  setRange,      // Set both dates
  presets,       // Quick presets (last 7 days, etc.)
} = useDateRange({
  defaultPreset: 'last7days'
})
```

### useMultiSelect

Array-based multi-selection.

```tsx
const {
  selected,      // Selected items
  toggle,        // Toggle selection
  selectAll,     // Select all
  deselectAll,   // Deselect all
} = useMultiSelect({
  allItems: ['item1', 'item2', 'item3']
})
```

## API Reference

For detailed API documentation for each hook, see the source code or TypeScript definitions. All hooks are fully typed with JSDoc comments.

## Live Examples

This repository includes working example applications in the `examples/` directory. These are complete, runnable apps that demonstrate real-world usage.

### 🚀 Available Examples

#### [nextjs-basic](./examples/nextjs-basic) - ✅ Complete
A simple Next.js 16 app demonstrating basic usage with:
- Pagination with page size control
- Debounced search
- Multi-column sorting
- Clean, modern UI with dark mode support

**Run it:**
```bash
cd examples/nextjs-basic
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

#### [nextjs-ecommerce](./examples/nextjs-ecommerce) - 🧪 Beta
Advanced e-commerce filtering interface with:
- Multi-faceted filtering (category, price range, brand)
- Filter badges with clear functionality
- Type-safe parsers with nuqs

**Run it:**
```bash
cd examples/nextjs-ecommerce
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

#### [nextjs-dashboard](./examples/nextjs-dashboard) - 🧪 Beta
Admin dashboard demonstrating:
- Tab-based navigation
- Data tables with all features
- Date range filtering

**Run it:**
```bash
cd examples/nextjs-dashboard
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

#### [react-vite](./examples/react-vite) - 📦 Coming Soon
Framework-agnostic React SPA with:
- Vite for fast development
- React Router integration
- Client-side routing

See the [examples README](./examples/README.md) for more details.

## Code Examples

### E-commerce Product List

```tsx
'use client'

import { usePagination, useFilters, useSorting, useSearch } from 'nuqs-presets'
import { parseAsString, parseAsFloat, parseAsBoolean } from 'nuqs'

const filterParsers = {
  category: parseAsString,
  minPrice: parseAsFloat,
  maxPrice: parseAsFloat,
  inStock: parseAsBoolean,
}

export function ProductList() {
  const { page, pageSize, setPage, hasNextPage, hasPrevPage } = usePagination({
    defaultPageSize: 24,
    totalItems: 1000,
  })

  const { filters, setFilter, clearFilters, hasFilters } = useFilters({
    parsers: filterParsers,
  })

  const { sortBy, sortOrder, toggleSort } = useSorting({
    columns: ['name', 'price', 'rating'] as const,
    defaultColumn: 'name',
    defaultOrder: 'asc',
  })

  const { query, debouncedQuery, setQuery } = useSearch({
    debounce: 300,
    minLength: 2,
  })

  // Fetch products with all filters
  const { data: products } = useProducts({
    page,
    pageSize,
    ...filters,
    sortBy,
    sortOrder,
    search: debouncedQuery,
  })

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />

      <div>
        <select onChange={(e) => setFilter('category', e.target.value)}>
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="books">Books</option>
          <option value="clothing">Clothing</option>
        </select>

        <button onClick={clearFilters} disabled={!hasFilters}>
          Clear Filters
        </button>
      </div>

      <div>
        <button onClick={() => toggleSort('name')}>
          Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button onClick={() => toggleSort('price')}>
          Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>

      <div>
        {products?.map((product) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>

      <div>
        <button onClick={() => setPage(page - 1)} disabled={!hasPrevPage}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)} disabled={!hasNextPage}>
          Next
        </button>
      </div>
    </div>
  )
}
```

## Tree-shaking

All hooks are tree-shakeable. Import only what you need:

```tsx
// Import individual hooks
import { usePagination } from 'nuqs-presets/pagination'
import { useFilters } from 'nuqs-presets/filtering'
import { useSorting } from 'nuqs-presets/sorting'
```

## TypeScript

All hooks are fully typed with excellent type inference. No need to manually specify types in most cases:

```tsx
const { activeTab } = useTabs(['overview', 'analytics', 'settings'] as const)
// activeTab is typed as 'overview' | 'analytics' | 'settings'

const filterParsers = {
  category: parseAsString,
  minPrice: parseAsFloat,
}

const { filters } = useFilters({
  parsers: filterParsers,
})
// filters.category is typed as string | null
// filters.minPrice is typed as number | null
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) first.

### For Contributors: Registry Sync Workflow

This project maintains **two distribution methods** with different source locations:

1. **NPM Package** (`src/` directory)
   - Uses TypeScript path aliases (`@/types`, `@/utils`)
   - Source of truth for the package
   - Built with `tsup` for npm distribution

2. **shadcn Registry** (`registry/default/` directory)
   - Uses relative imports matching installed structure
   - Synced from `src/` with automated transformations
   - Built with `shadcn build` for registry distribution

### Making Changes

When contributing, follow this workflow:

**1. Edit source files in `src/`**
```bash
# Make your changes in src/ directory
# This is the source of truth for the npm package
```

**2. Sync to registry**
```bash
npm run registry:sync
```
This automatically:
- Copies files from `src/` to `registry/default/`
- Transforms import paths (e.g., `@/types` → `../types`)
- Detects specific utility imports and transforms to specific files
- Ensures registry hooks match npm package exactly

**3. Build registry**
```bash
npm run registry:build
```

**4. Test both distributions**
```bash
# Test npm package
npm run build
npm run test

# Test registry installation
cd /tmp/test-project
npx shadcn add /path/to/nuqs-presets/public/r/use-pagination.json
npm run build
```

**5. Commit changes**
```bash
# Create a feature branch
git checkout -b feat/your-feature

# Commit both src/ and registry/ changes
git add src/ registry/ public/r/
git commit -m "feat: your feature"

# Push and create PR
git push origin feat/your-feature
```

### Why Two Sources?

The two-source system exists because:
- **NPM users** expect a standard package with clean imports via path aliases
- **Registry users** need files with relative imports that work when copied directly into their projects
- **shadcn CLI** copies file content verbatim without transforming imports
- **Automated sync** ensures both distributions stay in sync and provide identical functionality

The sync script intelligently transforms imports:
- `@/types` → `../types` or `../../types` (depending on depth)
- `@/utils` → `../../lib/utils/[specific-file]` (detects what's imported)
- `import { clamp } from '@/utils'` → `import { clamp } from '../../lib/utils/validation'`

This approach gives users the best of both worlds: a stable npm package and customizable registry hooks.

## License

MIT © [Hitesh Agrawal](https://github.com/iHiteshAgrawal)

## Credits

Built on top of the excellent [nuqs](https://nuqs.dev) by [François Best](https://github.com/47ng).

## Star History

[![Star History](https://api.star-history.com/svg?repos=iHiteshAgrawal/nuqs-presets&type=Date)](https://star-history.com/#iHiteshAgrawal/nuqs-presets)

---

**⭐ If you find this useful, please star the repo!**
