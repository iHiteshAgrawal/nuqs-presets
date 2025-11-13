# Dashboard Example - nuqs-presets

Admin analytics dashboard demonstrating tabs, date ranges, multi-select, KPI cards, and data visualization with both client-side and server-side rendering.

## Features

This example showcases:

- ✅ **Tab Navigation** with `useTabs` - Overview, Analytics, Reports, Settings
- ✅ **Date Range Filtering** with `useDateRange` - Preset ranges and custom selection
- ✅ **Multi-Select Filters** with `useMultiSelect` - Regions and Categories
- ✅ **KPI Cards** - Server-rendered metrics with real-time updates
- ✅ **Data Tables** with `useSorting` and `usePagination`
- ✅ **Server-side rendering** with `createSearchParamsCache`
- ✅ **Loading states** with Suspense boundaries
- ✅ **Responsive design** with dark mode support
- ✅ **Real-time filtering** with URL state persistence

## Demo

- **Comprehensive analytics** with revenue, users, conversions, and more
- **Multiple regions** (North America, Europe, Asia, etc.)
- **Multiple categories** (Electronics, Clothing, Books, etc.)
- **90 days of mock data** with realistic metrics
- **Server-side pre-calculation** of KPIs before client hydration

## Server-Side Patterns

### Search Params Cache

The `searchParamsCache` in `app/search-params.ts` parses all dashboard parameters:

```typescript
export const searchParamsCache = createSearchParamsCache({
  tab: parseAsStringEnum(['overview', 'analytics', 'reports', 'settings']).withDefault('overview'),
  startDate: parseAsString,
  endDate: parseAsString,
  regions: parseAsArrayOf(parseAsString).withDefault([]),
  categories: parseAsArrayOf(parseAsString).withDefault([]),
  sortBy: parseAsStringEnum(['name', 'revenue', 'users', 'conversionRate']).withDefault('revenue'),
  sortOrder: parseAsStringEnum(['asc', 'desc']).withDefault('desc'),
  page: parseAsFloat.withDefault(1),
  pageSize: parseAsFloat.withDefault(10),
})
```

### Server Components

**`components/KPICards.tsx`** (Server Component):
- Reads filters from `searchParamsCache.all()`
- Calculates KPIs on the server based on date range and filters
- Renders metrics before client hydration
- Shows loading state during streaming

### Client Components

**`components/TabNavigation.tsx`**:
- Uses `useTabs` for type-safe tab switching
- Highlights active tab
- Persists selection to URL

**`components/DateRangePicker.tsx`**:
- Uses `useDateRange` with preset options
- Custom date range selection
- Formats dates for display

**`components/RegionMultiSelect.tsx`** & **`components/CategoryMultiSelect.tsx`**:
- Use `useMultiSelect` for array-based selection
- Select all / deselect all functionality
- Visual feedback for selected items

**`components/DataTable.tsx`**:
- Uses `useSorting` for column sorting
- Uses `usePagination` for page navigation
- Client-side filtering based on selections

## Code Structure

```
app/
  page.tsx                      # Server component with cache and Suspense
  layout.tsx                    # Root layout with NuqsAdapter
  globals.css                   # Tailwind styles
  search-params.ts              # Search params cache definition

components/
  TabNavigation.tsx             # Tab switcher (client)
  DateRangePicker.tsx           # Date range selector (client)
  RegionMultiSelect.tsx         # Region filter (client)
  CategoryMultiSelect.tsx       # Category filter (client)
  KPICards.tsx                  # KPI metrics (server)
  DataTable.tsx                 # Sortable table (client)
  LoadingCards.tsx              # Loading skeleton

lib/
  analytics.ts                  # Mock data and KPI calculations
```

## Installation

```bash
npm install
npm run dev
```

Visit [http://localhost:3002](http://localhost:3002)

## Key Learnings

### 1. Tab Navigation

```typescript
const { activeTab, setTab, isActive } = useTabs(['overview', 'analytics', 'reports', 'settings'])
```

Type-safe tabs with automatic URL synchronization.

### 2. Date Range Filtering

```typescript
const { startDate, endDate, setRange, applyPreset } = useDateRange({
  defaultPreset: 'last7days',
})

// Apply preset
applyPreset('last30days')

// Custom range
setRange(new Date('2024-01-01'), new Date('2024-01-31'))
```

### 3. Multi-Select

```typescript
const { selected, toggle, selectAll, deselectAll, isSelected } = useMultiSelect({
  allItems: ALL_REGIONS,
})
```

Manage multiple selections with helper functions.

### 4. Server-Side KPI Calculation

```typescript
// components/KPICards.tsx (Server Component)
export function KPICards() {
  const { startDate, endDate, regions, categories } = searchParamsCache.all()

  const kpis = calculateKPIs(metricsData, {
    startDate,
    endDate,
    regions: regions.length > 0 ? regions : undefined,
    categories: categories.length > 0 ? categories : undefined,
  })

  return <div>{/* Render KPIs */}</div>
}
```

KPIs are calculated on the server based on URL parameters, ensuring fast initial render.

### 5. Suspense Boundaries

```typescript
// app/page.tsx
<Suspense fallback={<LoadingCards />}>
  <KPICards />
</Suspense>
```

Stream heavy calculations while showing loading states.

## Related Hooks

- [`useTabs`](/src/hooks/tabs) - Type-safe tab navigation
- [`useDateRange`](/src/hooks/date-range) - Date range selection with presets
- [`useMultiSelect`](/src/hooks/multi-select) - Multi-item selection
- [`useSorting`](/src/hooks/sorting) - Column sorting
- [`usePagination`](/src/hooks/pagination) - Page navigation

## Next Steps

Try adding:
- Chart visualizations for trends
- Export functionality (CSV, PDF)
- Custom metric cards
- Advanced date range presets (quarters, years)
- Metric comparisons (YoY, MoM)
