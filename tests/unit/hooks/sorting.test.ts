import { describe, expect, it } from 'vitest'
import { getNextSortOrder, getSortIndicator } from '../../../src/hooks/sorting/utils'

describe('sorting utils', () => {
  describe('getNextSortOrder', () => {
    it('should cycle through sort orders correctly', () => {
      expect(getNextSortOrder(null, 'name', null)).toEqual({ column: 'name', order: 'asc' })
      expect(getNextSortOrder('name', 'name', 'asc')).toEqual({ column: 'name', order: 'desc' })
      expect(getNextSortOrder('name', 'name', 'desc')).toEqual({ column: 'name', order: 'asc' })
      expect(getNextSortOrder('name', 'email', 'asc')).toEqual({ column: 'email', order: 'asc' })
    })
  })

  describe('getSortIndicator', () => {
    it('should return correct indicators', () => {
      expect(getSortIndicator('asc')).toBe('↑')
      expect(getSortIndicator('desc')).toBe('↓')
      expect(getSortIndicator(null)).toBe('')
    })
  })
})
