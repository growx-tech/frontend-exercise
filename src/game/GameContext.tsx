import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react'
import { BoardConfig, Card } from './types'
import { generateBoard } from './utils'

interface GameState {
  playerName: string
  config: BoardConfig
  cards: Card[]
  moves: number
  seconds: number
  gameOver: boolean
  startGame: (name: string, config: BoardConfig) => void
  flipCard: (id: string) => void
  reset: () => void
}

const GameContext = createContext<GameState | undefined>(undefined)

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playerName, setPlayerName] = useState('')
  const [config, setConfig] = useState<BoardConfig>({ rows: 4, cols: 4 })
  const [cards, setCards] = useState<Card[]>([])
  const [selection, setSelection] = useState<string[]>([])
  const [moves, setMoves] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (running) {
      timerRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    }
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [running])

  useEffect(() => {
    if (!cards.length) return
    if (cards.every((c) => c.matched)) {
      setRunning(false)
      setGameOver(true)
    }
  }, [cards])

  const startGame = useCallback((name: string, cfg: BoardConfig) => {
    setPlayerName(name)
    setConfig(cfg)
    setCards(generateBoard(cfg))
    setMoves(0)
    setSeconds(0)
    setRunning(false)
    setGameOver(false)
    setSelection([])
  }, [])

  const flipCard = (id: string) => {
    setCards((prev) => {
      const idx = prev.findIndex((c) => c.id === id)
      if (idx === -1 || prev[idx].revealed || prev[idx].matched) return prev
      const updated = [...prev]
      updated[idx] = { ...updated[idx], revealed: true }
      return updated
    })
    setSelection((sel) => {
      if (!running) setRunning(true)
      if (sel.length === 0) return [id]
      if (sel.length === 1 && sel[0] !== id) {
        const firstId = sel[0]
        const secondId = id
        setMoves((m) => m + 1)
        setTimeout(() => {
          setCards((prev) => {
            const first = prev.find((c) => c.id === firstId)!
            const second = prev.find((c) => c.id === secondId)!
            const match = first.image === second.image
            return prev.map((c) => {
              if (c.id === first.id || c.id === second.id) {
                if (match) return { ...c, matched: true }
                return { ...c, revealed: false }
              }
              return c
            })
          })
        }, 800)
        return []
      }
      return sel
    })
  }

  const reset = () => {
    if (playerName) startGame(playerName, config)
  }

  return (
    <GameContext.Provider value={{ playerName, config, cards, moves, seconds, gameOver, startGame, flipCard, reset }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
