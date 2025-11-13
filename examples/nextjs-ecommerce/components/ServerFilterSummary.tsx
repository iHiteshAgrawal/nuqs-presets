import { searchParamsCache } from '@/app/search-params'
import { getFilteredProducts } from '@/lib/products'

export function ServerFilterSummary() {
  const { q, categories, brands, minPrice, maxPrice, minRating, inStock } = searchParamsCache.all()

  const filteredProducts = getFilteredProducts({
    categories,
    brands,
    minPrice: minPrice ?? undefined,
    maxPrice: maxPrice ?? undefined,
    minRating: minRating ?? undefined,
    inStock: inStock ?? undefined,
    search: q,
  })

  const parts = []
  if (q) parts.push(`matching "${q}"`)
  if (categories.length) parts.push(`in ${categories.join(', ')}`)
  if (brands.length) parts.push(`from ${brands.join(', ')}`)
  if (minPrice !== undefined || maxPrice !== undefined) {
    const priceRange = []
    if (minPrice !== undefined) priceRange.push(`over $${minPrice}`)
    if (maxPrice !== undefined) priceRange.push(`under $${maxPrice}`)
    parts.push(priceRange.join(' and '))
  }
  if (minRating !== undefined) parts.push(`rated ${minRating}+ stars`)
  if (inStock) parts.push('in stock')

  if (parts.length === 0) {
    return <p className="text-sm text-gray-600 dark:text-gray-400">Browse all products</p>
  }

  return (
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Showing <span className="font-semibold">{filteredProducts.length}</span> products{' '}
      {parts.join(' ')}
    </p>
  )
}
