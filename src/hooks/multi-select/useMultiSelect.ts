import { parseAsString, useQueryState } from 'nuqs'
import { useCallback, useMemo } from 'react'
import type { UseMultiSelectOptions, UseMultiSelectResult } from './types'
import { addItem, parseSelection, removeItem, serializeSelection } from './utils'

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
