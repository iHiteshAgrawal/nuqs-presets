import { ProductList } from '@/components/ProductList'

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            nuqs-presets Basic Example
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Demonstrating pagination, search, and sorting with URL state persistence
          </p>
        </header>

        <ProductList />
      </div>
    </main>
  )
}
