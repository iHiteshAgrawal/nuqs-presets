export interface MetricData {
  date: string
  revenue: number
  users: number
  conversions: number
  region: string
  category: string
}

export interface KPIData {
  revenue: number
  revenueChange: number
  users: number
  usersChange: number
  conversionRate: number
  conversionChange: number
  avgOrderValue: number
  avgOrderValueChange: number
}

const REGIONS = ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania']
const CATEGORIES = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty']

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateMetricsData(days: number = 90): MetricData[] {
  const data: MetricData[] = []
  const today = new Date()

  for (let i = 0; i < days; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    for (const region of REGIONS) {
      for (const category of CATEGORIES) {
        const baseRevenue = getRandomInt(1000, 10000)
        const baseUsers = getRandomInt(100, 1000)

        data.push({
          date: date.toISOString().split('T')[0],
          revenue: baseRevenue,
          users: baseUsers,
          conversions: getRandomInt(10, Math.floor(baseUsers * 0.1)),
          region,
          category,
        })
      }
    }
  }

  return data
}

export function calculateKPIs(
  data: MetricData[],
  filters: {
    startDate?: string
    endDate?: string
    regions?: string[]
    categories?: string[]
  }
): KPIData {
  let filtered = data

  if (filters.startDate) {
    filtered = filtered.filter((d) => d.date >= filters.startDate!)
  }
  if (filters.endDate) {
    filtered = filtered.filter((d) => d.date <= filters.endDate!)
  }
  if (filters.regions?.length) {
    filtered = filtered.filter((d) => filters.regions!.includes(d.region))
  }
  if (filters.categories?.length) {
    filtered = filtered.filter((d) => filters.categories!.includes(d.category))
  }

  const totalRevenue = filtered.reduce((sum, d) => sum + d.revenue, 0)
  const totalUsers = filtered.reduce((sum, d) => sum + d.users, 0)
  const totalConversions = filtered.reduce((sum, d) => sum + d.conversions, 0)
  const conversionRate = totalUsers > 0 ? (totalConversions / totalUsers) * 100 : 0
  const avgOrderValue = totalConversions > 0 ? totalRevenue / totalConversions : 0

  const midpoint = Math.floor(filtered.length / 2)
  const firstHalf = filtered.slice(0, midpoint)
  const secondHalf = filtered.slice(midpoint)

  const firstRevenue =
    firstHalf.reduce((sum, d) => sum + d.revenue, 0) / Math.max(firstHalf.length, 1)
  const secondRevenue =
    secondHalf.reduce((sum, d) => sum + d.revenue, 0) / Math.max(secondHalf.length, 1)
  const revenueChange = firstRevenue > 0 ? ((secondRevenue - firstRevenue) / firstRevenue) * 100 : 0

  const firstUsers = firstHalf.reduce((sum, d) => sum + d.users, 0) / Math.max(firstHalf.length, 1)
  const secondUsers =
    secondHalf.reduce((sum, d) => sum + d.users, 0) / Math.max(secondHalf.length, 1)
  const usersChange = firstUsers > 0 ? ((secondUsers - firstUsers) / firstUsers) * 100 : 0

  const firstConversionRate =
    firstHalf.length > 0
      ? (firstHalf.reduce((sum, d) => sum + d.conversions, 0) /
          firstHalf.reduce((sum, d) => sum + d.users, 0)) *
        100
      : 0
  const secondConversionRate =
    secondHalf.length > 0
      ? (secondHalf.reduce((sum, d) => sum + d.conversions, 0) /
          secondHalf.reduce((sum, d) => sum + d.users, 0)) *
        100
      : 0
  const conversionChange =
    firstConversionRate > 0
      ? ((secondConversionRate - firstConversionRate) / firstConversionRate) * 100
      : 0

  return {
    revenue: totalRevenue,
    revenueChange,
    users: totalUsers,
    usersChange,
    conversionRate,
    conversionChange,
    avgOrderValue,
    avgOrderValueChange: getRandomInt(-10, 20),
  }
}

export interface TableRow {
  id: string
  name: string
  region: string
  revenue: number
  users: number
  conversionRate: number
  trend: 'up' | 'down' | 'neutral'
}

export function generateTableData(metrics: MetricData[]): TableRow[] {
  const grouped = new Map<string, { revenue: number; users: number; conversions: number }>()

  for (const metric of metrics) {
    const key = `${metric.region}-${metric.category}`
    const existing = grouped.get(key) || { revenue: 0, users: 0, conversions: 0 }
    grouped.set(key, {
      revenue: existing.revenue + metric.revenue,
      users: existing.users + metric.users,
      conversions: existing.conversions + metric.conversions,
    })
  }

  const rows: TableRow[] = []
  let id = 1

  for (const [key, data] of grouped.entries()) {
    const [region, category] = key.split('-')
    const conversionRate = data.users > 0 ? (data.conversions / data.users) * 100 : 0

    rows.push({
      id: String(id++),
      name: `${category} - ${region}`,
      region,
      revenue: data.revenue,
      users: data.users,
      conversionRate,
      trend: conversionRate > 5 ? 'up' : conversionRate < 2 ? 'down' : 'neutral',
    })
  }

  return rows
}

export const ALL_REGIONS = REGIONS
export const ALL_CATEGORIES = CATEGORIES

export const metricsData = generateMetricsData(90)
