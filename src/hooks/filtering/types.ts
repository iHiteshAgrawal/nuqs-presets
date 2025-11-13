import type { z } from 'zod'
import type { BaseHookOptions } from '../../types'

export interface UseFiltersOptions<TSchema extends z.ZodSchema = z.ZodSchema>
  extends BaseHookOptions {
  schema?: TSchema
  prefix?: string
  clearOnDefault?: boolean
  onChange?: (filters: z.infer<TSchema>) => void
}

export interface UseFiltersResult<TFilters = Record<string, unknown>> {
  filters: TFilters
  rawFilters: Record<string, string>
  hasFilters: boolean
  activeCount: number
  setFilter: (key: string, value: unknown) => void
  setFilters: (filters: Partial<TFilters>) => void
  removeFilter: (key: string) => void
  clearFilters: () => void
  toggleFilter: (key: string, value: unknown) => void
  getFilterValues: (key: string) => unknown[]
  isFilterActive: (key: string, value?: unknown) => boolean
  isPending: boolean
}
