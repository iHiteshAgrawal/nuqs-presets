'use client'

interface PaginationProps {
  page: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: () => void
  prevPage: () => void
  totalItems: number
  pageSize: number
}

export function Pagination({
  page,
  hasNextPage,
  hasPrevPage,
  nextPage,
  prevPage,
  totalItems,
  pageSize,
}: PaginationProps) {
  const startItem = (page - 1) * pageSize + 1
  const endItem = Math.min(page * pageSize, totalItems)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Showing <span className="font-medium">{startItem}</span> to{' '}
        <span className="font-medium">{endItem}</span> of{' '}
        <span className="font-medium">{totalItems}</span> results
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={prevPage}
          disabled={!hasPrevPage}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-900 dark:text-gray-100 font-medium">
          Page {page}
        </span>
        <button
          type="button"
          onClick={nextPage}
          disabled={!hasNextPage}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Next
        </button>
      </div>
    </div>
  )
}
