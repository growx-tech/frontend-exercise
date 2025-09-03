import { Tile, BoardSize } from '../context/GameContext'

const PLANT_IMAGES = [
  '/plant01.jpg', '/plant02.jpg', '/plant03.jpg', '/plant04.jpg',
  '/plant05.jpg', '/plant06.jpg', '/plant07.jpg', '/plant08.jpg',
  '/plant09.jpg', '/plant10.jpg', '/plant11.jpg', '/plant12.jpg',
  '/plant13.jpg'
]

export const getBoardDimensions = (boardSize: BoardSize): { rows: number; cols: number } => {
  switch (boardSize) {
    case '2x2': return { rows: 2, cols: 2 }
    case '4x4': return { rows: 4, cols: 4 }
    case '6x6': return { rows: 6, cols: 6 }
    case '4x5': return { rows: 4, cols: 5 }
    default: return { rows: 4, cols: 4 }
  }
}

export const createGameBoard = (boardSize: BoardSize): { tiles: Tile[]; totalPairs: number } => {
  const { rows, cols } = getBoardDimensions(boardSize)
  const totalTiles = rows * cols
  const totalPairs = Math.floor(totalTiles / 2)

  // Select random plant images for the pairs
  const selectedImages = PLANT_IMAGES
    .sort(() => Math.random() - 0.5)
    .slice(0, totalPairs)

  // Create pairs of tiles
  const tiles: Tile[] = []
  let id = 0

  selectedImages.forEach(imageUrl => {
    // Add two tiles for each image (a pair)
    tiles.push({
      id: id++,
      imageUrl,
      isFlipped: false,
      isMatched: false
    })
    tiles.push({
      id: id++,
      imageUrl,
      isFlipped: false,
      isMatched: false
    })
  })

  // If we have an odd number of tiles, add one more tile with a random image
  if (totalTiles % 2 === 1) {
    const randomImage = PLANT_IMAGES[Math.floor(Math.random() * PLANT_IMAGES.length)]
    tiles.push({
      id: id++,
      imageUrl: randomImage,
      isFlipped: false,
      isMatched: false
    })
  }

  // Shuffle the tiles
  const shuffledTiles = tiles.sort(() => Math.random() - 0.5)

  return { tiles: shuffledTiles, totalPairs }
}

export const formatTime = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
