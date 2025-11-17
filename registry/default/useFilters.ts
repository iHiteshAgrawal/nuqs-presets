import { useQueryStates, type Values } from 'nuqs'
import { useCallback, useMemo } from 'react'

// ============================================================================
// Types
// ============================================================================

export type HistoryMode = 'push' | 'replace'

export interface BaseHookOptions {
  history?: HistoryMode
  scroll?: boolean
  shallow?: boolean
}

// biome-ignore lint/suspicious/noExplicitAny: parsers can be any nuqs parser type
export interface UseFiltersOptions<TParsers extends Record<string, any> = Record<string, any>>
  extends BaseHookOptions {
  parsers: TParsers
  onChange?: (filters: Values<TParsers>) => void
}

export interface UseFiltersResult<TFilters = Record<string, unknown>> {
  filters: TFilters
  hasFilters: boolean
  activeCount: number
  setFilter: <K extends keyof TFilters>(key: K, value: TFilters[K]) => void
  setFilters: (filters: Partial<TFilters>) => void
  removeFilter: (key: keyof TFilters) => void
  clearFilters: () => void
  toggleFilter: <K extends keyof TFilters>(key: K, value: TFilters[K]) => void
  getFilterValues: (key: keyof TFilters) => unknown[]
  isFilterActive: <K extends keyof TFilters>(key: K, value?: TFilters[K]) => boolean
  isPending: boolean
}

export type { Values }

// ============================================================================
// Utilities
// ============================================================================

function countActiveFilters(filters: Record<string, unknown>): number {
  return Object.values(filters).filter(
    (value) =>
      value !== undefined &&
      value !== null &&
      value !== '' &&
      !(Array.isArray(value) && value.length === 0)
  ).length
}

// ============================================================================
// Parser Definitions (exported for composability with nuqs loaders/serializers)
// ============================================================================

/**
 * Export your parsers for use with nuqs loaders and serializers
 * @example
 * import { parseAsString, parseAsInteger, parseAsBoolean } from 'nuqs'
 *
 * // Define filter parsers
 * export const productFilterParsers = {
 *   category: parseAsString,
 *   minPrice: parseAsInteger,
 *   maxPrice: parseAsInteger,
 *   inStock: parseAsBoolean
 * }
 *
 * // Use with loaders (server-side)
 * import { createLoader } from 'nuqs/server'
 * const loadFilters = createLoader(productFilterParsers)
 *
 * // Use with link serializers (client-side)
 * import { createSerializer } from 'nuqs'
 * const filtersSerializer = createSerializer(productFilterParsers)
 * const href = filtersSerializer('/products', { category: 'electronics', inStock: true })
 */

// ============================================================================
// Hook
// ============================================================================

// biome-ignore lint/suspicious/noExplicitAny: parsers can be any nuqs parser type
export function useFilters<TParsers extends Record<string, any>>(
  options: UseFiltersOptions<TParsers>
): UseFiltersResult<Values<TParsers>> {
  const { parsers, onChange, history = 'replace', scroll = false, shallow = true } = options

  const [filters, setFiltersState] = useQueryStates(parsers, {
    history,
    scroll,
    shallow,
  })

  const hasFilters = useMemo(() => countActiveFilters(filters) > 0, [filters])

  const activeCount = useMemo(() => countActiveFilters(filters), [filters])

  const setFilter = useCallback(
    (key: keyof Values<TParsers>, value: unknown) => {
      // biome-ignore lint/suspicious/noExplicitAny: dynamic filter updates
      setFiltersState({ [key]: value === undefined ? null : value } as any)

      if (onChange) {
        const newFilters = { ...filters, [key]: value } as Values<TParsers>
        onChange(newFilters)
      }
    },
    [setFiltersState, filters, onChange]
  )

  const setFilters = useCallback(
    (newFilters: Partial<Values<TParsers>>) => {
      const updates: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(newFilters)) {
        updates[key] = value === undefined ? null : value
      }
      // biome-ignore lint/suspicious/noExplicitAny: dynamic filter updates
      setFiltersState(updates as any)

      if (onChange) {
        const merged = { ...filters, ...newFilters } as Values<TParsers>
        onChange(merged)
      }
    },
    [setFiltersState, filters, onChange]
  )

  const removeFilter = useCallback(
    (key: keyof Values<TParsers>) => {
      // biome-ignore lint/suspicious/noExplicitAny: dynamic filter updates
      setFiltersState({ [key]: null } as any)

      if (onChange) {
        const newFilters = { ...filters } as Values<TParsers>
        delete newFilters[key as keyof typeof newFilters]
        onChange(newFilters)
      }
    },
    [setFiltersState, filters, onChange]
  )

  const clearFilters = useCallback(() => {
    const updates: Record<string, null> = {}
    for (const key of Object.keys(filters)) {
      updates[key] = null
    }
    // biome-ignore lint/suspicious/noExplicitAny: dynamic filter updates
    setFiltersState(updates as any)

    if (onChange) {
      onChange({} as Values<TParsers>)
    }
  }, [setFiltersState, filters, onChange])

  const toggleFilter = useCallback(
    (key: keyof Values<TParsers>, value: unknown) => {
      const currentValue = filters[key]
      if (currentValue === value) {
        removeFilter(key)
      } else {
        setFilter(key, value)
      }
    },
    [filters, setFilter, removeFilter]
  )

  const getFilterValues = useCallback(
    (key: keyof Values<TParsers>): unknown[] => {
      const value = filters[key]
      if (Array.isArray(value)) return value
      if (value !== undefined && value !== null) return [value]
      return []
    },
    [filters]
  )

  const isFilterActive = useCallback(
    (key: keyof Values<TParsers>, value?: unknown): boolean => {
      const currentValue = filters[key]
      if (value !== undefined) {
        if (Array.isArray(currentValue)) {
          return currentValue.includes(value)
        }
        return currentValue === value
      }
      return currentValue !== undefined && currentValue !== null
    },
    [filters]
  )

  return {
    filters: filters as Values<TParsers>,
    hasFilters,
    activeCount,
    setFilter: setFilter as <K extends keyof Values<TParsers>>(
      key: K,
      value: Values<TParsers>[K]
    ) => void,
    setFilters,
    removeFilter,
    clearFilters,
    toggleFilter: toggleFilter as <K extends keyof Values<TParsers>>(
      key: K,
      value: Values<TParsers>[K]
    ) => void,
    getFilterValues,
    isFilterActive: isFilterActive as <K extends keyof Values<TParsers>>(
      key: K,
      value?: Values<TParsers>[K]
    ) => boolean,
    isPending: false,
  }
}
