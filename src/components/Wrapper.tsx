import { Pages } from '../common/models'
import { lazy, Suspense } from 'react'
import Start from './StartGame'
import EndPage from './EndPage'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'

const PlayGame = lazy(() => import('./PlayGame'))

const Wrapper = () => {
  const page = useSelector((state: RootState) => state.game.page)

  const getPages = (page: Pages) => {
    switch (page) {
      case Pages.StartGame:
        return <Start />
      case Pages.PlayGame:
        return (
          <Suspense fallback={<div>Loading.....</div>}>
            <PlayGame />
          </Suspense>
        )
      case Pages.EndGame:
        return <EndPage />
    }
  }
  return <div>{getPages(page)}</div>
}

export default Wrapper
