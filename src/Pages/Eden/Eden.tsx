import { Link } from 'react-router-dom'
import EdenTitle from '../../Components/EdenTitle/EdenTitle'
import EdenLink from '../../Components/EdenTitle/EdenLink'
import { useAuth } from '../../lib/useAuth'
import './Eden.css'

const GRUPO_URL = 'https://chat.whatsapp.com/FheFi72VfmfL9i11Ig1ea8'

export function Eden() {
  const { esAdmin } = useAuth()

  return (
    <main className="home">
      <div className="ambient-light light-one" />
      <div className="ambient-light light-two" />

      <section className="eden-container">
        <EdenTitle />

        <p className="eden-description">
          Juegos, encuentros y momentos compartidos.
        </p>

        <div className="eden-menu">
          <EdenLink to="/juegos" icon="🎮">Juegos</EdenLink>
          <EdenLink to="/eden/cumples" icon="🎂">Cumpleaños</EdenLink>
          <EdenLink to="/eden/libros" icon="📚">Préstamo de libros</EdenLink>
          <EdenLink to={GRUPO_URL} icon="🌿✨"> Nuestro Jardín del Edén</EdenLink>
        </div>

        <Link to={esAdmin ? '/eden/admin/panel' : '/eden/admin'} className="eden-admin-link">
          {esAdmin ? 'Panel de admin' : 'Admin'}
        </Link>
      </section>

      <footer className="eden-footer">Jardín del Edén</footer>
    </main>
  )
}
