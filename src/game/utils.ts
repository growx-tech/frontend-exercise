import { Card, BoardConfig } from './types'

const allImages = [
  '/plant01.jpg',
  '/plant02.jpg',
  '/plant03.jpg',
  '/plant04.jpg',
  '/plant05.jpg',
  '/plant06.jpg',
  '/plant07.jpg',
  '/plant08.jpg',
  '/plant09.jpg',
  '/plant10.jpg',
  '/plant11.jpg',
  '/plant12.jpg',
  '/plant13.jpg'
]

export function pickImages(pairCount: number): string[] {
  if (pairCount > allImages.length) throw new Error('Not enough images')
  const shuffled = [...allImages].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, pairCount)
}

export function generateBoard(config: BoardConfig): Card[] {
  const total = config.rows * config.cols
  if (total % 2 !== 0) throw new Error('Board must have even number of tiles')
  const pairCount = total / 2
  const images = pickImages(pairCount)
  const cards: Card[] = images.flatMap((img, i) => [
    { id: `${i}-a`, image: img, matched: false, revealed: false },
    { id: `${i}-b`, image: img, matched: false, revealed: false }
  ])
  return shuffle(cards)
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
