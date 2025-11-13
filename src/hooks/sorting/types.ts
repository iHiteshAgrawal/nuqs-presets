import type { BaseHookOptions } from '../../types'

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
