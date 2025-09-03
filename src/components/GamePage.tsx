import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { getBoardDimensions, formatTime } from '../utils/gameUtils'
import GameBoard from './GameBoard'

const GamePage: React.FC = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useGame()
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    if (!state.playerName || state.tiles.length === 0) {
      navigate('/')
      return
    }

    if (!state.gameStartTime) {
      dispatch({ type: 'START_GAME' })
    }
  }, [state.playerName, state.tiles.length, state.gameStartTime, navigate, dispatch])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (state.isGameActive && state.gameStartTime) {
      interval = setInterval(() => {
        setCurrentTime(Date.now() - state.gameStartTime!)
      }, 100)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [state.isGameActive, state.gameStartTime])

  useEffect(() => {
    if (state.matchedPairs === state.totalPairs && state.totalPairs > 0) {
      dispatch({ type: 'END_GAME' })
      setTimeout(() => {
        navigate('/end')
      }, 1000)
    }
  }, [state.matchedPairs, state.totalPairs, navigate, dispatch])

  const handleTileClick = (tileId: number) => {
    if (!state.isGameActive) return

    const tile = state.tiles.find(t => t.id === tileId)
    if (!tile || tile.isFlipped || tile.isMatched || state.flippedTiles.length >= 2) {
      return
    }

    dispatch({ type: 'FLIP_TILE', payload: tileId })

    if (state.flippedTiles.length === 1) {
      const firstTileId = state.flippedTiles[0]
      const firstTile = state.tiles.find(t => t.id === firstTileId)

      if (firstTile && tile.imageUrl === firstTile.imageUrl) {
        // Match found
        setTimeout(() => {
          dispatch({ type: 'SET_MATCHED', payload: [firstTileId, tileId] })
        }, 500)
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          dispatch({ type: 'RESET_FLIPPED' })
        }, 1000)
      }
    }
  }

  const { rows, cols } = getBoardDimensions(state.boardSize)

  return (
    <div className="game-page">
      <header className="game-header">
        <div className="game-info">
          <h2>Player: {state.playerName}</h2>
          <div className="game-stats">
            <span>Time: {formatTime(currentTime)}</span>
            <span>Pairs: {state.matchedPairs} / {state.totalPairs}</span>
            <span>Board: {state.boardSize}</span>
          </div>
        </div>
      </header>

      <GameBoard
        tiles={state.tiles}
        rows={rows}
        cols={cols}
        onTileClick={handleTileClick}
      />

      {state.matchedPairs === state.totalPairs && state.totalPairs > 0 && (
        <div className="game-complete-message">
          <h3>Congratulations! 🎉</h3>
          <p>You completed the game!</p>
        </div>
      )}
    </div>
  )
}

export default GamePage
