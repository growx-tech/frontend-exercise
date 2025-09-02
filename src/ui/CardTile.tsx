import React from 'react'
import { Card } from '../game/types'
import { useGame } from '../game/GameContext'

const CardTile: React.FC<{ card: Card }> = ({ card }) => {
  const { flipCard } = useGame()
  const onClick = () => {
    if (!card.revealed && !card.matched) flipCard(card.id)
  }
  return (
    <button className={`card ${card.revealed || card.matched ? 'revealed' : ''}`} onClick={onClick} aria-label='card'>
      <div className='inner'>
        <div className='front'>
          <img src={card.image} alt='plant' loading='lazy' />
        </div>
        <div className='back'>
          <img src='/growy_logo.svg' alt='logo' />
        </div>
      </div>
    </button>
  )
}

export default CardTile
