import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import './AdminUI.css'

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
    <div className="admin-page">
      <div className="admin-box">
        <h1 className="admin-title">Ingreso de administradores</h1>

        <form className="admin-form" onSubmit={manejarSubmit}>
          <label className="admin-field">
            <span>Email</span>
            <input
              className="admin-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="admin-field">
            <span>Contraseña</span>
            <input
              className="admin-input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <p className="admin-error">{error}</p>}

          <button className="admin-boton" type="submit" disabled={enviando}>
            {enviando ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
