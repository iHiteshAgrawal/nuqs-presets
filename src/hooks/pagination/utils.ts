import { clamp } from '../../utils'

export function calculateTotalPages(totalItems: number, pageSize: number): number {
  if (totalItems <= 0 || pageSize <= 0) return 1
  return Math.ceil(totalItems / pageSize)
}

export function calculateOffset(page: number, pageSize: number): number {
  return (page - 1) * pageSize
}

export function normalizePage(page: number, totalPages?: number): number {
  if (totalPages !== undefined) {
    return clamp(page, 1, Math.max(1, totalPages))
  }
  return Math.max(1, page)
}

export function getPageNumbers(currentPage: number, totalPages: number, maxVisible = 7): number[] {
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
