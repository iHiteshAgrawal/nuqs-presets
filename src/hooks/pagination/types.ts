import type { BaseHookOptions } from '../../types'

export interface UsePaginationOptions extends BaseHookOptions {
  defaultPage?: number
  defaultPageSize?: number
  pageSizeOptions?: number[]
  totalItems?: number
  pageKey?: string
  pageSizeKey?: string
  resetPageOnSizeChange?: boolean
}

export interface UsePaginationResult {
  page: number
  pageSize: number
  totalPages: number | undefined
  offset: number
  hasNextPage: boolean
  hasPrevPage: boolean
  isFirstPage: boolean
  isLastPage: boolean
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  setTotalItems: (total: number) => void
  nextPage: () => void
  prevPage: () => void
  firstPage: () => void
  lastPage: () => void
  goToPage: (page: number) => void
  getPageNumbers: () => number[]
  isPending: boolean
}
