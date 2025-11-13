'use client'

import { usePagination, useSearch, useSorting } from 'nuqs-presets'
import { useMemo } from 'react'
import { products } from '@/lib/data'
import { Pagination } from './Pagination'
import { SearchBar } from './SearchBar'

export function ProductList() {
  const { query, debouncedQuery, setQuery } = useSearch({
    debounce: 300,
    minLength: 2,
  })

  const { sortBy, sortOrder, toggleSort, getSortIndicator } = useSorting({
    columns: ['name', 'price', 'date'] as const,
  })

  const filteredAndSorted = useMemo(() => {
    let result = [...products]

    if (debouncedQuery) {
      const searchLower = debouncedQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower)
      )
    }

    if (sortBy && sortOrder) {
      result.sort((a, b) => {
        const aVal = a[sortBy]
        const bVal = b[sortBy]

        if (sortBy === 'date') {
          const diff = new Date(aVal).getTime() - new Date(bVal).getTime()
          return sortOrder === 'asc' ? diff : -diff
        }

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
  }, [debouncedQuery, sortBy, sortOrder])

  const { page, pageSize, setPageSize, offset, hasNextPage, hasPrevPage, nextPage, prevPage } =
    usePagination({
      defaultPageSize: 10,
      totalItems: filteredAndSorted.length,
    })

  const paginatedProducts = filteredAndSorted.slice(offset, offset + pageSize)

  return (
    <div className="space-y-6">
      {/* Search */}
      <SearchBar query={query} setQuery={setQuery} />

      {/* Results info */}
      <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
        <p className="font-medium">
          Showing {offset + 1}-{Math.min(offset + pageSize, filteredAndSorted.length)} of{' '}
          {filteredAndSorted.length} products
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="pageSize" className="font-medium">
            Per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Sort buttons */}
      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => toggleSort('name')}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors font-medium"
        >
          Name {getSortIndicator('name')}
        </button>
        <button
          type="button"
          onClick={() => toggleSort('price')}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors font-medium"
        >
          Price {getSortIndicator('price')}
        </button>
        <button
          type="button"
          onClick={() => toggleSort('date')}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors font-medium"
        >
          Date {getSortIndicator('date')}
        </button>
      </div>

      {/* Product table */}
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
                Name
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
                Category
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-gray-100">
                Price
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                  {product.name}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{product.category}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-gray-100">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{product.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  )
}
