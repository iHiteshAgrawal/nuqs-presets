# E-commerce Example - nuqs-presets

Advanced e-commerce product catalog demonstrating comprehensive filtering, search, sorting, and pagination with both client-side and server-side rendering patterns.

## Features

This example showcases:

- ✅ **Advanced Filtering** with `useFilters` + Zod validation
  - Multi-select category filter
  - Multi-select brand filter
  - Price range slider (min/max)
  - Rating filter
  - In-stock toggle
- ✅ **Debounced Search** with `useSearch`
- ✅ **Multi-column Sorting** with `useSorting`
- ✅ **Pagination** with `usePagination`
- ✅ **Server-side rendering** with `createSearchParamsCache`
- ✅ **Filter badges** with individual removal
- ✅ **Empty states** and loading indicators
- ✅ **Responsive design** with dark mode support
- ✅ **Type-safe** filters with Zod schema validation

## Demo

- **105 mock products** across 4 categories (Electronics, Clothing, Books, Home & Garden)
- **Multiple brands** (Apple, Samsung, Nike, Adidas, IKEA, and more)
- **Real-time filtering** with URL state persistence
- **Server-side pre-filtering** with initial render optimization

## Server-Side Patterns

### Search Params Cache

The `searchParamsCache` in `app/search-params.ts` demonstrates how to parse and validate search parameters on the server:

```typescript
export const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(''),
  categories: parseAsArrayOf(parseAsString).withDefault([]),
  brands: parseAsArrayOf(parseAsString).withDefault([]),
  minPrice: parseAsFloat,
  maxPrice: parseAsFloat,
  minRating: parseAsFloat,
  inStock: parseAsBoolean,
  sortBy: parseAsStringEnum(['name', 'price', 'rating']),
  sortOrder: parseAsStringEnum(['asc', 'desc']),
  page: parseAsFloat.withDefault(1),
  pageSize: parseAsFloat.withDefault(12),
})
```

### Server Components

**`app/page.tsx`** (Server Component):
- Parses search params on the server before rendering
- Passes pre-filtered state to client components

**`components/ServerFilterSummary.tsx`** (Server Component):
- Reads from `searchParamsCache.all()` to display filter summary
- Calculates filtered product count on the server
- Renders before client hydration for immediate feedback

### Client Components

**`components/ProductGrid.tsx`**:
- Uses `useFilters`, `useSearch`, `useSorting`, `usePagination` hooks
- Filters and sorts products client-side for instant feedback
- Syncs with URL automatically

**`components/FilterSidebar.tsx`**:
- Multi-select filters with Zod validation
- Price range sliders
- Rating radio buttons
- In-stock checkbox

## Code Structure

```
app/
  page.tsx                    # Server component with cache
  layout.tsx                  # Root layout with NuqsAdapter
  globals.css                 # Tailwind styles
  search-params.ts            # Search params cache definition

components/
  ProductGrid.tsx             # Main product grid (client)
  FilterSidebar.tsx           # Filter UI (client)
  SearchBar.tsx               # Search input (client)
  SortDropdown.tsx            # Sort selector (client)
  Pagination.tsx              # Pagination controls (client)
  FilterBadges.tsx            # Active filter badges (client)
  ServerFilterSummary.tsx     # Server-rendered summary

lib/
  products.ts                 # Mock data (105 products)
  filter-schema.ts            # Zod validation schema
```

## Filter Schema

The `filterSchema` in `lib/filter-schema.ts` uses Zod for type-safe validation:

```typescript
export const filterSchema = z.object({
  categories: z.array(z.enum(['Electronics', 'Clothing', 'Books', 'Home & Garden'])).optional(),
  brands: z.array(z.string()).optional(),
  minPrice: z.number().min(0).max(10000).optional(),
  maxPrice: z.number().min(0).max(10000).optional(),
  minRating: z.number().min(0).max(5).optional(),
  inStock: z.boolean().optional(),
})
```

This ensures:
- Type safety across client and server
- Runtime validation of URL parameters
- Automatic type inference for filters

## Installation

```bash
npm install
npm run dev
```

Visit [http://localhost:3001](http://localhost:3001)

## Key Learnings

### 1. Server-Side Cache Pattern

```typescript
// app/page.tsx
export default async function Page({ searchParams }) {
  await searchParamsCache.parse(await searchParams)
  return <ServerFilterSummary />
}

// components/ServerFilterSummary.tsx
export function ServerFilterSummary() {
  const { categories, brands } = searchParamsCache.all()
  // Use server-side values
}
```

### 2. Client-Side Hooks

```typescript
// components/ProductGrid.tsx
'use client'

const { filters } = useFilters({ schema: filterSchema })
const { debouncedQuery } = useSearch({ debounce: 300 })
const { sortBy, sortOrder } = useSorting({ columns: ['name', 'price', 'rating'] })
const { page, pageSize } = usePagination({ defaultPageSize: 12 })
```

### 3. Type Safety

All hooks provide full TypeScript support:
- `filters` is typed based on Zod schema
- `sortBy` is typed as `'name' | 'price' | 'rating' | null`
- `sortOrder` is typed as `'asc' | 'desc' | null`

### 4. URL State Persistence

All filter state is automatically persisted to the URL:
- Shareable links work out of the box
- Back/forward navigation preserves filters
- Refresh maintains filter state

## Related Hooks

- [`useFilters`](/src/hooks/filtering) - Type-safe filter management
- [`useSearch`](/src/hooks/search) - Debounced search
- [`useSorting`](/src/hooks/sorting) - Column sorting
- [`usePagination`](/src/hooks/pagination) - Page navigation

## Next Steps

Try modifying:
- Add more filter types (date ranges, multi-select tags)
- Implement filter presets ("Best Sellers", "New Arrivals")
- Add URL sharing functionality
- Implement filter history/breadcrumbs
