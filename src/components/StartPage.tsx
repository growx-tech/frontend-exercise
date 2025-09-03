import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame, BoardSize } from '../context/GameContext'
import { createGameBoard } from '../utils/gameUtils'

const StartPage: React.FC = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useGame()
  const [name, setName] = useState(state.playerName)
  const [boardSize, setBoardSize] = useState<BoardSize>(state.boardSize)

  const handleStartGame = () => {
    if (name.trim()) {
      dispatch({ type: 'SET_PLAYER_NAME', payload: name.trim() })
      dispatch({ type: 'SET_BOARD_SIZE', payload: boardSize })

      const { tiles, totalPairs } = createGameBoard(boardSize)
      dispatch({ type: 'INITIALIZE_GAME', payload: { tiles, totalPairs } })

      navigate('/game')
    }
  }

  const getBoardSizeDescription = (size: BoardSize) => {
    switch (size) {
      case '2x2': return '4 tiles (2 pairs) - Easy'
      case '4x4': return '16 tiles (8 pairs) - Medium'
      case '6x6': return '36 tiles (18 pairs) - Hard'
      case '4x5': return '20 tiles (10 pairs) - Custom'
      default: return ''
    }
  }

  return (
    <div className="start-page">
      <div className="start-container">
        <img src="/growy_logo.svg" alt="Growy Logo" className="logo" />
        <h1>Memory Game Challenge</h1>
        <p>Test your memory by matching pairs of plant images!</p>

        <div className="form-group">
          <label htmlFor="player-name">Enter your name:</label>
          <input
            id="player-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name here..."
            className="name-input"
            maxLength={20}
          />
        </div>

        <div className="form-group">
          <label htmlFor="board-size">Choose difficulty:</label>
          <select
            id="board-size"
            value={boardSize}
            onChange={(e) => setBoardSize(e.target.value as BoardSize)}
            className="board-size-select"
          >
            <option value="2x2">{getBoardSizeDescription('2x2')}</option>
            <option value="4x4">{getBoardSizeDescription('4x4')}</option>
            <option value="6x6">{getBoardSizeDescription('6x6')}</option>
            <option value="4x5">{getBoardSizeDescription('4x5')}</option>
          </select>
        </div>

        <button
          onClick={handleStartGame}
          disabled={!name.trim()}
          className="start-button"
        >
          Start Game
        </button>
      </div>
    </div>
  )
}

export default StartPage
