import { searchParamsCache } from '@/app/search-params'
import { calculateKPIs, metricsData } from '@/lib/analytics'

export function KPICards() {
  const { startDate, endDate, regions, categories } = searchParamsCache.all()

  const kpis = calculateKPIs(metricsData, {
    startDate: startDate ?? undefined,
    endDate: endDate ?? undefined,
    regions: regions.length > 0 ? regions : undefined,
    categories: categories.length > 0 ? categories : undefined,
  })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  const formatPercent = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  const cards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(kpis.revenue),
      change: formatPercent(kpis.revenueChange),
      trend: kpis.revenueChange >= 0 ? 'up' : 'down',
      icon: '💰',
    },
    {
      title: 'Total Users',
      value: formatNumber(kpis.users),
      change: formatPercent(kpis.usersChange),
      trend: kpis.usersChange >= 0 ? 'up' : 'down',
      icon: '👥',
    },
    {
      title: 'Conversion Rate',
      value: `${kpis.conversionRate.toFixed(2)}%`,
      change: formatPercent(kpis.conversionChange),
      trend: kpis.conversionChange >= 0 ? 'up' : 'down',
      icon: '📈',
    },
    {
      title: 'Avg Order Value',
      value: formatCurrency(kpis.avgOrderValue),
      change: formatPercent(kpis.avgOrderValueChange),
      trend: kpis.avgOrderValueChange >= 0 ? 'up' : 'down',
      icon: '🛒',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{card.title}</h3>
            <span className="text-2xl">{card.icon}</span>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{card.value}</p>
            <p
              className={`text-sm font-medium mt-1 ${
                card.trend === 'up'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              <span>{card.trend === 'up' ? '↑' : '↓'}</span> {card.change} from previous period
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
