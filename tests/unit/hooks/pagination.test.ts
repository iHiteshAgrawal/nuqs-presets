import { describe, expect, it } from 'vitest'
import {
  calculateOffset,
  calculateTotalPages,
  getPageNumbers,
  normalizePage,
} from '../../../src/hooks/pagination/utils'

describe('pagination utils', () => {
  describe('calculateTotalPages', () => {
    it('should calculate total pages correctly', () => {
      expect(calculateTotalPages(100, 10)).toBe(10)
      expect(calculateTotalPages(95, 10)).toBe(10)
      expect(calculateTotalPages(101, 10)).toBe(11)
      expect(calculateTotalPages(0, 10)).toBe(1)
    })
  })

  describe('calculateOffset', () => {
    it('should calculate offset correctly', () => {
      expect(calculateOffset(1, 10)).toBe(0)
      expect(calculateOffset(2, 10)).toBe(10)
      expect(calculateOffset(3, 25)).toBe(50)
    })
  })

  describe('normalizePage', () => {
    it('should normalize page numbers', () => {
      expect(normalizePage(0)).toBe(1)
      expect(normalizePage(-1)).toBe(1)
      expect(normalizePage(5, 10)).toBe(5)
      expect(normalizePage(15, 10)).toBe(10)
    })
  })

  describe('getPageNumbers', () => {
    it('should return all pages when total is less than max', () => {
      expect(getPageNumbers(1, 5, 7)).toEqual([1, 2, 3, 4, 5])
    })

    it('should return centered pages when total exceeds max', () => {
      const pages = getPageNumbers(5, 10, 7)
      expect(pages).toHaveLength(7)
      expect(pages).toContain(5)
    })
  })
})
