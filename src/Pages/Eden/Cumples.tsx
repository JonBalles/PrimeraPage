import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import './Eden.css'
import './EdenForms.css'

interface CumplePublico {
  id: string
  nombre: string
  cumple_dia: number
  cumple_mes: number
  regalo_fav: string | null
}

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

export function Cumples() {
  const [cumples, setCumples] = useState<CumplePublico[]>([])
  const [mostrarForm, setMostrarForm] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [form, setForm] = useState({ nombre: '', dia: '', mes: '', regalo_fav: '', contacto: '' })

  useEffect(() => {
    supabase
      .from('cumpleanos_publico')
      .select('id, nombre, cumple_dia, cumple_mes, regalo_fav')
      .order('cumple_mes', { ascending: true })
      .order('cumple_dia', { ascending: true })
      .then(({ data }) => setCumples(data ?? []))
  }, [])

  async function enviarSolicitud(e: FormEvent) {
    e.preventDefault()

    await supabase.from('solicitudes_cumpleanos').insert({
      nombre: form.nombre,
      cumple_dia: Number(form.dia),
      cumple_mes: Number(form.mes),
      regalo_fav: form.regalo_fav || null,
      solicitante_contacto: form.contacto || null,
    })

    setEnviado(true)
    setMostrarForm(false)
  }

  return (
    <div className="eden-page">
      <div className="eden-terminal">
        <p className="eden-prompt">
          <span className="eden-prompt__user">jon@eden</span>
          <span className="eden-prompt__sep">:~/cumples$</span> cat calendario
        </p>

        <ul className="eden-listado">
          {cumples.map((c) => (
            <li key={c.id} className="eden-entrada">
              <div className="eden-entrada__link" style={{ cursor: 'default' }}>
                <span className="eden-entrada__ruta">
                  {String(c.cumple_dia).padStart(2, '0')} {MESES[c.cumple_mes - 1]}
                </span>
                <span className="eden-entrada__desc">
                  {c.nombre}
                  {c.regalo_fav ? ` — le gusta: ${c.regalo_fav}` : ''}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {!mostrarForm && !enviado && (
          <button className="eden-boton" onClick={() => setMostrarForm(true)}>
            pedir agregar un cumpleaños
          </button>
        )}

        {enviado && <p className="eden-intro">Listo, tu pedido quedó para que un admin lo revise.</p>}

        {mostrarForm && (
          <form className="eden-form" onSubmit={enviarSolicitud}>
            <label className="eden-campo">
              <span>nombre</span>
              <input
                required
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </label>
            <label className="eden-campo">
              <span>día</span>
              <input
                type="number"
                min={1}
                max={31}
                required
                value={form.dia}
                onChange={(e) => setForm({ ...form, dia: e.target.value })}
              />
            </label>
            <label className="eden-campo">
              <span>mes</span>
              <input
                type="number"
                min={1}
                max={12}
                required
                value={form.mes}
                onChange={(e) => setForm({ ...form, mes: e.target.value })}
              />
            </label>
            <label className="eden-campo">
              <span>regalo favorito (opcional)</span>
              <input
                value={form.regalo_fav}
                onChange={(e) => setForm({ ...form, regalo_fav: e.target.value })}
              />
            </label>
            <label className="eden-campo">
              <span>tu contacto (opcional, para avisarte)</span>
              <input
                value={form.contacto}
                onChange={(e) => setForm({ ...form, contacto: e.target.value })}
              />
            </label>
            <button className="eden-boton" type="submit">enviar pedido</button>
          </form>
        )}

        <Link to="/eden" className="eden-back">cd ..</Link>
      </div>
    </div>
  )
}
