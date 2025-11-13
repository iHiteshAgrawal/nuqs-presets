import type { Values } from 'nuqs'
import type { BaseHookOptions } from '../../types'

// biome-ignore lint/suspicious/noExplicitAny: parsers can be any nuqs parser type
export interface UseFiltersOptions<TParsers extends Record<string, any> = Record<string, any>>
  extends BaseHookOptions {
  parsers: TParsers
  onChange?: (filters: Values<TParsers>) => void
}

export interface UseFiltersResult<TFilters = Record<string, unknown>> {
  filters: TFilters
  hasFilters: boolean
  activeCount: number
  setFilter: <K extends keyof TFilters>(key: K, value: TFilters[K]) => void
  setFilters: (filters: Partial<TFilters>) => void
  removeFilter: (key: keyof TFilters) => void
  clearFilters: () => void
  toggleFilter: <K extends keyof TFilters>(key: K, value: TFilters[K]) => void
  getFilterValues: (key: keyof TFilters) => unknown[]
  isFilterActive: <K extends keyof TFilters>(key: K, value?: TFilters[K]) => boolean
  isPending: boolean
}

export type { Values }
