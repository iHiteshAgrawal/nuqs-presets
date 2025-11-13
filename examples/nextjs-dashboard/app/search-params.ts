import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsFloat,
  parseAsString,
  parseAsStringEnum,
} from 'nuqs/server'

export const searchParamsCache = createSearchParamsCache({
  tab: parseAsStringEnum(['overview', 'analytics', 'reports', 'settings']).withDefault('overview'),
  startDate: parseAsString,
  endDate: parseAsString,
  regions: parseAsArrayOf(parseAsString).withDefault([]),
  categories: parseAsArrayOf(parseAsString).withDefault([]),
  sortBy: parseAsStringEnum(['name', 'revenue', 'users', 'conversionRate']).withDefault('revenue'),
  sortOrder: parseAsStringEnum(['asc', 'desc']).withDefault('desc'),
  page: parseAsFloat.withDefault(1),
  pageSize: parseAsFloat.withDefault(10),
})
