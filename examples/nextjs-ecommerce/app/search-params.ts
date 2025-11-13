import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsFloat,
  parseAsString,
  parseAsStringEnum,
} from 'nuqs/server'

export const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(''),
  categories: parseAsArrayOf(parseAsString).withDefault([]),
  brands: parseAsArrayOf(parseAsString).withDefault([]),
  minPrice: parseAsFloat,
  maxPrice: parseAsFloat,
  minRating: parseAsFloat,
  inStock: parseAsBoolean,
  sortBy: parseAsStringEnum(['name', 'price', 'rating']),
  sortOrder: parseAsStringEnum(['asc', 'desc']),
  page: parseAsFloat.withDefault(1),
  pageSize: parseAsFloat.withDefault(12),
})
