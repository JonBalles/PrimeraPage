import { useNavigate, useLocation } from 'react-router-dom'
import './EdenHeader.css'

const OPCIONES = [
  { valor: '/eden', etiqueta: '🏠 El Edén' },
  { valor: '/eden/juegos', etiqueta: '🎮 Juegos' },
  { valor: '/eden/cumples', etiqueta: '🎂 Cumpleaños' },
  { valor: '/eden/libros', etiqueta: '📚 Libros' },
]

export function EdenHeader() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <header className="eden-subheader">
      <span className="eden-subheader__title">El Edén</span>
      <select
        className="eden-subheader__select"
        value={location.pathname}
        onChange={(e) => navigate(e.target.value)}
      >
        {OPCIONES.map((o) => (
          <option key={o.valor} value={o.valor}>{o.etiqueta}</option>
        ))}
      </select>
    </header>
  )
}
