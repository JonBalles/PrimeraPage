import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import './Eden.css'
import './EdenForms.css'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  async function manejarSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setEnviando(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setEnviando(false)

    if (error) {
      setError('Usuario o contraseña incorrectos.')
      return
    }

    navigate('/eden/admin/panel')
  }

  return (
    <div className="eden-page">
      <div className="eden-terminal">
        <p className="eden-prompt">
          <span className="eden-prompt__user">jon@eden</span>
          <span className="eden-prompt__sep">:~/admin$</span> login
        </p>

        <form className="eden-form" onSubmit={manejarSubmit}>
          <label className="eden-campo">
            <span>email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="eden-campo">
            <span>contraseña</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <p className="eden-error">{error}</p>}

          <button className="eden-boton" type="submit" disabled={enviando}>
            {enviando ? 'entrando...' : 'entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
