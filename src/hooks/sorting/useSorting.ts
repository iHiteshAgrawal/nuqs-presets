import { parseAsStringLiteral, useQueryStates } from 'nuqs'
import { useCallback } from 'react'
import type { SortOrder, UseSortingOptions, UseSortingResult } from './types'
import { getSortIndicator as getIndicator, getNextSortOrder } from './utils'

export function useSorting<TColumns extends readonly string[]>(
  options: UseSortingOptions<TColumns> = {}
): UseSortingResult<TColumns[number]> {
  const {
    columns = [] as unknown as TColumns,
    defaultColumn,
    defaultOrder,
    sortByKey = 'sortBy',
    sortOrderKey = 'order',
    history = 'replace',
    scroll = false,
    shallow = true,
  } = options

  const [state, setState] = useQueryStates(
    {
      [sortByKey]: parseAsStringLiteral(columns as unknown as string[]),
      [sortOrderKey]: parseAsStringLiteral(['asc', 'desc'] as const),
    },
    {
      history,
      scroll,
      shallow,
    }
  )

  const sortBy =
    (state[sortByKey] as TColumns[number]) ?? (defaultColumn as TColumns[number]) ?? null
  const sortOrder = (state[sortOrderKey] as SortOrder) ?? defaultOrder ?? null

  const isSorted = sortBy !== null && sortOrder !== null

  const setSort = useCallback(
    (column: TColumns[number], order: SortOrder = 'asc') => {
      setState({
        [sortByKey]: column as string,
        [sortOrderKey]: order,
      })
    },
    [setState, sortByKey, sortOrderKey]
  )

  const toggleSort = useCallback(
    (column: TColumns[number]) => {
      const next = getNextSortOrder(sortBy as string | null, column as string, sortOrder)
      setState({
        [sortByKey]: next.column,
        [sortOrderKey]: next.order,
      })
    },
    [setState, sortBy, sortOrder, sortByKey, sortOrderKey]
  )

  const clearSort = useCallback(() => {
    setState({
      [sortByKey]: null,
      [sortOrderKey]: null,
    })
  }, [setState, sortByKey, sortOrderKey])

  const getSortDirection = useCallback(
    (column: TColumns[number]): SortOrder | null => {
      if (sortBy === column) return sortOrder
      return null
    },
    [sortBy, sortOrder]
  )

  const getSortIndicator = useCallback(
    (column: TColumns[number]): '↑' | '↓' | '' => {
      const direction = getSortDirection(column)
      return getIndicator(direction)
    },
    [getSortDirection]
  )

  const isSortedBy = useCallback(
    (column: TColumns[number]): boolean => {
      return sortBy === column
    },
    [sortBy]
  )

  return {
    sortBy,
    sortOrder,
    isSorted,
    setSort,
    toggleSort,
    clearSort,
    getSortDirection,
    getSortIndicator,
    isSortedBy,
    isPending: false,
  }
}
