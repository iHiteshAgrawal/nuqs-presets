import { parseAsString, useQueryState } from 'nuqs'
import { useCallback, useEffect, useMemo, useState } from 'react'

// ============================================================================
// Types
// ============================================================================

export type HistoryMode = 'push' | 'replace'

export interface BaseHookOptions {
  history?: HistoryMode
  scroll?: boolean
  shallow?: boolean
}

export interface UseSearchOptions extends BaseHookOptions {
  defaultQuery?: string
  debounce?: number
  minLength?: number
  trim?: boolean
  queryKey?: string
  onSearch?: (query: string) => void
}

export interface UseSearchResult {
  query: string
  debouncedQuery: string
  isSearching: boolean
  isDebouncing: boolean
  isValid: boolean
  setQuery: (query: string) => void
  clearQuery: () => void
  isPending: boolean
}

// ============================================================================
// Utilities
// ============================================================================

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// ============================================================================
// Parser Definitions (exported for composability with nuqs loaders/serializers)
// ============================================================================

/**
 * Create search parser for use with nuqs
 * @param queryKey - Query param key for search (default: 'q')
 * @param defaultQuery - Default search value
 * @returns Parser for use with useQueryState or nuqs loaders/serializers
 * 
 * @example
 * // Use with loaders
 * const parser = createSearchParser({ queryKey: 'search', defaultQuery: '' })
 * const loader = createLoader({ search: parser })
 * 
 * // Use with link serializers
 * const serializer = createSerializer({ search: parser })
 * const href = serializer('/search', { search: 'react hooks' })
 */
export function createSearchParser(options: {
  queryKey?: string
  defaultQuery?: string
} = {}) {
  const { defaultQuery } = options
  return defaultQuery ? parseAsString.withDefault(defaultQuery) : parseAsString
}

// ============================================================================
// Hook
// ============================================================================

export function useSearch(options: UseSearchOptions = {}): UseSearchResult {
  const {
    defaultQuery = '',
    debounce = 300,
    minLength = 0,
    trim = true,
    queryKey = 'q',
    onSearch,
    history = 'replace',
    scroll = false,
    shallow = true,
  } = options

  const [rawQuery, setRawQuery] = useQueryState(
    queryKey,
    parseAsString.withDefault(defaultQuery).withOptions({
      history,
      scroll,
      shallow,
    })
  )

  const query = useMemo(() => {
    if (trim && rawQuery) return rawQuery.trim()
    return rawQuery ?? defaultQuery
  }, [rawQuery, trim, defaultQuery])

  const debouncedQuery = useDebounce(query, debounce)

  const isSearching = useMemo(
    () => query.length > 0 && query.length >= minLength,
    [query, minLength]
  )

  const isDebouncing = useMemo(() => query !== debouncedQuery, [query, debouncedQuery])

  const isValid = useMemo(() => query.length >= minLength, [query, minLength])

  const setQuery = useCallback(
    (newQuery: string) => {
      setRawQuery(newQuery)
    },
    [setRawQuery]
  )

  const clearQuery = useCallback(() => {
    setRawQuery(null)
  }, [setRawQuery])

  useEffect(() => {
    if (onSearch && isValid && !isDebouncing) {
      onSearch(debouncedQuery)
    }
  }, [onSearch, debouncedQuery, isValid, isDebouncing])

  return {
    query,
    debouncedQuery,
    isSearching,
    isDebouncing,
    isValid,
    setQuery,
    clearQuery,
    isPending: false,
  }
}
