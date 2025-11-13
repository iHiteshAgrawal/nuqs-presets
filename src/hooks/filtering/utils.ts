export function countActiveFilters(filters: Record<string, unknown>): number {
  return Object.values(filters).filter(
    (value) =>
      value !== undefined &&
      value !== null &&
      value !== '' &&
      !(Array.isArray(value) && value.length === 0)
  ).length
}
