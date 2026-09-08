import { Link } from 'react-router-dom'
import './Eden.css'

const GRUPO_URL = 'https://chat.whatsapp.com/FheFi72VfmfL9i11Ig1ea8'

const entradas = [
  {
    ruta: 'juegos/',
    to: '/eden/juegos',
    externo: false,
    descripcion: 'ahorcado y cadáver exquisito, en vivo con la comunidad',
  },
  {
    ruta: 'cumples/',
    to: '/eden/cumples',
    externo: false,
    descripcion: 'calendario de cumpleaños de El Edén',
  },
  {
    ruta: 'grupo',
    to: GRUPO_URL,
    externo: true,
    descripcion: 'sumate a la charla',
  },
]

export function Eden() {
  return (
    <div className="eden-page">
      <div className="eden-terminal">
        <p className="eden-prompt">
          <span className="eden-prompt__user">jon@eden</span>
          <span className="eden-prompt__sep">:~$</span> cat bienvenida.txt
        </p>
        <p className="eden-intro">
          El Edén es la comunidad que arma todo esto: partidas de ahorcado y cadáver
          exquisito entre amigos, un calendario de cumpleaños que nadie se olvida más,
          y un grupo donde pasa la charla real.
        </p>

        <p className="eden-prompt eden-prompt--ls">
          <span className="eden-prompt__user">jon@eden</span>
          <span className="eden-prompt__sep">:~$</span> ls -la
        </p>

        <ul className="eden-listado">
          {entradas.map((e) => (
            <li key={e.ruta} className="eden-entrada">
              {e.externo ? (
                <a
                  href={e.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eden-entrada__link"
                >
                  <span className="eden-entrada__ruta">{e.ruta}</span>
                  <span className="eden-entrada__desc">{e.descripcion}</span>
                </a>
              ) : (
                <Link to={e.to} className="eden-entrada__link">
                  <span className="eden-entrada__ruta">{e.ruta}</span>
                  <span className="eden-entrada__desc">{e.descripcion}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        <p className="eden-prompt eden-prompt--final">
          <span className="eden-prompt__user">jon@eden</span>
          <span className="eden-prompt__sep">:~$</span>
          <span className="eden-cursor" aria-hidden="true" />
        </p>

        <Link to="/" className="eden-back">cd ..</Link>
      </div>
    </div>
  )
}
