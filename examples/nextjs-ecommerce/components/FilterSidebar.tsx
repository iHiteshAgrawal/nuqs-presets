'use client'

import { useFilters } from 'nuqs-presets/filtering'
import { filterSchema } from '@/lib/filter-schema'
import { BRANDS, CATEGORIES } from '@/lib/products'

export function FilterSidebar() {
  const { filters, setFilter, clearFilters, hasFilters } = useFilters({
    schema: filterSchema,
  })

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Filters</h2>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Category</h3>
          <div className="space-y-2">
            {CATEGORIES.map((category) => (
              <label
                key={category}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.categories?.includes(category) ?? false}
                  onChange={(e) => {
                    const current = filters.categories ?? []
                    const newCategories = e.target.checked
                      ? [...current, category]
                      : current.filter((c) => c !== category)
                    setFilter('categories', newCategories.length > 0 ? newCategories : undefined)
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Price Range</h3>
          <div className="space-y-3">
            <div>
              <label
                htmlFor="minPrice"
                className="text-sm text-gray-700 dark:text-gray-300 block mb-1"
              >
                Min: ${filters.minPrice ?? 0}
              </label>
              <input
                id="minPrice"
                type="range"
                min="0"
                max="3000"
                step="50"
                value={filters.minPrice ?? 0}
                onChange={(e) =>
                  setFilter(
                    'minPrice',
                    Number(e.target.value) > 0 ? Number(e.target.value) : undefined
                  )
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="maxPrice"
                className="text-sm text-gray-700 dark:text-gray-300 block mb-1"
              >
                Max: ${filters.maxPrice ?? 3000}
              </label>
              <input
                id="maxPrice"
                type="range"
                min="0"
                max="3000"
                step="50"
                value={filters.maxPrice ?? 3000}
                onChange={(e) =>
                  setFilter(
                    'maxPrice',
                    Number(e.target.value) < 3000 ? Number(e.target.value) : undefined
                  )
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Brand</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {BRANDS.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.brands?.includes(brand) ?? false}
                  onChange={(e) => {
                    const current = filters.brands ?? []
                    const newBrands = e.target.checked
                      ? [...current, brand]
                      : current.filter((b) => b !== brand)
                    setFilter('brands', newBrands.length > 0 ? newBrands : undefined)
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === rating}
                  onChange={() => setFilter('minRating', rating)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{rating}+ ⭐</span>
              </label>
            ))}
            {filters.minRating && (
              <button
                type="button"
                onClick={() => setFilter('minRating', undefined)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline ml-2"
              >
                Clear rating
              </button>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock ?? false}
              onChange={(e) => setFilter('inStock', e.target.checked ? true : undefined)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="font-semibold text-gray-900 dark:text-gray-100">In Stock Only</span>
          </label>
        </div>
      </div>
    </div>
  )
}
