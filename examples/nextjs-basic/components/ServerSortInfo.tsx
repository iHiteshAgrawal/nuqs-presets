import { searchParamsCache } from '@/app/search-params'

export function ServerSortInfo() {
  const { sortBy, sortOrder } = searchParamsCache.all()

  if (!sortBy || !sortOrder) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-3 py-2">
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          Server: No sorting applied
        </span>
      </div>
    )
  }

  return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded px-3 py-2">
      <span className="text-green-900 dark:text-green-100 font-medium">
        Server: Sorted by {sortBy} ({sortOrder === 'asc' ? 'ascending' : 'descending'})
      </span>
    </div>
  )
}
