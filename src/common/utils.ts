export const renderGameTiles = (gridSize: number) => {
  const numbers = [
    ...Array(Math.floor((gridSize * gridSize) / 2))
      .keys()
      .map((n) => n + 1)
  ]
  const shuffledCards = [...numbers, ...numbers].sort(() => Math.random() - 0.5).map((number, index) => ({ id: index, number }))
  return shuffledCards
}

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`
  return formattedTime
}
