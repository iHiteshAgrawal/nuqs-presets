import { useQueryStates } from 'nuqs'
import { useCallback, useMemo } from 'react'
import type { UseFiltersOptions, UseFiltersResult, Values } from './types'
import { countActiveFilters } from './utils'

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
