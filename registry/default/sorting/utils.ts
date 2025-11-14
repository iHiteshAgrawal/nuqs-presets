import type { SortOrder } from './types'

export function getNextSortOrder(
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

export function getSortIndicator(order: SortOrder | null): '↑' | '↓' | '' {
  if (order === 'asc') return '↑'
  if (order === 'desc') return '↓'
  return ''
}
