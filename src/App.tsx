import { Routes, Route } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Eden } from './Pages/Eden/Eden'
import { ComingSoon } from './Pages/ComingSoon'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/eden" element={<Eden />} />
      <Route path="/eden/juegos" element={<ComingSoon titulo="Juegos" />} />
      <Route path="/eden/cumples" element={<ComingSoon titulo="Cumples" />} />
    </Routes>
  )
}

export default App
