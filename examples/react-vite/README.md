# React + Vite Example - nuqs-presets

Framework-agnostic blog application demonstrating nuqs-presets with React Router in a client-side SPA.

## Features

This example showcases:

- ✅ **Framework Agnostic** - nuqs-presets works outside Next.js
- ✅ **Client-side Routing** - React Router 7 integration
- ✅ **Fast Development** - Vite for instant HMR
- ✅ **Search** with `useSearch` - Debounced article search
- ✅ **Multi-Select Tags** with `useMultiSelect` - Filter by multiple tags
- ✅ **Sorting** with `useSorting` - Sort by title, date, or read time
- ✅ **Pagination** with `usePagination` - Navigate article pages
- ✅ **URL State** - All state persisted to URL for sharing

## Demo

- **10 mock articles** with realistic content
- **Multiple tags** (React, TypeScript, JavaScript, etc.)
- **Real-time filtering** with URL synchronization
- **Client-side routing** with React Router

## Setup

### NuqsAdapter with React Router

```typescript
// src/main.tsx
import { BrowserRouter } from 'react-router-dom'
import { NuqsAdapter } from 'nuqs/adapters/react-router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <NuqsAdapter>
      <Routes>
        <Route path="/" element={<ArticleList />} />
      </Routes>
    </NuqsAdapter>
  </BrowserRouter>
)
```

### Using Hooks in Components

```typescript
// src/routes/articles.tsx
import { useSearch, useSorting, usePagination, useMultiSelect } from 'nuqs-presets'

export function ArticleList() {
  const { query, debouncedQuery } = useSearch({ debounce: 300 })
  const { selected, toggle } = useMultiSelect({ allItems: ALL_TAGS })
  const { sortBy, sortOrder, toggleSort } = useSorting({
    columns: ['title', 'date', 'readTime'],
  })
  const { page, nextPage, prevPage } = usePagination({
    defaultPageSize: 5,
    totalItems: filteredArticles.length,
  })

  // Filter and sort articles...
}
```

## Code Structure

```
src/
  main.tsx                # Entry point with NuqsAdapter
  index.css               # Base styles
  routes/
    articles.tsx          # Article list page
  data/
    articles.ts           # Mock article data
```

## Installation

```bash
npm install
npm run dev
```

Visit [http://localhost:3003](http://localhost:3003)

## Key Learnings

### 1. Framework Agnostic

nuqs-presets works with **any framework** that nuqs supports:
- ✅ Next.js (App Router or Pages Router)
- ✅ React with React Router
- ✅ Remix
- ✅ Any React-based framework

### 2. NuqsAdapter Setup

Different frameworks require different adapters:

```typescript
// Next.js App Router
import { NuqsAdapter } from 'nuqs/adapters/next/app'

// React Router
import { NuqsAdapter } from 'nuqs/adapters/react-router'

// Remix
import { NuqsAdapter } from 'nuqs/adapters/remix'
```

### 3. Client-Side State Management

All hooks work client-side with automatic URL synchronization:

```typescript
const { query, setQuery } = useSearch()
// URL: /?q=react

const { selected, toggle } = useMultiSelect({ allItems: TAGS })
// URL: /?tags=React&tags=TypeScript

const { page } = usePagination()
// URL: /?page=2
```

### 4. Type Safety

Full TypeScript support with type inference:

```typescript
const { sortBy } = useSorting({
  columns: ['title', 'date', 'readTime'] as const,
})
// sortBy is typed as 'title' | 'date' | 'readTime' | null
```

## Related Hooks

- [`useSearch`](/src/hooks/search) - Debounced search
- [`useMultiSelect`](/src/hooks/multi-select) - Multi-item selection
- [`useSorting`](/src/hooks/sorting) - Column sorting
- [`usePagination`](/src/hooks/pagination) - Page navigation

## Next Steps

Try adding:
- More article data and categories
- Advanced search with filters
- Bookmark functionality
- Reading progress tracking
- Dark mode toggle
