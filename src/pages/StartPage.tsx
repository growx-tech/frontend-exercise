import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../game/GameContext'

const StartPage: React.FC = () => {
  const { startGame } = useGame()
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [size, setSize] = useState('4x4')
  const sizes = ['2x2', '4x4', '4x5', '6x6']

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    const [r, c] = size.split('x').map(Number)
    startGame(name.trim(), { rows: r, cols: c })
    nav('/game')
  }

  return (
    <div className='page start'>
      <h1>Memory Game</h1>
      <form onSubmit={submit}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Board
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            {sizes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <button type='submit'>Start</button>
      </form>
    </div>
  )
}

export default StartPage
