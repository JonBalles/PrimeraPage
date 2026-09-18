import { Routes, Route } from 'react-router-dom'
import { Home } from './Pages/Home'
import Eden from './Pages/Eden/Eden'
import { Cumples } from './Pages/Eden/Pages/Cumple/Cumples'
import { Login } from './Pages/Eden/Login'
import { Admin } from './Pages/Eden/Admin'
import Games from './Pages/Eden/Games'
import { Libros } from './Pages/Eden/Pages/Libros/Libros'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/eden" element={<Eden />} />
      <Route path="/eden/libros" element={<Libros />} />
      <Route path="/eden/juegos" element={<Games />} />
      <Route path="/eden/cumples" element={<Cumples />} />
      <Route path="/eden/admin" element={<Login />} />
      <Route path="/eden/admin/panel" element={<Admin />} />
    </Routes>
  )
}

export default App
