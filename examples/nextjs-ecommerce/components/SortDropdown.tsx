'use client'

import { useSorting } from 'nuqs-presets/sorting'

export function SortDropdown() {
  const { sortBy, sortOrder, setSort, clearSort } = useSorting({
    columns: ['name', 'price', 'rating'] as const,
  })

  const sortValue = sortBy && sortOrder ? `${sortBy}-${sortOrder}` : ''

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Sort by:
      </label>
      <select
        id="sort"
        value={sortValue}
        onChange={(e) => {
          if (!e.target.value) {
            clearSort()
            return
          }
          const [column, order] = e.target.value.split('-') as [
            'name' | 'price' | 'rating',
            'asc' | 'desc',
          ]
          setSort(column, order)
        }}
        className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Default</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
        <option value="rating-desc">Rating (High to Low)</option>
        <option value="rating-asc">Rating (Low to High)</option>
      </select>
    </div>
  )
}
