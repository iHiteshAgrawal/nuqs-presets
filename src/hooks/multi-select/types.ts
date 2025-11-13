import type { BaseHookOptions } from '../../types'

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
