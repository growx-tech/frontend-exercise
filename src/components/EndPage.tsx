import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'

const EndPage = () => {
  const username = useSelector((state: RootState) => state.user.name)
  return (
    <div className='flex items-center justify-center'>
      Thanks for playing, {username}
    </div>
  )
}

export default EndPage