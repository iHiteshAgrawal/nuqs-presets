'use client'

import { useFilters } from 'nuqs-presets/filtering'
import { usePagination } from 'nuqs-presets/pagination'
import { useSearch } from 'nuqs-presets/search'
import { useSorting } from 'nuqs-presets/sorting'
import { useMemo } from 'react'
import { filterSchema } from '@/lib/filter-schema'
import { getFilteredProducts, products } from '@/lib/products'
import { FilterBadges } from './FilterBadges'
import { Pagination } from './Pagination'
import { SortDropdown } from './SortDropdown'

export function ProductGrid() {
  const { debouncedQuery } = useSearch({
    debounce: 300,
    minLength: 1,
  })

  const { filters } = useFilters({
    schema: filterSchema,
  })

  const { sortBy, sortOrder } = useSorting({
    columns: ['name', 'price', 'rating'] as const,
  })

  const filteredAndSorted = useMemo(() => {
    let result = getFilteredProducts({
      ...filters,
      search: debouncedQuery,
    })

    if (sortBy && sortOrder) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortBy]
        const bVal = b[sortBy]

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
        }

        const strA = String(aVal).toLowerCase()
        const strB = String(bVal).toLowerCase()
        const comparison = strA.localeCompare(strB)
        return sortOrder === 'asc' ? comparison : -comparison
      })
    }

    return result
  }, [debouncedQuery, filters, sortBy, sortOrder])

  const { page, pageSize, setPageSize, offset, hasNextPage, hasPrevPage, nextPage, prevPage } =
    usePagination({
      defaultPageSize: 12,
      totalItems: filteredAndSorted.length,
    })

  const paginatedProducts = filteredAndSorted.slice(offset, offset + pageSize)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {filteredAndSorted.length} {filteredAndSorted.length === 1 ? 'product' : 'products'}
          </p>
          <SortDropdown />
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="pageSize"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>
      </div>

      <FilterBadges />

      {filteredAndSorted.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            No products found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-6xl">
                  {product.image}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                      {product.name}
                    </h3>
                    {!product.inStock && (
                      <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-1 rounded font-medium whitespace-nowrap">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {product.brand}
                    </span>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      ${product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            page={page}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            nextPage={nextPage}
            prevPage={prevPage}
            totalItems={filteredAndSorted.length}
            pageSize={pageSize}
          />
        </>
      )}
    </div>
  )
}
