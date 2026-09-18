import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../lib/useAuth'
import { supabase } from '../../lib/supabaseClient'
import './EdenHeader.css'

const OPCIONES = [
  { valor: '/eden', etiqueta: '🏠 El Edén' },
  { valor: '/eden/cumples', etiqueta: '🎂 Cumpleaños' },
  { valor: '/eden/libros', etiqueta: '📚 Libros' },
  { valor: '/eden/fotos', etiqueta: '📷 Fotos' },
]

export function EdenHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const { session, esAdmin } = useAuth()

  async function cerrarSesion() {
    await supabase.auth.signOut()
    navigate('/eden')
  }

  return (
    <header className="eden-subheader">
      <span className="eden-subheader__title">El Edén</span>

      <div className="eden-subheader__right">
        <select
          className="eden-subheader__select"
          value={location.pathname}
          onChange={(e) => navigate(e.target.value)}
        >
          {OPCIONES.map((o) => (
            <option key={o.valor} value={o.valor}>{o.etiqueta}</option>
          ))}
        </select>

        {esAdmin ? (
          <button className="eden-subheader__auth" onClick={cerrarSesion}>Salir</button>
        ) : session ? null : (
          <button className="eden-subheader__auth" onClick={() => navigate('/eden/admin')}>Admin</button>
        )}
      </div>
    </header>
  )
}
