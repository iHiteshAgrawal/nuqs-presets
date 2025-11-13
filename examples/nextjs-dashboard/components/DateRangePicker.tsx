'use client'

import { useDateRange } from 'nuqs-presets/date-range'

export function DateRangePicker() {
  const { startDate, endDate, setRange, applyPreset } = useDateRange({
    defaultPreset: 'last7days',
  })

  const formatDate = (date: Date | null) => {
    if (!date) return ''
    return date.toISOString().split('T')[0]
  }

  const parseDate = (str: string) => {
    if (!str) return null
    return new Date(str)
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
      <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Date Range</h3>

      <div className="flex flex-wrap gap-2 mb-3">
        <button
          type="button"
          onClick={() => applyPreset('today')}
          className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Today
        </button>
        <button
          type="button"
          onClick={() => applyPreset('last7days')}
          className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Last 7 days
        </button>
        <button
          type="button"
          onClick={() => applyPreset('last30days')}
          className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Last 30 days
        </button>
        <button
          type="button"
          onClick={() => applyPreset('last90days')}
          className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Last 90 days
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="start-date"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Start Date
          </label>
          <input
            id="start-date"
            type="date"
            value={formatDate(startDate)}
            onChange={(e) => setRange(parseDate(e.target.value), endDate)}
            className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div>
            <label
              htmlFor="end-date"
              className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              End Date
            </label>
            <input
              id="end-date"
              type="date"
              value={formatDate(endDate)}
              onChange={(e) => setRange(startDate, parseDate(e.target.value))}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
