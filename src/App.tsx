import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Eden } from './Pages/Eden/Eden'
import { Cumples } from './Pages/Eden/Cumple/Cumples'
import { Libros } from './Pages/Eden/Libros/Libros'
import { Fotos } from './Pages/Eden/Fotos/Fotos'
import { Login } from './Pages/Eden/Login'
import { Admin } from './Pages/Eden/Admin'
import { Juegos } from './Pages/Juegos/Juegos'
import { NotFound } from './Pages/NotFound/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/juegos" element={<Juegos />} />
      <Route path="/eden" element={<Eden />} />
      <Route path="/eden/juegos" element={<Navigate to="/juegos" replace />} />
      <Route path="/eden/cumples" element={<Cumples />} />
      <Route path="/eden/libros" element={<Libros />} />
      <Route path="/eden/fotos" element={<Fotos />} />
      <Route path="/eden/admin" element={<Login />} />
      <Route path="/eden/admin/panel" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
