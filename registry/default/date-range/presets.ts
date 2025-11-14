import { addDays, endOfDay, endOfMonth, startOfDay, startOfMonth } from '../../lib/utils/date'

export function getTodayRange(): [Date, Date] {
  const today = new Date()
  return [startOfDay(today), endOfDay(today)]
}

export function getYesterdayRange(): [Date, Date] {
  const yesterday = addDays(new Date(), -1)
  return [startOfDay(yesterday), endOfDay(yesterday)]
}

export function getLast7DaysRange(): [Date, Date] {
  const end = new Date()
  const start = addDays(end, -6)
  return [startOfDay(start), endOfDay(end)]
}

export function getLast30DaysRange(): [Date, Date] {
  const end = new Date()
  const start = addDays(end, -29)
  return [startOfDay(start), endOfDay(end)]
}

export function getThisMonthRange(): [Date, Date] {
  const today = new Date()
  return [startOfMonth(today), endOfMonth(today)]
}

export function getLastMonthRange(): [Date, Date] {
  const today = new Date()
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  return [startOfMonth(lastMonth), endOfMonth(lastMonth)]
}
