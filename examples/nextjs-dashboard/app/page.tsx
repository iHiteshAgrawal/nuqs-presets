import { TabNavigation } from '@/components/TabNavigation'
import { DateRangePicker } from '@/components/DateRangePicker'
import { RegionMultiSelect } from '@/components/RegionMultiSelect'
import { CategoryMultiSelect } from '@/components/CategoryMultiSelect'
import { KPICards } from '@/components/KPICards'
import { DataTable } from '@/components/DataTable'
import { searchParamsCache } from './search-params'
import { Suspense } from 'react'
import { LoadingCards } from '@/components/LoadingCards'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  await searchParamsCache.parse(await searchParams)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            Analytics Dashboard
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Real-time metrics and insights
          </p>
        </header>

        <TabNavigation />

        <div className="mt-6 flex flex-col lg:flex-row gap-4">
          <DateRangePicker />
          <RegionMultiSelect />
          <CategoryMultiSelect />
        </div>

        <Suspense fallback={<LoadingCards />}>
          <KPICards />
        </Suspense>

        <div className="mt-8">
          <DataTable />
        </div>
      </div>
    </main>
  )
}
