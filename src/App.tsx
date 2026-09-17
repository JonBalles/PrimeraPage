import { Routes, Route } from 'react-router-dom'
import { Home } from './Pages/Home'
import Eden from './Pages/Eden/NewPage'
import { Cumples } from './Pages/Eden/Cumples'
import { Login } from './Pages/Eden/Login'
import { Admin } from './Pages/Eden/Admin'
import Games from './Pages/Eden/Games'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/eden" element={<Eden />} />
      <Route path="/eden/juegos" element={<Games />} />
      <Route path="/eden/cumples" element={<Cumples />} />
      <Route path="/eden/admin" element={<Login />} />
      <Route path="/eden/admin/panel" element={<Admin />} />
    </Routes>
  )
}

export default App
