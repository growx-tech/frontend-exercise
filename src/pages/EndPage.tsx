import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../game/GameContext'

const EndPage: React.FC = () => {
  const { playerName, seconds, moves, reset } = useGame()
  const nav = useNavigate()
  const playAgain = () => {
    reset()
    nav('/game')
  }
  return (
    <div className='page end'>
      <h2>Well done, {playerName}!</h2>
      <p>Time: {seconds}s</p>
      <p>Moves: {moves}</p>
      <button onClick={playAgain}>Play again</button>
      <button onClick={() => nav('/')}>New player</button>
    </div>
  )
}

export default EndPage
