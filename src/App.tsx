import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StartPage from './components/StartPage'
import GamePage from './components/GamePage'
import EndPage from './components/EndPage'
import { GameProvider } from './context/GameContext'
import './App.css'

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/end" element={<EndPage />} />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  )
}

export default App
