'use client'

import { useTabs } from 'nuqs-presets/tabs'

const tabs = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
  { id: 'reports', label: 'Reports', icon: '📄' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
] as const

export function TabNavigation() {
  const { activeTab, setTab, isActive } = useTabs([
    'overview',
    'analytics',
    'reports',
    'settings',
  ] as const)

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="flex space-x-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setTab(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors whitespace-nowrap
              ${
                isActive(tab.id)
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600'
              }
            `}
          >
            <span className="text-xl">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
