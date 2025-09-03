import { Tile } from '../context/GameContext'

interface GameTileProps {
  tile: Tile
  onClick: () => void
}

const GameTile: React.FC<GameTileProps> = ({ tile, onClick }) => {
  const handleClick = () => {
    if (!tile.isFlipped && !tile.isMatched) {
      onClick()
    }
  }

  return (
    <div 
      className={`game-tile ${tile.isFlipped || tile.isMatched ? 'flipped' : ''} ${tile.isMatched ? 'matched' : ''}`}
      onClick={handleClick}
    >
      <div className="tile-inner">
        <div className="tile-back">
          <img src="/growy_logo.svg" alt="Card back" />
        </div>
        <div className="tile-front">
          <img src={tile.imageUrl} alt="Plant" />
        </div>
      </div>
    </div>
  )
}

export default GameTile
