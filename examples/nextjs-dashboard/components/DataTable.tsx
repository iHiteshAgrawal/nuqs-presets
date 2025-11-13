'use client'

import { usePagination } from 'nuqs-presets/pagination'
import { useSorting } from 'nuqs-presets/sorting'
import { useMemo } from 'react'
import { generateTableData, metricsData } from '@/lib/analytics'
import { useDateRange } from 'nuqs-presets/date-range'
import { useMultiSelect } from 'nuqs-presets/multi-select'
import { ALL_REGIONS, ALL_CATEGORIES } from '@/lib/analytics'

export function DataTable() {
  const { startDate, endDate } = useDateRange({
    defaultPreset: 'last7days',
  })

  const {
    selected: selectedRegions,
  } = useMultiSelect({
    allItems: ALL_REGIONS,
  })

  const {
    selected: selectedCategories,
  } = useMultiSelect({
    allItems: ALL_CATEGORIES,
  })

  const { sortBy, sortOrder, toggleSort, getSortIndicator } = useSorting({
    columns: ['name', 'revenue', 'users', 'conversionRate'] as const,
    defaultColumn: 'revenue',
    defaultOrder: 'desc',
  })

  const filteredAndSorted = useMemo(() => {
    let filtered = metricsData

    if (startDate) {
      const startDateStr = startDate.toISOString().split('T')[0]
      filtered = filtered.filter((d) => d.date >= startDateStr)
    }
    if (endDate) {
      const endDateStr = endDate.toISOString().split('T')[0]
      filtered = filtered.filter((d) => d.date <= endDateStr)
    }
    if (selectedRegions.length > 0) {
      filtered = filtered.filter((d) => selectedRegions.includes(d.region))
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((d) => selectedCategories.includes(d.category))
    }

    let tableData = generateTableData(filtered)

    if (sortBy && sortOrder) {
      tableData = [...tableData].sort((a, b) => {
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

    return tableData
  }, [startDate, endDate, selectedRegions, selectedCategories, sortBy, sortOrder])

  const { page, pageSize, setPageSize, offset, hasNextPage, hasPrevPage, nextPage, prevPage } =
    usePagination({
      defaultPageSize: 10,
      totalItems: filteredAndSorted.length,
    })

  const paginatedData = filteredAndSorted.slice(offset, offset + pageSize)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Performance Data</h2>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  type="button"
                  onClick={() => toggleSort('name')}
                  className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Name {getSortIndicator('name')}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  type="button"
                  onClick={() => toggleSort('revenue')}
                  className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Revenue {getSortIndicator('revenue')}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  type="button"
                  onClick={() => toggleSort('users')}
                  className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Users {getSortIndicator('users')}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  type="button"
                  onClick={() => toggleSort('conversionRate')}
                  className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Conversion {getSortIndicator('conversionRate')}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Trend
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {row.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                  {formatCurrency(row.revenue)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {formatNumber(row.users)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {row.conversionRate.toFixed(2)}%
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      row.trend === 'up'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        : row.trend === 'down'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                    }`}
                  >
                    {row.trend === 'up' ? '↑' : row.trend === 'down' ? '↓' : '→'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-300 dark:border-gray-700 flex items-center justify-between">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Showing {offset + 1} to {Math.min(offset + pageSize, filteredAndSorted.length)} of{' '}
          {filteredAndSorted.length} results
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prevPage}
            disabled={!hasPrevPage}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={nextPage}
            disabled={!hasNextPage}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
