import EdenTitle from '../../Components/EdenTitle/EdenTitle'
import EdenLink from '../../Components/EdenTitle/EdenLink'
import './Eden.css'

const GRUPO_URL = 'https://chat.whatsapp.com/FheFi72VfmfL9i11Ig1ea8'

export default function Eden() {
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
          <EdenLink to="/eden/juegos" icon="🎮">Juegos</EdenLink>
          <EdenLink to="/eden/cumples" icon="🎂">Cumpleaños</EdenLink>
          <EdenLink to="/eden/libros" icon="📚">Préstamo de libros</EdenLink>
          <EdenLink to={GRUPO_URL} icon="💬">Grupo de WhatsApp</EdenLink>
        </div>
      </section>

      <footer className="eden-footer">Jardín del Edén</footer>
    </main>
  )
}
