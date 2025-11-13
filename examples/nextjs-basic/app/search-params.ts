import {
  createSearchParamsCache,
  parseAsFloat,
  parseAsString,
  parseAsStringEnum,
} from 'nuqs/server'

export const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(''),
  sortBy: parseAsStringEnum(['name', 'price', 'date']),
  sortOrder: parseAsStringEnum(['asc', 'desc']),
  page: parseAsFloat.withDefault(1),
  pageSize: parseAsFloat.withDefault(10),
})
