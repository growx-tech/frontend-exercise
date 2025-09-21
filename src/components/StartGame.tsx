import { Button, FormControlLabel, Stack, Switch, TextField } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'
import { setUser } from '../store/userSlice'
import { setEnableMove, setGridSize, setPages } from '../store/gameSlice'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { Pages } from '../common/models'

const StartGame = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.user)
  const gameStat = useSelector((state: RootState) => state.game)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch (e.target.id) {
      case 'name':
        dispatch(
          setUser({
            name: e.target.value,
            email: user.email
          })
        )
        break
      case 'email':
        dispatch(
          setUser({
            name: user.name,
            email: e.target.value
          })
        )
        break
      default:
        break
    }
  }

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value)
    if (size >= 2 && size <= 10) dispatch(setGridSize(size))
  }

  return (
    <div>
      <Navbar />
      <Stack
        direction='column'
        spacing={6}
        sx={{
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}>
        <TextField required id='name' label='FullName' value={user.name} variant='filled' className='mt-4' onChange={(e) => handleChange(e)} />

        <TextField required id='email' label='Email' value={user.email} variant='filled' onChange={(e) => handleChange(e)} />

        <TextField required id='standard-basic' label='Grid Size' variant='standard' type='number' minRows={2} maxRows={10} value={gameStat.gridSize} onChange={handleSizeChange} />

        <FormControlLabel control={<Switch checked={gameStat.enableMove} onChange={() => dispatch(setEnableMove(!gameStat.enableMove))} />} label='Limited Moves' />

        <Button
          className='rounded border-2 border-gray-300 px-2 py-1'
          disabled={user.name === '' || user.email === ''}
          onClick={() => dispatch(setPages(Pages.PlayGame))}>
          Let's play
        </Button>
      </Stack>
    </div>
  )
}

export default StartGame
