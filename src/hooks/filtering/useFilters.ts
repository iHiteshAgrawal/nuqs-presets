import { useQueryStates } from 'nuqs'
import { useCallback, useMemo } from 'react'
import type { z } from 'zod'
import type { UseFiltersOptions, UseFiltersResult } from './types'
import { countActiveFilters, parseFilterValue, serializeFilterValue } from './utils'

export function useFilters<TSchema extends z.ZodSchema>(
  options: UseFiltersOptions<TSchema> = {}
): UseFiltersResult<z.infer<TSchema>> {
  const {
    schema,
    prefix = '',
    onChange,
    history = 'replace',
    scroll = false,
    shallow = true,
  } = options

  const [rawState, setRawState] = useQueryStates(
    {},
    {
      history,
      scroll,
      shallow,
    }
  )

  const rawFilters = useMemo(() => {
    const result: Record<string, string> = {}
    for (const [key, value] of Object.entries(rawState)) {
      if (prefix && !key.startsWith(prefix)) continue
      const filterKey = prefix ? key.slice(prefix.length) : key
      if (typeof value === 'string') {
        result[filterKey] = value
      }
    }
    return result
  }, [rawState, prefix])

  const filters = useMemo(() => {
    const parsed: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(rawFilters)) {
      parsed[key] = parseFilterValue(value)
    }

    if (schema) {
      try {
        return schema.parse(parsed) as z.infer<TSchema>
      } catch {
        return {} as z.infer<TSchema>
      }
    }

    return parsed as z.infer<TSchema>
  }, [rawFilters, schema])

  const hasFilters = useMemo(
    () => countActiveFilters(filters as Record<string, unknown>) > 0,
    [filters]
  )

  const activeCount = useMemo(
    () => countActiveFilters(filters as Record<string, unknown>),
    [filters]
  )

  const setFilter = useCallback(
    (key: string, value: unknown) => {
      const filterKey = prefix ? `${prefix}${key}` : key
      const serialized = serializeFilterValue(value)
      setRawState({ [filterKey]: serialized })

      if (onChange) {
        const newFilters = { ...(filters as object), [key]: value }
        onChange(newFilters as z.infer<TSchema>)
      }
    },
    [setRawState, prefix, filters, onChange]
  )

  const setFilters = useCallback(
    (newFilters: Partial<z.infer<TSchema>>) => {
      const updates: Record<string, string | null> = {}
      for (const [key, value] of Object.entries(newFilters)) {
        const filterKey = prefix ? `${prefix}${key}` : key
        updates[filterKey] = serializeFilterValue(value)
      }
      setRawState(updates)

      if (onChange) {
        const merged = { ...(filters as object), ...newFilters }
        onChange(merged as z.infer<TSchema>)
      }
    },
    [setRawState, prefix, filters, onChange]
  )

  const removeFilter = useCallback(
    (key: string) => {
      const filterKey = prefix ? `${prefix}${key}` : key
      setRawState({ [filterKey]: null })

      if (onChange) {
        const newFilters = { ...(filters as object) }
        delete (newFilters as Record<string, unknown>)[key]
        onChange(newFilters as z.infer<TSchema>)
      }
    },
    [setRawState, prefix, filters, onChange]
  )

  const clearFilters = useCallback(() => {
    const updates: Record<string, null> = {}
    for (const key of Object.keys(rawFilters)) {
      const filterKey = prefix ? `${prefix}${key}` : key
      updates[filterKey] = null
    }
    setRawState(updates)

    if (onChange) {
      onChange({} as z.infer<TSchema>)
    }
  }, [setRawState, rawFilters, prefix, onChange])

  const toggleFilter = useCallback(
    (key: string, value: unknown) => {
      const currentValue = (filters as Record<string, unknown>)[key]
      if (currentValue === value) {
        removeFilter(key)
      } else {
        setFilter(key, value)
      }
    },
    [filters, setFilter, removeFilter]
  )

  const getFilterValues = useCallback(
    (key: string): unknown[] => {
      const value = (filters as Record<string, unknown>)[key]
      if (Array.isArray(value)) return value
      if (value !== undefined && value !== null) return [value]
      return []
    },
    [filters]
  )

  const isFilterActive = useCallback(
    (key: string, value?: unknown): boolean => {
      const currentValue = (filters as Record<string, unknown>)[key]
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
    filters,
    rawFilters,
    hasFilters,
    activeCount,
    setFilter,
    setFilters,
    removeFilter,
    clearFilters,
    toggleFilter,
    getFilterValues,
    isFilterActive,
    isPending: false,
  }
}
