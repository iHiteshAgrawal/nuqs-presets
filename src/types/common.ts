export type HistoryMode = 'push' | 'replace'

export interface BaseHookOptions {
  history?: HistoryMode
  scroll?: boolean
  shallow?: boolean
}

export interface UseTransitionOptions {
  startTransition?: (callback: () => void) => void
}
