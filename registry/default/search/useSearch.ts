import { parseAsString, useQueryState } from 'nuqs'
import { useCallback, useEffect, useMemo } from 'react'
import { useDebounce } from '../../lib/utils'
import type { UseSearchOptions, UseSearchResult } from './types'

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
