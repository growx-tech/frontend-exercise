import { Tile } from '../context/GameContext'
import GameTile from './GameTile'

interface GameBoardProps {
  tiles: Tile[]
  rows: number
  cols: number
  onTileClick: (tileId: number) => void
}

const GameBoard: React.FC<GameBoardProps> = ({ tiles, rows, cols, onTileClick }) => {
  return (
    <div 
      className="game-board"
      style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`
      }}
    >
      {tiles.map((tile) => (
        <GameTile
          key={tile.id}
          tile={tile}
          onClick={() => onTileClick(tile.id)}
        />
      ))}
    </div>
  )
}

export default GameBoard
