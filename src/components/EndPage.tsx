import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { formatTime } from '../utils/gameUtils'

const EndPage: React.FC = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useGame()

  const gameTime = state.gameStartTime && state.gameEndTime
    ? state.gameEndTime - state.gameStartTime
    : 0

  const handlePlayAgain = () => {
    dispatch({ type: 'RESET_GAME' })
    navigate('/')
  }

  const getPerformanceMessage = (time: number, pairs: number) => {
    const avgTimePerPair = time / pairs / 1000 // seconds per pair

    if (avgTimePerPair < 3) return "🏆 Amazing! Lightning fast!"
    if (avgTimePerPair < 5) return "🌟 Excellent memory skills!"
    if (avgTimePerPair < 8) return "👍 Well done!"
    if (avgTimePerPair < 12) return "✅ Good job!"
    return "🎯 Keep practicing!"
  }

  return (
    <div className="end-page">
      <div className="end-container">
        <img src="/growy_logo.svg" alt="Growy Logo" className="logo" />

        <h1>🎉 Congratulations!</h1>
        <h2>{state.playerName}</h2>

        <div className="results">
          <div className="result-item">
            <span className="label">Completion Time:</span>
            <span className="value">{formatTime(gameTime)}</span>
          </div>

          <div className="result-item">
            <span className="label">Board Size:</span>
            <span className="value">{state.boardSize}</span>
          </div>

          <div className="result-item">
            <span className="label">Total Pairs:</span>
            <span className="value">{state.totalPairs}</span>
          </div>
        </div>

        <div className="performance-message">
          <p>{getPerformanceMessage(gameTime, state.totalPairs)}</p>
        </div>

        <div className="end-actions">
          <button onClick={handlePlayAgain} className="play-again-button">
            Play Again
          </button>
          <button onClick={() => navigate('/')} className="new-game-button">
            New Game
          </button>
        </div>
      </div>
    </div>
  )
}

export default EndPage
