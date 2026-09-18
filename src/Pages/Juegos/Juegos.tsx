import { Link } from 'react-router-dom'
import './Juegos.css'

const PROYECTOS = [
  {
    nombre: 'Ahorcado Multijugador',
    descripcion:
      'Salas en tiempo real, roles de admin, modos Clásico y Eliminatoria, reconexión automática. Migrando de Google Apps Script a Supabase.',
    estado: 'En migración',
  },
  {
    nombre: 'Cadáver Exquisito',
    descripcion:
      'Historia colaborativa por turnos entre varios jugadores, con modo de rotación global. Migrando de Google Apps Script a Supabase.',
    estado: 'En migración',
  },
]

export function Juegos() {
  return (
    <div className="juegos-page">
      <div className="juegos-container">
        <h1 className="juegos-title">Juegos</h1>
        <p className="juegos-subtitle">Proyectos propios, jugables en el navegador</p>

        <div className="juegos-lista">
          {PROYECTOS.map((p) => (
            <div key={p.nombre} className="juego-card">
              <div className="juego-card__header">
                <h2>{p.nombre}</h2>
                <span className="juego-estado">{p.estado}</span>
              </div>
              <p>{p.descripcion}</p>
            </div>
          ))}
        </div>

        <Link to="/" className="juegos-back">‹ volver al inicio</Link>
      </div>
    </div>
  )
}
