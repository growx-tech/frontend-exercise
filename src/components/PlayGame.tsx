import { useCallback, useEffect, useRef, useState } from 'react'
import growy_logo from '../../public/growy_logo.svg'
import { formatTime, renderGameTiles } from '../common/utils'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { setWon, setCards, setPages, setResult } from '../store/gameSlice'
import { Pages } from '../common/models'

const PlayGame = () => {
  const dispatch = useDispatch<AppDispatch>()
  const username = useSelector((state: RootState) => state.user.name)
  const gridSize = useSelector((state: RootState) => state.game.gridSize)
  const won = useSelector((state: RootState) => state.game.won)
  const enableMove = useSelector((state: RootState) => state.game.enableMove)
  const cards = useSelector((state: RootState) => state.game.cards)
  const result = useSelector((state: RootState) => state.game.result)

  const [flipped, setFlipped] = useState<number[]>([])
  const [sloved, setSolved] = useState<number[]>([])
  const [movesLeft, setMovesLeft] = useState<number | null>(() => Math.floor((gridSize * gridSize) / 2) * 2)
  const [timer, setTimer] = useState<number>(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [resetGame, setResetGame] = useState<boolean>(false)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current)
      }
    }
  }, [gridSize, enableMove, resetGame])

  useEffect(() => {
    const shuffledCards = renderGameTiles(gridSize)
    dispatch(setCards(shuffledCards))
    setFlipped([])
    setSolved([])
    dispatch(setWon(false))
    enableMove && setMovesLeft(((gridSize * gridSize) / 2) * 2)
    setTimer(0)
    resetGame && setResetGame(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridSize, enableMove, resetGame])

  useEffect(() => {
    if (enableMove && movesLeft === 0) {
      dispatch(setResult([...result, { gameWin: 0, gameLoss: 1, gridSize, time: formatTime(timer), won: false, loss: true }]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movesLeft, enableMove])

  useEffect(() => {
    if (cards.length > 0 && cards.length === sloved.length) {
      timerRef.current !== null && clearInterval(timerRef.current)
      dispatch(setWon(true))
      dispatch(setResult([...result, { gameWin: 1, gameLoss: 0, gridSize, time: formatTime(timer), won: true, loss: false }]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sloved, cards])

  const handleTileClicked = (id: number) => {
    if (won) return
    if (flipped.length === 0) {
      setFlipped([id])
      return
    }
    if (flipped.length === 1) {
      if (id !== flipped[0]) {
        setFlipped((prev) => [...prev, id])
        checkForMatchedTile(id)
      } else {
        setFlipped([])
      }
      if (enableMove) {
        setMovesLeft((prev) => {
          if (prev !== null) {
            return prev - 1
          }
          return prev
        })
      }
    }
  }

  const checkForMatchedTile = (secondId: number) => {
    const [firstId] = flipped
    if (cards[firstId].number === cards[secondId].number) {
      setSolved((prev) => [...prev, firstId, secondId])
      setFlipped([])
    } else {
      setTimeout(() => {
        setFlipped([])
      }, 500)
    }
  }

  const isCardFlipped = useCallback(
    (id: number) => {
      return flipped.includes(id) || sloved.includes(id)
    },
    [flipped, sloved]
  )

  const isSolved = (id: number) => sloved.includes(id)

  return (
    <div className='bg-grap-100 flex min-h-screen flex-col items-center justify-center p-4'>
      <h1 className='mb-6 text-3xl font-bold'>{username}, welcome to Memory Game</h1>

      <div className='ml-10 flex items-center justify-center gap-4'>
        <div>
          <label htmlFor='gridSize' className='mr-2'>
            Grid Size :
          </label>
          <input type='number' className='rounded border-2 border-gray-300 px-2 py-1' defaultValue={gridSize} />
        </div>
        <div>
          {enableMove && (
            <div className='flex items-center justify-center gap-2'>
              <div>
                <label htmlFor='maxMoved' className='mr-2'>
                  Moves Left :
                </label>
                <input type='number' id='maxMoved' className='rounded border-2 border-gray-300 px-2 py-1' value={movesLeft ? movesLeft : 0} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='mt-4 text-lg font-semibold'>
        ⏲ Time: <span>{formatTime(timer)}</span> min
      </div>

      <div
        className={`mt-8 mb-4 grid gap-2`}
        style={{ gridTemplateColumns: `repeat(${gridSize},minmax(0,1fr))`, width: `min(100%,${gridSize * 5.5}rem})` }}>
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              className={`aspect-sqaure flex cursor-pointer items-center justify-center rounded-lg bg-gray-200 p-10 text-xl font-bold text-gray-800 transition-all duration-300 ${isCardFlipped(card.id) ? `${isSolved(card.id) ? 'bg-green-400' : 'bg-blue-500'} text-white` : 'bg-gray-200 text-gray-400'}`}
              onClick={() => handleTileClicked(card.id)}>
              {isCardFlipped(card.id) ? card.number : <img src={growy_logo} alt='Growy Logo' className='h-10 w-10 object-contain' />}
            </div>
          )
        })}
      </div>

      {(won || movesLeft === 0) && (
        <div className={`mt-4 animate-bounce text-4xl font-bold ${won ? 'text-green-600' : 'text-red-600'}`}>
          {won ? 'You won' : 'Sorry, better luck next time'}
        </div>
      )}
      <div className='flex w-[50%] items-center justify-center gap-16'>
        <button
          className='mt-4 rounded bg-gray-500 px-4 py-2 text-white hover:bg-green-600'
          name='playAgain'
          onClick={() => setResetGame(!resetGame)}>
          {won ? 'Play Again' : 'Reset'}
        </button>

        <button className='mt-4 rounded bg-gray-500 px-4 py-2 text-white hover:bg-green-600' onClick={() => dispatch(setPages(Pages.EndGame))}>
          End Game
        </button>
      </div>
    </div>
  )
}

export default PlayGame
