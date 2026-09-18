import { Link } from 'react-router-dom'
import './NotFound.css'

export function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-box">
        <p className="notfound-code">404</p>
        <h1>Esta página no existe</h1>
        <p className="notfound-text">Revisá la dirección o volvé a un lugar conocido.</p>
        <div className="notfound-links">
          <Link to="/" className="notfound-link">Volver al inicio</Link>
          <Link to="/eden" className="notfound-link">Ir a El Edén</Link>
        </div>
      </div>
    </div>
  )
}
