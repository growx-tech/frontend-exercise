import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../game/GameContext'
import CardTile from '../ui/CardTile'

const GamePage: React.FC = () => {
  const { playerName, cards, config, seconds, moves, gameOver } = useGame()
  const nav = useNavigate()
  useEffect(() => {
    if (gameOver) {
      const t = setTimeout(() => nav('/end'), 500)
      return () => clearTimeout(t)
    }
  }, [gameOver, nav])

  const style: React.CSSProperties = {
    gridTemplateColumns: `repeat(${config.cols}, 1fr)`
  }

  return (
    <div className='page game'>
      <header>
        <span>Player: {playerName}</span>
        <span>Time: {seconds}s</span>
        <span>Moves: {moves}</span>
      </header>
      <div className='board' style={style}>
        {cards.map((c) => (
          <CardTile key={c.id} card={c} />
        ))}
      </div>
    </div>
  )
}

export default GamePage
