import { parseAsInteger, useQueryStates } from 'nuqs'
import { useCallback, useMemo, useState } from 'react'

// ============================================================================
// Types
// ============================================================================

export type HistoryMode = 'push' | 'replace'

export interface BaseHookOptions {
  history?: HistoryMode
  scroll?: boolean
  shallow?: boolean
}

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

// ============================================================================
// Utilities
// ============================================================================

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function calculateTotalPages(totalItems: number, pageSize: number): number {
  if (totalItems <= 0 || pageSize <= 0) return 1
  return Math.ceil(totalItems / pageSize)
}

function calculateOffset(page: number, pageSize: number): number {
  return (page - 1) * pageSize
}

function normalizePage(page: number, totalPages?: number): number {
  if (totalPages !== undefined) {
    return clamp(page, 1, Math.max(1, totalPages))
  }
  return Math.max(1, page)
}

function getPageNumbers(currentPage: number, totalPages: number, maxVisible = 7): number[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const halfVisible = Math.floor(maxVisible / 2)
  let start = currentPage - halfVisible
  let end = currentPage + halfVisible

  if (start < 1) {
    end += 1 - start
    start = 1
  }

  if (end > totalPages) {
    start -= end - totalPages
    end = totalPages
  }

  start = Math.max(1, start)
  end = Math.min(totalPages, end)

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

// ============================================================================
// Parser Definitions (exported for composability with nuqs loaders/serializers)
// ============================================================================

/**
 * Create pagination parsers for use with nuqs
 * @param defaultPage - Default page number (default: 1)
 * @param defaultPageSize - Default page size (default: 10)
 * @param pageKey - Query param key for page (default: 'page')
 * @param pageSizeKey - Query param key for page size (default: 'pageSize')
 * @returns Parser object for use with useQueryStates or nuqs loaders/serializers
 * 
 * @example
 * // Use with loaders
 * const parsers = createPaginationParsers({ defaultPage: 1, defaultPageSize: 20 })
 * const loader = createLoader(parsers)
 * 
 * // Use with link serializers
 * const serializer = createSerializer(parsers)
 * const href = serializer('/products', { page: 2, pageSize: 20 })
 */
export function createPaginationParsers(options: {
  defaultPage?: number
  defaultPageSize?: number
  pageKey?: string
  pageSizeKey?: string
} = {}) {
  const {
    defaultPage = 1,
    defaultPageSize = 10,
    pageKey = 'page',
    pageSizeKey = 'pageSize',
  } = options

  return {
    [pageKey]: parseAsInteger.withDefault(defaultPage),
    [pageSizeKey]: parseAsInteger.withDefault(defaultPageSize),
  }
}

// ============================================================================
// Hook
// ============================================================================

export function usePagination(options: UsePaginationOptions = {}): UsePaginationResult {
  const {
    defaultPage = 1,
    defaultPageSize = 10,
    totalItems: initialTotalItems,
    pageKey = 'page',
    pageSizeKey = 'pageSize',
    resetPageOnSizeChange = true,
    history = 'replace',
    scroll = false,
    shallow = true,
  } = options

  const [totalItems, setTotalItems] = useState(initialTotalItems)

  const parsers = useMemo(
    () => createPaginationParsers({ defaultPage, defaultPageSize, pageKey, pageSizeKey }),
    [defaultPage, defaultPageSize, pageKey, pageSizeKey]
  )

  const [state, setState] = useQueryStates(parsers, {
    history,
    scroll,
    shallow,
  })

  const page = state[pageKey] ?? defaultPage
  const pageSize = state[pageSizeKey] ?? defaultPageSize

  const totalPages = useMemo(
    () => (totalItems !== undefined ? calculateTotalPages(totalItems, pageSize) : undefined),
    [totalItems, pageSize]
  )

  const normalizedPage = useMemo(() => normalizePage(page, totalPages), [page, totalPages])

  const offset = useMemo(
    () => calculateOffset(normalizedPage, pageSize),
    [normalizedPage, pageSize]
  )

  const hasPrevPage = normalizedPage > 1
  const hasNextPage = totalPages !== undefined ? normalizedPage < totalPages : true
  const isFirstPage = normalizedPage === 1
  const isLastPage = totalPages !== undefined ? normalizedPage === totalPages : false

  const setPage = useCallback(
    (newPage: number) => {
      const validPage = normalizePage(newPage, totalPages)
      setState({ [pageKey]: validPage })
    },
    [setState, totalPages, pageKey]
  )

  const setPageSize = useCallback(
    (newSize: number) => {
      const validSize = Math.max(1, newSize)
      const updates: Record<string, number> = { [pageSizeKey]: validSize }

      if (resetPageOnSizeChange) {
        updates[pageKey] = 1
      }

      setState(updates)
    },
    [setState, resetPageOnSizeChange, pageKey, pageSizeKey]
  )

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setPage(normalizedPage + 1)
    }
  }, [hasNextPage, normalizedPage, setPage])

  const prevPage = useCallback(() => {
    if (hasPrevPage) {
      setPage(normalizedPage - 1)
    }
  }, [hasPrevPage, normalizedPage, setPage])

  const firstPage = useCallback(() => {
    setPage(1)
  }, [setPage])

  const lastPage = useCallback(() => {
    if (totalPages !== undefined) {
      setPage(totalPages)
    }
  }, [totalPages, setPage])

  const goToPage = useCallback(
    (targetPage: number) => {
      setPage(targetPage)
    },
    [setPage]
  )

  const getPageNumbersCallback = useCallback(() => {
    if (totalPages === undefined) return []
    return getPageNumbers(normalizedPage, totalPages)
  }, [normalizedPage, totalPages])

  return {
    page: normalizedPage,
    pageSize,
    totalPages,
    offset,
    hasNextPage,
    hasPrevPage,
    isFirstPage,
    isLastPage,
    setPage,
    setPageSize,
    setTotalItems,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    goToPage,
    getPageNumbers: getPageNumbersCallback,
    isPending: false,
  }
}
