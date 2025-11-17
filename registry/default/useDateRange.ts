import { parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs'
import { useCallback, useMemo } from 'react'

// ============================================================================
// Types
// ============================================================================

export type HistoryMode = 'push' | 'replace'

export interface BaseHookOptions {
  history?: HistoryMode
  scroll?: boolean
  shallow?: boolean
}

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

// ============================================================================
// Date Utilities
// ============================================================================

function startOfDay(date: Date): Date {
  const newDate = new Date(date)
  newDate.setHours(0, 0, 0, 0)
  return newDate
}

function endOfDay(date: Date): Date {
  const newDate = new Date(date)
  newDate.setHours(23, 59, 59, 999)
  return newDate
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999)
}

function daysBetween(start: Date, end: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000
  return Math.round(Math.abs((end.getTime() - start.getTime()) / msPerDay))
}

// ============================================================================
// Range Utilities
// ============================================================================

function parseDate(value: string | null, format: DateFormat): Date | null {
  if (!value) return null

  if (format === 'timestamp') {
    const timestamp = Number(value)
    if (Number.isNaN(timestamp)) return null
    return new Date(timestamp)
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function serializeDate(date: Date | null, format: DateFormat): string | null {
  if (!date) return null

  if (format === 'timestamp') {
    return String(date.getTime())
  }

  return date.toISOString()
}

function isValidRange(
  start: Date | null,
  end: Date | null,
  minDate?: Date,
  maxDate?: Date,
  maxDays?: number
): boolean {
  if (!start || !end) return false
  if (start > end) return false
  if (minDate && start < minDate) return false
  if (maxDate && end > maxDate) return false

  if (maxDays !== undefined) {
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    if (daysDiff > maxDays) return false
  }

  return true
}

// ============================================================================
// Date Range Presets
// ============================================================================

function getTodayRange(): [Date, Date] {
  const today = new Date()
  return [startOfDay(today), endOfDay(today)]
}

function getYesterdayRange(): [Date, Date] {
  const yesterday = addDays(new Date(), -1)
  return [startOfDay(yesterday), endOfDay(yesterday)]
}

function getLast7DaysRange(): [Date, Date] {
  const end = new Date()
  const start = addDays(end, -6)
  return [startOfDay(start), endOfDay(end)]
}

function getLast30DaysRange(): [Date, Date] {
  const end = new Date()
  const start = addDays(end, -29)
  return [startOfDay(start), endOfDay(end)]
}

function getThisMonthRange(): [Date, Date] {
  const today = new Date()
  return [startOfMonth(today), endOfMonth(today)]
}

function getLastMonthRange(): [Date, Date] {
  const today = new Date()
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  return [startOfMonth(lastMonth), endOfMonth(lastMonth)]
}

// ============================================================================
// Parser Definitions (exported for composability with nuqs loaders/serializers)
// ============================================================================

/**
 * Create date range parsers for use with nuqs
 * @param startKey - Query param key for start date (default: 'from')
 * @param endKey - Query param key for end date (default: 'to')
 * @param presetKey - Query param key for preset (default: 'range')
 * @param defaultPreset - Default preset value
 * @param format - Date format ('iso' or 'timestamp', default: 'iso')
 * @returns Parser object for use with useQueryStates or nuqs loaders/serializers
 *
 * @example
 * // Use with loaders
 * const parsers = createDateRangeParsers({
 *   startKey: 'from',
 *   endKey: 'to',
 *   defaultPreset: 'last7days'
 * })
 * const loader = createLoader(parsers)
 *
 * // Use with link serializers
 * const serializer = createSerializer(parsers)
 * const href = serializer('/analytics', {
 *   from: '2024-01-01',
 *   to: '2024-01-31',
 *   range: 'custom'
 * })
 */
export function createDateRangeParsers(
  options: {
    startKey?: string
    endKey?: string
    presetKey?: string
    defaultPreset?: DatePreset
  } = {}
) {
  const {
    startKey = 'from',
    endKey = 'to',
    presetKey = 'range',
    defaultPreset = 'last7days',
  } = options

  const PRESETS = [
    'today',
    'yesterday',
    'last7days',
    'last30days',
    'thisMonth',
    'lastMonth',
    'custom',
  ] as const

  return {
    [startKey]: parseAsString,
    [endKey]: parseAsString,
    [presetKey]: parseAsStringLiteral(PRESETS).withDefault(defaultPreset),
  }
}

// ============================================================================
// Hook
// ============================================================================

const PRESETS = [
  'today',
  'yesterday',
  'last7days',
  'last30days',
  'thisMonth',
  'lastMonth',
  'custom',
] as const

export function useDateRange(options: UseDateRangeOptions = {}): UseDateRangeResult {
  const {
    defaultPreset = 'last7days',
    minDate,
    maxDate,
    maxDays,
    startKey = 'from',
    endKey = 'to',
    presetKey = 'range',
    format = 'iso',
    history = 'replace',
    scroll = false,
    shallow = true,
  } = options

  const [state, setState] = useQueryStates(
    {
      [startKey]: parseAsString,
      [endKey]: parseAsString,
      [presetKey]: parseAsStringLiteral(PRESETS).withDefault(defaultPreset),
    },
    {
      history,
      scroll,
      shallow,
    }
  )

  const startDate = useMemo(
    () => parseDate(state[startKey] ?? null, format),
    [state, startKey, format]
  )

  const endDate = useMemo(() => parseDate(state[endKey] ?? null, format), [state, endKey, format])

  const preset = (state[presetKey] ?? defaultPreset) as DatePreset

  const isValid = useMemo(
    () => isValidRange(startDate, endDate, minDate, maxDate, maxDays),
    [startDate, endDate, minDate, maxDate, maxDays]
  )

  const daysDifference = useMemo(() => {
    if (!startDate || !endDate) return 0
    return daysBetween(startDate, endDate)
  }, [startDate, endDate])

  const setStartDate = useCallback(
    (date: Date | null) => {
      setState({
        [startKey]: serializeDate(date, format),
        [presetKey]: 'custom',
      })
    },
    [setState, startKey, presetKey, format]
  )

  const setEndDate = useCallback(
    (date: Date | null) => {
      setState({
        [endKey]: serializeDate(date, format),
        [presetKey]: 'custom',
      })
    },
    [setState, endKey, presetKey, format]
  )

  const setRange = useCallback(
    (start: Date, end: Date) => {
      setState({
        [startKey]: serializeDate(start, format),
        [endKey]: serializeDate(end, format),
        [presetKey]: 'custom',
      })
    },
    [setState, startKey, endKey, presetKey, format]
  )

  const setPreset = useCallback(
    (newPreset: DatePreset) => {
      let range: [Date, Date] | null = null

      switch (newPreset) {
        case 'today':
          range = getTodayRange()
          break
        case 'yesterday':
          range = getYesterdayRange()
          break
        case 'last7days':
          range = getLast7DaysRange()
          break
        case 'last30days':
          range = getLast30DaysRange()
          break
        case 'thisMonth':
          range = getThisMonthRange()
          break
        case 'lastMonth':
          range = getLastMonthRange()
          break
        case 'custom':
          setState({ [presetKey]: 'custom' })
          return
      }

      if (range) {
        setState({
          [startKey]: serializeDate(range[0], format),
          [endKey]: serializeDate(range[1], format),
          [presetKey]: newPreset,
        })
      }
    },
    [setState, startKey, endKey, presetKey, format]
  )

  const clearRange = useCallback(() => {
    setState({
      [startKey]: null,
      [endKey]: null,
      [presetKey]: null,
    })
  }, [setState, startKey, endKey, presetKey])

  const presets = useMemo(
    () => ({
      today: () => setPreset('today'),
      yesterday: () => setPreset('yesterday'),
      last7days: () => setPreset('last7days'),
      last30days: () => setPreset('last30days'),
      thisMonth: () => setPreset('thisMonth'),
      lastMonth: () => setPreset('lastMonth'),
      custom: () => setPreset('custom'),
    }),
    [setPreset]
  )

  return {
    startDate,
    endDate,
    preset,
    isValid,
    daysDifference,
    setStartDate,
    setEndDate,
    setRange,
    setPreset,
    clearRange,
    presets,
    isPending: false,
  }
}
