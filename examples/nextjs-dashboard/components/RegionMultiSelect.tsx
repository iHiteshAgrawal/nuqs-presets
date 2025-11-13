'use client'

import { useMultiSelect } from 'nuqs-presets/multi-select'
import { ALL_REGIONS } from '@/lib/analytics'

export function RegionMultiSelect() {
  const { selected, toggle, selectAll, deselectAll, isSelected, hasSelection } = useMultiSelect({
    allItems: ALL_REGIONS,
  })

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Regions {selected.length > 0 && `(${selected.length})`}
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={selectAll}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            All
          </button>
          {hasSelection && (
            <button
              type="button"
              onClick={deselectAll}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {ALL_REGIONS.map((region) => (
          <button
            key={region}
            type="button"
            onClick={() => toggle(region)}
            className={`
              px-3 py-1.5 text-sm rounded transition-colors
              ${
                isSelected(region)
                  ? 'bg-blue-600 text-white dark:bg-blue-500'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
            `}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  )
}
