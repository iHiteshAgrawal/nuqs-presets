import { describe, expect, it } from 'vitest'
import { clamp, isValidDate, isValidNumber } from '../../../src/utils/validation'

describe('validation utils', () => {
  describe('clamp', () => {
    it('should clamp value between min and max', () => {
      expect(clamp(5, 0, 10)).toBe(5)
      expect(clamp(-5, 0, 10)).toBe(0)
      expect(clamp(15, 0, 10)).toBe(10)
    })
  })

  describe('isValidNumber', () => {
    it('should validate numbers correctly', () => {
      expect(isValidNumber(5)).toBe(true)
      expect(isValidNumber(0)).toBe(true)
      expect(isValidNumber(-5)).toBe(true)
      expect(isValidNumber(Number.NaN)).toBe(false)
      expect(isValidNumber(Number.POSITIVE_INFINITY)).toBe(false)
      expect(isValidNumber('5')).toBe(false)
    })
  })

  describe('isValidDate', () => {
    it('should validate dates correctly', () => {
      expect(isValidDate(new Date())).toBe(true)
      expect(isValidDate(new Date('invalid'))).toBe(false)
      expect(isValidDate('2024-01-01')).toBe(false)
    })
  })
})
