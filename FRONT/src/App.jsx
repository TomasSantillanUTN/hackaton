import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

// importar páginas
import Home from './pages/Home';

function AppContent() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <AppContent />
    </Router>

  )
}

export default App
