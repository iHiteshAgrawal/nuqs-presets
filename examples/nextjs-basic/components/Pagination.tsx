interface PaginationProps {
  page: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: () => void
  prevPage: () => void
}

export function Pagination({
  page,
  hasNextPage,
  hasPrevPage,
  nextPage,
  prevPage,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={prevPage}
        disabled={!hasPrevPage}
        className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 dark:hover:bg-blue-900 hover:border-blue-400 disabled:hover:bg-white dark:disabled:hover:bg-gray-800 transition-colors"
      >
        Previous
      </button>
      <span className="text-gray-900 dark:text-gray-100 font-semibold">Page {page}</span>
      <button
        type="button"
        onClick={nextPage}
        disabled={!hasNextPage}
        className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 dark:hover:bg-blue-900 hover:border-blue-400 disabled:hover:bg-white dark:disabled:hover:bg-gray-800 transition-colors"
      >
        Next
      </button>
    </div>
  )
}
