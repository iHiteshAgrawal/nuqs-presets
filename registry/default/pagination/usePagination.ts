import { parseAsInteger, useQueryStates } from 'nuqs'
import { useCallback, useMemo, useState } from 'react'
import type { UsePaginationOptions, UsePaginationResult } from './types'
import { calculateOffset, calculateTotalPages, getPageNumbers, normalizePage } from './utils'

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

  const [state, setState] = useQueryStates(
    {
      [pageKey]: parseAsInteger.withDefault(defaultPage),
      [pageSizeKey]: parseAsInteger.withDefault(defaultPageSize),
    },
    {
      history,
      scroll,
      shallow,
    }
  )

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
