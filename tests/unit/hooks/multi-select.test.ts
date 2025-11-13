import { describe, expect, it } from 'vitest'
import {
  addItem,
  parseSelection,
  removeItem,
  serializeSelection,
  toggleItem,
} from '../../../src/hooks/multi-select/utils'

describe('multi-select utils', () => {
  describe('parseSelection', () => {
    it('should parse comma-separated values', () => {
      expect(parseSelection('a,b,c', ',')).toEqual(['a', 'b', 'c'])
      expect(parseSelection('', ',')).toEqual([])
      expect(parseSelection(null, ',')).toEqual([])
    })
  })

  describe('serializeSelection', () => {
    it('should serialize array to string', () => {
      expect(serializeSelection(['a', 'b', 'c'], ',')).toBe('a,b,c')
      expect(serializeSelection([], ',')).toBe(null)
    })
  })

  describe('toggleItem', () => {
    it('should toggle items correctly', () => {
      expect(toggleItem(['a', 'b'], 'c')).toEqual(['a', 'b', 'c'])
      expect(toggleItem(['a', 'b', 'c'], 'b')).toEqual(['a', 'c'])
    })
  })

  describe('addItem', () => {
    it('should add item if not present', () => {
      expect(addItem(['a'], 'b')).toEqual(['a', 'b'])
      expect(addItem(['a'], 'a')).toEqual(['a'])
    })

    it('should respect max selection', () => {
      expect(addItem(['a', 'b'], 'c', 2)).toEqual(['a', 'b'])
      expect(addItem(['a'], 'b', 2)).toEqual(['a', 'b'])
    })
  })

  describe('removeItem', () => {
    it('should remove item', () => {
      expect(removeItem(['a', 'b', 'c'], 'b')).toEqual(['a', 'c'])
      expect(removeItem(['a'], 'b')).toEqual(['a'])
    })
  })
})
