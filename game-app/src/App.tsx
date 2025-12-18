import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { GameProvider } from './context/GameProvider'
import { PlayersProvider } from './context/PlayersProvider'
import GameRoom from './pages/GameRoom'
import Lobby from './pages/Lobby'
import Results from './pages/Results'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <PlayersProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/lobby" replace />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/game" element={<GameRoom />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </PlayersProvider>
      </GameProvider>
    </BrowserRouter>
  )
}

export default App