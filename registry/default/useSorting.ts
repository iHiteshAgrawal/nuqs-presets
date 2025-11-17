import { parseAsStringLiteral, useQueryStates } from 'nuqs'
import { useCallback } from 'react'

// ============================================================================
// Types
// ============================================================================

export type HistoryMode = 'push' | 'replace'

export interface BaseHookOptions {
  history?: HistoryMode
  scroll?: boolean
  shallow?: boolean
}

export type SortOrder = 'asc' | 'desc'

export interface UseSortingOptions<TColumns extends readonly string[] = readonly string[]>
  extends BaseHookOptions {
  columns?: TColumns
  defaultColumn?: TColumns[number]
  defaultOrder?: SortOrder
  sortByKey?: string
  sortOrderKey?: string
  clearOnDefault?: boolean
  multiColumn?: boolean
}

export interface UseSortingResult<TColumn = string> {
  sortBy: TColumn | null
  sortOrder: SortOrder | null
  isSorted: boolean
  setSort: (column: TColumn, order?: SortOrder) => void
  toggleSort: (column: TColumn) => void
  clearSort: () => void
  getSortDirection: (column: TColumn) => SortOrder | null
  getSortIndicator: (column: TColumn) => '↑' | '↓' | ''
  isSortedBy: (column: TColumn) => boolean
  isPending: boolean
}

// ============================================================================
// Utilities
// ============================================================================

function getNextSortOrder(
  currentColumn: string | null,
  targetColumn: string,
  currentOrder: SortOrder | null
): { column: string | null; order: SortOrder | null } {
  if (currentColumn !== targetColumn) {
    return { column: targetColumn, order: 'asc' }
  }

  if (currentOrder === 'asc') {
    return { column: targetColumn, order: 'desc' }
  }

  return { column: targetColumn, order: 'asc' }
}

function getSortIndicatorUtil(order: SortOrder | null): '↑' | '↓' | '' {
  if (order === 'asc') return '↑'
  if (order === 'desc') return '↓'
  return ''
}

// ============================================================================
// Parser Definitions (exported for composability with nuqs loaders/serializers)
// ============================================================================

/**
 * Create sorting parsers for use with nuqs
 * @param columns - Array of allowed column names
 * @param sortByKey - Query param key for sort field (default: 'sortBy')
 * @param sortOrderKey - Query param key for sort order (default: 'order')
 * @param defaultColumn - Default sort column
 * @param defaultOrder - Default sort order (default: 'asc')
 * @returns Parser object for use with useQueryStates or nuqs loaders/serializers
 * 
 * @example
 * // Use with loaders
 * const parsers = createSortingParsers({ 
 *   columns: ['name', 'createdAt', 'price'], 
 *   defaultColumn: 'createdAt' 
 * })
 * const loader = createLoader(parsers)
 * 
 * // Use with link serializers
 * const serializer = createSerializer(parsers)
 * const href = serializer('/products', { sortBy: 'price', order: 'desc' })
 */
export function createSortingParsers<TColumns extends readonly string[]>(options: {
  columns: TColumns
  sortByKey?: string
  sortOrderKey?: string
  defaultColumn?: TColumns[number]
  defaultOrder?: 'asc' | 'desc'
} = { columns: [] as unknown as TColumns }) {
  const {
    columns,
    sortByKey = 'sortBy',
    sortOrderKey = 'order',
  } = options

  return {
    [sortByKey]: parseAsStringLiteral(columns as unknown as string[]),
    [sortOrderKey]: parseAsStringLiteral(['asc', 'desc'] as const),
  }
}

// ============================================================================
// Hook
// ============================================================================

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
      return getSortIndicatorUtil(direction)
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
