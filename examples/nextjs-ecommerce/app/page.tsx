import { FilterSidebar } from '@/components/FilterSidebar'
import { ProductGrid } from '@/components/ProductGrid'
import { SearchBar } from '@/components/SearchBar'
import { ServerFilterSummary } from '@/components/ServerFilterSummary'
import { searchParamsCache } from './search-params'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  await searchParamsCache.parse(await searchParams)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            E-commerce Store
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
            Advanced filtering with nuqs-presets
          </p>
          <ServerFilterSummary />
        </header>

        <SearchBar />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <aside className="lg:col-span-1">
            <FilterSidebar />
          </aside>

          <div className="lg:col-span-3">
            <ProductGrid />
          </div>
        </div>
      </div>
    </main>
  )
}
