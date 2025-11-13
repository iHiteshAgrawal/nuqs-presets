import type { BaseHookOptions } from '../../types'

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
