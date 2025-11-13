import type { BaseHookOptions } from '../../types'

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
