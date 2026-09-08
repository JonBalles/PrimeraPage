import { Link } from 'react-router-dom'
import './Eden/Eden.css'

interface ComingSoonProps {
  titulo: string
}

export function ComingSoon({ titulo }: ComingSoonProps) {
  return (
    <div className="eden-page">
      <div className="eden-terminal">
        <p className="eden-prompt">
          <span className="eden-prompt__user">jon@eden</span>
          <span className="eden-prompt__sep">:~/{titulo.toLowerCase()}$</span> ls
        </p>
        <p className="eden-intro">Todavía no hay nada acá. Volviendo pronto.</p>
        <Link to="/eden" className="eden-back">cd ..</Link>
      </div>
    </div>
  )
}
