import { parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs'
import { useCallback, useMemo } from 'react'
import { daysBetween } from '../../lib/utils/date'
import {
  getLast7DaysRange,
  getLast30DaysRange,
  getLastMonthRange,
  getThisMonthRange,
  getTodayRange,
  getYesterdayRange,
} from './presets'
import type { DatePreset, UseDateRangeOptions, UseDateRangeResult } from './types'
import { isValidRange, parseDate, serializeDate } from './utils'

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
