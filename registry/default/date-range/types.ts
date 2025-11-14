import type { BaseHookOptions } from '../types'

export type DatePreset =
  | 'today'
  | 'yesterday'
  | 'last7days'
  | 'last30days'
  | 'thisMonth'
  | 'lastMonth'
  | 'custom'

export type DateFormat = 'iso' | 'timestamp'

export interface UseDateRangeOptions extends BaseHookOptions {
  defaultPreset?: DatePreset
  minDate?: Date
  maxDate?: Date
  maxDays?: number
  startKey?: string
  endKey?: string
  presetKey?: string
  format?: DateFormat
}

export interface UseDateRangeResult {
  startDate: Date | null
  endDate: Date | null
  preset: DatePreset
  isValid: boolean
  daysDifference: number
  setStartDate: (date: Date | null) => void
  setEndDate: (date: Date | null) => void
  setRange: (start: Date, end: Date) => void
  setPreset: (preset: DatePreset) => void
  clearRange: () => void
  presets: {
    today: () => void
    yesterday: () => void
    last7days: () => void
    last30days: () => void
    thisMonth: () => void
    lastMonth: () => void
    custom: () => void
  }
  isPending: boolean
}
