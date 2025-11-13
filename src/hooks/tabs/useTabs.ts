import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { useCallback, useMemo } from 'react'
import type { UseTabsOptions, UseTabsResult } from './types'

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
