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
          <strong>Nacidos un 25 de mayo de 2026</strong>, después de una buena joda. <br />
          Conectamos, nos reímos, nos seguimos juntando, nos quisimos y brillamos ✨<br />
            <strong>Diversión, buenos momentos, buenos amigos.</strong><br />
              Eso es <strong>El Edén</strong>.
        </p>

            <div className="eden-menu">
              <EdenLink to="/juegos" icon="🎮">Juegos</EdenLink>
              <EdenLink to="/eden/cumples" icon="🎂">Cumpleaños</EdenLink>
              <EdenLink to="/eden/libros" icon="📚">Préstamo de libros</EdenLink>
              <EdenLink to="/eden/fotos" icon="📷">Fotos</EdenLink>
              <EdenLink to={GRUPO_URL} icon="✨">Nuestro grupo 💬</EdenLink>
            </div>

            <Link to={esAdmin ? '/eden/admin/panel' : '/eden/admin'} className="eden-admin-link">
              {esAdmin ? 'Panel de admin' : 'Admin'}
            </Link>
          </section>

            <footer className="eden-footer">
              <Link to="/" className="eden-footer__by">By: Jon</Link>
            </footer>
          </main>
          )
}
