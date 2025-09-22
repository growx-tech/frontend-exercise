import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { userResult } from '../common/models'

const EndPage = () => {
  const username = useSelector((state: RootState) => state.user.name)
  const result = useSelector((state: RootState) => state.game.result)

  const totalGameWon = (result: userResult[], winLossType: string) => {
    if (winLossType === 'gameWin') {
      return result.reduce((acc, res) => {
        acc += res.gameWin
        return acc
      }, 0)
    }
    return result.reduce((acc, res) => {
      acc += res.gameLoss
      return acc
    }, 0)
  }

  return (
    <div className='mt-10 flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center'>Thanks for playing, {username}</div>
      <div className='flex items-center justify-center gap-4 p-4'>
        <span>Game Won : </span> <span> {totalGameWon(result, 'gameWin')}</span>
        <span>Game Loss : </span> <span> {totalGameWon(result, 'gameLoss')}</span>
      </div>
      {result.map((res: userResult, index) => (
        <div className='flex items-center justify-center gap-4 p-4' key={`${res.gridSize}-${res.time}`}>
          <div className='flex items-center justify-center gap-4 p-4'>
            <span>Game No : </span> <span> {index + 1}</span>
          </div>
          <div className='flex items-center justify-center gap-4 p-4'>
            <span>Grid Size : </span>{' '}
            <span>
              {res.gridSize} X {res.gridSize}
            </span>
          </div>
          <div className='flex items-center justify-center gap-4 p-4'>
            <span> Time Taken : </span> <span> {res.time} min</span>
          </div>
          <div className='flex items-center justify-center gap-4 p-4'>
            <span> result : </span> <span> {res.won ? 'Won' : 'Lost'}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default EndPage
