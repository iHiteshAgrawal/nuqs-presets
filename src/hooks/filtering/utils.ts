export function parseFilterValue(value: string | null): unknown {
  if (value === null || value === '') return undefined

  if (value === 'true') return true
  if (value === 'false') return false

  const numValue = Number(value)
  if (!Number.isNaN(numValue)) return numValue

  if (value.includes(',')) {
    return value.split(',').map((v) => v.trim())
  }

  return value
}

export function serializeFilterValue(value: unknown): string | null {
  if (value === undefined || value === null) return null
  if (Array.isArray(value)) return value.join(',')
  return String(value)
}

export function countActiveFilters(filters: Record<string, unknown>): number {
  return Object.values(filters).filter(
    (value) =>
      value !== undefined &&
      value !== null &&
      value !== '' &&
      !(Array.isArray(value) && value.length === 0)
  ).length
}
