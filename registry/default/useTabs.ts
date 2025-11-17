import { parseAsStringLiteral, useQueryState } from 'nuqs'
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

export interface UseTabsOptions<TTabs extends readonly string[] = readonly string[]>
  extends BaseHookOptions {
  defaultTab?: TTabs[number]
  tabKey?: string
}

export interface UseTabsResult<TTab = string> {
  activeTab: TTab
  tabs: readonly TTab[]
  activeIndex: number
  setTab: (tab: TTab) => void
  setTabByIndex: (index: number) => void
  nextTab: () => void
  prevTab: () => void
  isActive: (tab: TTab) => boolean
  getTabIndex: (tab: TTab) => number
  isPending: boolean
}

// ============================================================================
// Parser Definitions (exported for composability with nuqs loaders/serializers)
// ============================================================================

/**
 * Create tabs parser for use with nuqs
 * @param tabs - Array of allowed tab values
 * @param tabKey - Query param key for tab (default: 'tab')
 * @param defaultTab - Default tab value (defaults to first tab)
 * @returns Parser for use with useQueryState or nuqs loaders/serializers
 * 
 * @example
 * // Use with loaders
 * const tabs = ['overview', 'details', 'settings'] as const
 * const parser = createTabsParser({ tabs, defaultTab: 'overview' })
 * const loader = createLoader({ tab: parser })
 * 
 * // Use with link serializers
 * const serializer = createSerializer({ tab: parser })
 * const href = serializer('/dashboard', { tab: 'settings' })
 */
export function createTabsParser<T extends readonly string[]>(options: {
  tabs: T
  tabKey?: string
  defaultTab?: T[number]
}) {
  const { tabs, defaultTab = tabs[0] } = options
  return parseAsStringLiteral(tabs as unknown as string[]).withDefault(defaultTab as string)
}

// ============================================================================
// Hook
// ============================================================================

export function useTabs<TTabs extends readonly string[]>(
  tabs: TTabs,
  options: UseTabsOptions<TTabs> = {}
): UseTabsResult<TTabs[number]> {
  const {
    defaultTab = tabs[0],
    tabKey = 'tab',
    history = 'replace',
    scroll = false,
    shallow = true,
  } = options

  const [activeTab, setActiveTab] = useQueryState(
    tabKey,
    parseAsStringLiteral(tabs as unknown as string[])
      .withDefault(defaultTab as string)
      .withOptions({
        history,
        scroll,
        shallow,
      })
  )

  const activeIndex = useMemo(() => tabs.indexOf(activeTab as TTabs[number]), [tabs, activeTab])

  const setTab = useCallback(
    (tab: TTabs[number]) => {
      setActiveTab(tab as string)
    },
    [setActiveTab]
  )

  const setTabByIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < tabs.length) {
        setActiveTab(tabs[index] as string)
      }
    },
    [setActiveTab, tabs]
  )

  const nextTab = useCallback(() => {
    const nextIndex = (activeIndex + 1) % tabs.length
    setTabByIndex(nextIndex)
  }, [activeIndex, tabs.length, setTabByIndex])

  const prevTab = useCallback(() => {
    const prevIndex = (activeIndex - 1 + tabs.length) % tabs.length
    setTabByIndex(prevIndex)
  }, [activeIndex, tabs.length, setTabByIndex])

  const isActive = useCallback(
    (tab: TTabs[number]): boolean => {
      return activeTab === tab
    },
    [activeTab]
  )

  const getTabIndex = useCallback(
    (tab: TTabs[number]): number => {
      return tabs.indexOf(tab)
    },
    [tabs]
  )

  return {
    activeTab: activeTab as TTabs[number],
    tabs,
    activeIndex,
    setTab,
    setTabByIndex,
    nextTab,
    prevTab,
    isActive,
    getTabIndex,
    isPending: false,
  }
}
