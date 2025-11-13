import { searchParamsCache } from '@/app/search-params'
import { products } from '@/lib/data'

export function ServerProductCount() {
  const { q } = searchParamsCache.all()

  let filteredProducts = products
  if (q) {
    const searchLower = q.toLowerCase()
    filteredProducts = products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
    )
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded px-3 py-2">
      <span className="text-blue-900 dark:text-blue-100 font-medium">
        Server: {filteredProducts.length} products {q && `matching "${q}"`}
      </span>
    </div>
  )
}
