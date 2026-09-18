import { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/useAuth'
import './AdminUI.css'

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
      <div className="admin-page">
        <div className="admin-box">
          <p className="admin-error">No tenés permiso para ver esta página.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-box" style={{ maxWidth: 640 }}>
        <div className="admin-nav">
          <Link to="/eden/admin/panel" className="admin-back">Solicitudes</Link>
          <Link to="/eden/cumples" className="admin-back">Cumpleaños</Link>
          <Link to="/eden/libros" className="admin-back">Libros</Link>
          <Link to="/eden" className="admin-back">El Edén</Link>
        </div>

        <h1 className="admin-title">Solicitudes pendientes</h1>

        {solicitudes.length === 0 && <p style={{ color: 'rgba(255,255,255,0.5)' }}>No hay solicitudes pendientes.</p>}

        {solicitudes.map((s) => (
          <div key={s.id} className="admin-entrada">
            <div className="admin-entrada__info">
              <span className="admin-entrada__nombre">{s.nombre}</span>
              <span className="admin-entrada__desc">
                {s.cumple_dia}/{s.cumple_mes}
                {s.regalo_fav ? ` — ${s.regalo_fav}` : ''}
                {s.solicitante_contacto ? ` · pidió: ${s.solicitante_contacto}` : ''}
              </span>
            </div>

            <input
              className="admin-input"
              style={{ flex: 1, minWidth: 160 }}
              placeholder="nota (opcional)"
              value={notas[s.id] ?? ''}
              onChange={(e) => setNotas((prev) => ({ ...prev, [s.id]: e.target.value }))}
            />

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="admin-boton" disabled={procesando === s.id} onClick={() => aprobar(s)}>
                Aprobar
              </button>
              <button className="admin-boton" disabled={procesando === s.id} onClick={() => rechazar(s)}>
                Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
