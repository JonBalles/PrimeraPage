import { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/useAuth'
import './Eden.css'
import './EdenForms.css'

interface Solicitud {
  id: string
  nombre: string
  cumple_dia: number
  cumple_mes: number
  regalo_fav: string | null
  solicitante_contacto: string | null
}

export function Admin() {
  const { session, esAdmin, usuarioId, cargando } = useAuth()
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [notas, setNotas] = useState<Record<string, string>>({})
  const [procesando, setProcesando] = useState<string | null>(null)

  useEffect(() => {
    if (esAdmin) cargarSolicitudes()
  }, [esAdmin])

  async function cargarSolicitudes() {
    const { data } = await supabase
      .from('solicitudes_cumpleanos')
      .select('id, nombre, cumple_dia, cumple_mes, regalo_fav, solicitante_contacto')
      .eq('estado', 'pendiente')
      .order('created', { ascending: true })

    setSolicitudes(data ?? [])
  }

  async function aprobar(s: Solicitud) {
    setProcesando(s.id)

    const { data: nuevoUsuario, error: errorInsert } = await supabase
      .from('usuarios')
      .insert({
        nombre: s.nombre,
        cumple_dia: s.cumple_dia,
        cumple_mes: s.cumple_mes,
        regalo_fav: s.regalo_fav,
      })
      .select('id')
      .single()

    if (!errorInsert && nuevoUsuario) {
      await supabase
        .from('solicitudes_cumpleanos')
        .update({ estado: 'aprobada', id_usuario_creado: nuevoUsuario.id, revisado_por: usuarioId })
        .eq('id', s.id)
    }

    setProcesando(null)
    cargarSolicitudes()
  }

  async function rechazar(s: Solicitud) {
    setProcesando(s.id)

    await supabase
      .from('solicitudes_cumpleanos')
      .update({ estado: 'rechazada', nota_admin: notas[s.id] ?? null, revisado_por: usuarioId })
      .eq('id', s.id)

    setProcesando(null)
    cargarSolicitudes()
  }

  if (cargando) return null
  if (!session) return <Navigate to="/eden/admin" replace />

  if (!esAdmin) {
    return (
      <div className="eden-page">
        <div className="eden-terminal">
          <p className="eden-prompt">permission denied</p>
        </div>
      </div>
    )
  }

  return (
    <div className="eden-page">
      <div className="eden-terminal">
        <p className="eden-prompt">
          <span className="eden-prompt__user">jon@eden</span>
          <span className="eden-prompt__sep">:~/admin$</span> cat solicitudes_pendientes
        </p>

        {solicitudes.length === 0 && <p className="eden-intro">No hay solicitudes pendientes.</p>}

        <ul className="eden-listado">
          {solicitudes.map((s) => (
            <li key={s.id} className="eden-entrada eden-entrada--admin">
              <div className="eden-entrada__info">
                <span className="eden-entrada__ruta">{s.nombre}</span>
                <span className="eden-entrada__desc">
                  {s.cumple_dia}/{s.cumple_mes}
                  {s.regalo_fav ? ` — ${s.regalo_fav}` : ''}
                  {s.solicitante_contacto ? ` · pidió: ${s.solicitante_contacto}` : ''}
                </span>
              </div>

              <input
                className="eden-input eden-input--nota"
                placeholder="nota (opcional)"
                value={notas[s.id] ?? ''}
                onChange={(e) => setNotas((prev) => ({ ...prev, [s.id]: e.target.value }))}
              />

              <div className="eden-acciones">
                <button className="eden-boton" disabled={procesando === s.id} onClick={() => aprobar(s)}>
                  aprobar
                </button>
                <button
                  className="eden-boton eden-boton--rechazar"
                  disabled={procesando === s.id}
                  onClick={() => rechazar(s)}
                >
                  rechazar
                </button>
              </div>
            </li>
          ))}
        </ul>

        <Link to="/eden" className="eden-back">cd ..</Link>
      </div>
    </div>
  )
}
