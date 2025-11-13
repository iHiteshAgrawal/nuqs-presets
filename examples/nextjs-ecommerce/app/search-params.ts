import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsFloat,
  parseAsString,
  parseAsStringEnum,
} from 'nuqs/server'

export const filterParsers = {
  categories: parseAsArrayOf(parseAsString),
  brands: parseAsArrayOf(parseAsString),
  minPrice: parseAsFloat,
  maxPrice: parseAsFloat,
  minRating: parseAsFloat,
  inStock: parseAsBoolean,
}

export const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(''),
  ...filterParsers,
  sortBy: parseAsStringEnum(['name', 'price', 'rating']),
  sortOrder: parseAsStringEnum(['asc', 'desc']),
  page: parseAsFloat.withDefault(1),
  pageSize: parseAsFloat.withDefault(12),
})
