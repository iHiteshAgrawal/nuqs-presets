import type { DateFormat } from './types'

export function parseDate(value: string | null, format: DateFormat): Date | null {
  if (!value) return null

  if (format === 'timestamp') {
    const timestamp = Number(value)
    if (Number.isNaN(timestamp)) return null
    return new Date(timestamp)
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export function serializeDate(date: Date | null, format: DateFormat): string | null {
  if (!date) return null

  if (format === 'timestamp') {
    return String(date.getTime())
  }

  return date.toISOString()
}

export function isValidRange(
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
