import { parseAsString, useQueryState } from 'nuqs'
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

export interface UseMultiSelectOptions extends BaseHookOptions {
  defaultSelected?: string[]
  allItems?: string[]
  key?: string
  separator?: string
  maxSelection?: number
  clearOnDefault?: boolean
}

export interface UseMultiSelectResult {
  selected: string[]
  count: number
  isEmpty: boolean
  isAllSelected: boolean
  select: (id: string) => void
  deselect: (id: string) => void
  toggle: (id: string) => void
  selectAll: () => void
  deselectAll: () => void
  setSelected: (ids: string[]) => void
  isSelected: (id: string) => boolean
  isPending: boolean
}

// ============================================================================
// Utilities
// ============================================================================

function parseSelection(value: string | null, separator: string): string[] {
  if (!value) return []
  return value.split(separator).filter((item) => item.trim() !== '')
}

function serializeSelection(items: string[], separator: string): string | null {
  if (items.length === 0) return null
  return items.join(separator)
}

function addItem(items: string[], item: string, maxSelection?: number): string[] {
  if (items.includes(item)) return items

  if (maxSelection !== undefined && items.length >= maxSelection) {
    return items
  }

  return [...items, item]
}

function removeItem(items: string[], item: string): string[] {
  return items.filter((i) => i !== item)
}

// ============================================================================
// Parser Definitions (exported for composability with nuqs loaders/serializers)
// ============================================================================

/**
 * Create multi-select parser for use with nuqs
 * @param key - Query param key (default: 'selected')
 * @param separator - Separator for array items (default: ',')
 * @param defaultSelected - Default selected items
 * @returns Parser for use with useQueryState or nuqs loaders/serializers
 * 
 * @example
 * // Use with loaders
 * const parser = createMultiSelectParser({ key: 'tags', separator: ',' })
 * const loader = createLoader({ tags: parser })
 * 
 * // Use with link serializers
 * const serializer = createSerializer({ tags: parser })
 * const href = serializer('/products', { tags: 'electronics,gadgets' })
 */
export function createMultiSelectParser(options: {
  key?: string
  separator?: string
  defaultSelected?: string[]
} = {}) {
  const { separator = ',', defaultSelected = [] } = options
  const defaultValue = serializeSelection(defaultSelected, separator) ?? ''
  return parseAsString.withDefault(defaultValue)
}

// ============================================================================
// Hook
// ============================================================================

export function useMultiSelect(options: UseMultiSelectOptions = {}): UseMultiSelectResult {
  const {
    defaultSelected = [],
    allItems = [],
    key = 'selected',
    separator = ',',
    maxSelection,
    history = 'replace',
    scroll = false,
    shallow = true,
  } = options

  const [rawValue, setRawValue] = useQueryState(
    key,
    parseAsString.withDefault(serializeSelection(defaultSelected, separator) ?? '').withOptions({
      history,
      scroll,
      shallow,
    })
  )

  const selected = useMemo(() => parseSelection(rawValue, separator), [rawValue, separator])

  const count = selected.length
  const isEmpty = count === 0
  const isAllSelected = useMemo(
    () => allItems.length > 0 && allItems.every((item) => selected.includes(item)),
    [allItems, selected]
  )

  const setSelected = useCallback(
    (ids: string[]) => {
      const limitedIds = maxSelection !== undefined ? ids.slice(0, maxSelection) : ids
      setRawValue(serializeSelection(limitedIds, separator))
    },
    [setRawValue, separator, maxSelection]
  )

  const select = useCallback(
    (id: string) => {
      const newSelection = addItem(selected, id, maxSelection)
      setRawValue(serializeSelection(newSelection, separator))
    },
    [selected, setRawValue, separator, maxSelection]
  )

  const deselect = useCallback(
    (id: string) => {
      const newSelection = removeItem(selected, id)
      setRawValue(serializeSelection(newSelection, separator))
    },
    [selected, setRawValue, separator]
  )

  const toggle = useCallback(
    (id: string) => {
      if (selected.includes(id)) {
        deselect(id)
      } else if (maxSelection === undefined || selected.length < maxSelection) {
        select(id)
      }
    },
    [selected, select, deselect, maxSelection]
  )

  const selectAll = useCallback(() => {
    const itemsToSelect = maxSelection !== undefined ? allItems.slice(0, maxSelection) : allItems
    setRawValue(serializeSelection(itemsToSelect, separator))
  }, [allItems, setRawValue, separator, maxSelection])

  const deselectAll = useCallback(() => {
    setRawValue(null)
  }, [setRawValue])

  const isSelected = useCallback(
    (id: string): boolean => {
      return selected.includes(id)
    },
    [selected]
  )

  return {
    selected,
    count,
    isEmpty,
    isAllSelected,
    select,
    deselect,
    toggle,
    selectAll,
    deselectAll,
    setSelected,
    isSelected,
    isPending: false,
  }
}
