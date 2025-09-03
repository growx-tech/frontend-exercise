import { describe, it, expect } from 'vitest'
import { getBoardDimensions, createGameBoard, formatTime } from '../utils/gameUtils'
import { BoardSize } from '../context/GameContext'

describe('gameUtils', () => {
  describe('getBoardDimensions', () => {
    it('should return correct dimensions for each board size', () => {
      expect(getBoardDimensions('2x2')).toEqual({ rows: 2, cols: 2 })
      expect(getBoardDimensions('4x4')).toEqual({ rows: 4, cols: 4 })
      expect(getBoardDimensions('6x6')).toEqual({ rows: 6, cols: 6 })
      expect(getBoardDimensions('4x5')).toEqual({ rows: 4, cols: 5 })
    })
  })

  describe('createGameBoard', () => {
    it('should create correct number of tiles for 4x4 board', () => {
      const { tiles, totalPairs } = createGameBoard('4x4')
      expect(tiles).toHaveLength(16)
      expect(totalPairs).toBe(8)
    })

    it('should create correct number of tiles for 2x2 board', () => {
      const { tiles, totalPairs } = createGameBoard('2x2')
      expect(tiles).toHaveLength(4)
      expect(totalPairs).toBe(2)
    })

    it('should create tiles with unique IDs', () => {
      const { tiles } = createGameBoard('4x4')
      const ids = tiles.map(tile => tile.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(tiles.length)
    })

    it('should create pairs of tiles with same imageUrl', () => {
      const { tiles } = createGameBoard('2x2')
      const imageCounts = tiles.reduce((acc, tile) => {
        acc[tile.imageUrl] = (acc[tile.imageUrl] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      Object.values(imageCounts).forEach(count => {
        expect(count).toBe(2)
      })
    })
  })

  describe('formatTime', () => {
    it('should format time correctly', () => {
      expect(formatTime(0)).toBe('00:00')
      expect(formatTime(1000)).toBe('00:01')
      expect(formatTime(60000)).toBe('01:00')
      expect(formatTime(61500)).toBe('01:01')
      expect(formatTime(125000)).toBe('02:05')
    })
  })
})
