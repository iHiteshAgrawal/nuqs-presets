'use client'

import { useFilters } from 'nuqs-presets/filtering'
import { useSearch } from 'nuqs-presets/search'
import { filterParsers } from '@/app/search-params'

export function FilterBadges() {
  const { filters, setFilter, clearFilters, hasFilters } = useFilters({
    parsers: filterParsers,
  })
  const { debouncedQuery, setQuery } = useSearch({
    debounce: 300,
    minLength: 1,
  })

  const badges = []

  if (debouncedQuery) {
    badges.push({
      label: `Search: "${debouncedQuery}"`,
      onRemove: () => setQuery(''),
    })
  }

  if (filters.categories?.length) {
    for (const category of filters.categories) {
      badges.push({
        label: `Category: ${category}`,
        onRemove: () => {
          const newCategories = filters.categories?.filter((c) => c !== category)
          setFilter('categories', newCategories?.length ? newCategories : null)
        },
      })
    }
  }

  if (filters.brands?.length) {
    for (const brand of filters.brands) {
      badges.push({
        label: `Brand: ${brand}`,
        onRemove: () => {
          const newBrands = filters.brands?.filter((b) => b !== brand)
          setFilter('brands', newBrands?.length ? newBrands : null)
        },
      })
    }
  }

  if (filters.minPrice !== null && filters.minPrice !== undefined) {
    badges.push({
      label: `Min: $${filters.minPrice}`,
      onRemove: () => setFilter('minPrice', null),
    })
  }

  if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
    badges.push({
      label: `Max: $${filters.maxPrice}`,
      onRemove: () => setFilter('maxPrice', null),
    })
  }

  if (filters.minRating !== null && filters.minRating !== undefined) {
    badges.push({
      label: `Rating: ${filters.minRating}+ ⭐`,
      onRemove: () => setFilter('minRating', null),
    })
  }

  if (filters.inStock) {
    badges.push({
      label: 'In Stock',
      onRemove: () => setFilter('inStock', null),
    })
  }

  if (badges.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active filters:</span>
      {badges.map((badge, index) => (
        <span
          key={`${badge.label}-${index}`}
          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
        >
          {badge.label}
          <button
            type="button"
            onClick={badge.onRemove}
            className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <title>Remove filter</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </span>
      ))}
      {hasFilters && (
        <button
          type="button"
          onClick={() => {
            clearFilters()
            setQuery('')
          }}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          Clear all
        </button>
      )}
    </div>
  )
}
