export function parseSelection(value: string | null, separator: string): string[] {
  if (!value) return []
  return value.split(separator).filter((item) => item.trim() !== '')
}

export function serializeSelection(items: string[], separator: string): string | null {
  if (items.length === 0) return null
  return items.join(separator)
}

export function toggleItem(items: string[], item: string): string[] {
  const index = items.indexOf(item)
  if (index === -1) {
    return [...items, item]
  }
  return items.filter((i) => i !== item)
}

export function addItem(items: string[], item: string, maxSelection?: number): string[] {
  if (items.includes(item)) return items

  if (maxSelection !== undefined && items.length >= maxSelection) {
    return items
  }

  return [...items, item]
}

export function removeItem(items: string[], item: string): string[] {
  return items.filter((i) => i !== item)
}
