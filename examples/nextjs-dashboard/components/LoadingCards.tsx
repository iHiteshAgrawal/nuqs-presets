export function LoadingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {[...Array(4)].map((_, i) => (
        <div
          key={`loading-card-${i + 1}`}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-6 animate-pulse"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="mt-2">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40" />
          </div>
        </div>
      ))}
    </div>
  )
}
