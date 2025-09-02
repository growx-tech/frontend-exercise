import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { GameProvider, useGame } from './game/GameContext'
import StartPage from './pages/StartPage'
import GamePage from './pages/GamePage'
import EndPage from './pages/EndPage'

const Guard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { playerName } = useGame()
  if (!playerName) return <Navigate to='/' replace />
  return <>{children}</>
}

const App: React.FC = () => (
  <GameProvider>
    <Routes>
      <Route path='/' element={<StartPage />} />
      <Route
        path='/game'
        element={
          <Guard>
            <GamePage />
          </Guard>
        }
      />
      <Route
        path='/end'
        element={
          <Guard>
            <EndPage />
          </Guard>
        }
      />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  </GameProvider>
)

export default App
