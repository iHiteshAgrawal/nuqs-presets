# Next.js Basic Example

A simple Next.js application demonstrating basic usage of `nuqs-presets` hooks.

## Features

- ✅ **Pagination** - Navigate through pages of products
- ✅ **Search** - Debounced search functionality
- ✅ **Sorting** - Sort by name, price, or date
- ✅ **URL State** - All state persisted in URL
- ✅ **Type-safe** - Full TypeScript support

## Getting Started

### Install dependencies

From the root of the monorepo:

```bash
npm install
```

### Run the development server

```bash
cd examples/nextjs-basic
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## What's Demonstrated

### usePagination

Navigate through pages with previous/next buttons and page size selection.

```tsx
const { page, pageSize, setPageSize, nextPage, prevPage, hasNextPage, hasPrevPage } = usePagination({
  defaultPageSize: 10,
  totalItems: products.length,
})
```

### useSearch

Search products with debounced input.

```tsx
const { query, debouncedQuery, setQuery } = useSearch({
  debounce: 300,
  minLength: 2,
})
```

### useSorting

Sort products by different columns with toggle behavior.

```tsx
const { sortBy, sortOrder, toggleSort, getSortIndicator } = useSorting({
  columns: ['name', 'price', 'date'] as const,
})
```

## Project Structure

```
nextjs-basic/
├── app/
│   ├── layout.tsx          # Root layout with NuqsAdapter
│   ├── page.tsx            # Home page with product list
│   └── globals.css         # Global styles
├── components/
│   ├── ProductList.tsx     # Product list with all hooks
│   ├── Pagination.tsx      # Pagination controls
│   └── SearchBar.tsx       # Search input
├── lib/
│   └── data.ts             # Mock product data
└── package.json
```

## Key Learnings

1. **Setup nuqs adapter** - Wrap your app with `NuqsAdapter` in the root layout
2. **Combine hooks** - Multiple hooks work seamlessly together
3. **URL persistence** - All state is automatically synced to URL
4. **Type safety** - TypeScript infers types from hook options

## Next Steps

- Check out [nextjs-ecommerce](../nextjs-ecommerce) for advanced filtering
- Try [nextjs-dashboard](../nextjs-dashboard) for tab navigation and date ranges
- See [react-vite](../react-vite) for framework-agnostic usage

## License

MIT
