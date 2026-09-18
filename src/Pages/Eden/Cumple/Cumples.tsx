import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../../lib/supabaseClient'
import { useAuth } from '../../../lib/useAuth'
import { EdenHeader } from '../../../Components/EdenTitle/EdenHeader'
import { ConfigModal } from './ConfigModal'
import {
  MESES,
  ZODIAC_MES,
  FRASES_HOY,
  FRASES_PROXIMO,
  HOY_DIA,
  HOY_MES,
  getZodiacSign,
  proximoCumple,
  type CumpleBase,
} from './cumplesUtils'
import './Cumples.css'

export function Cumples() {
  const { esAdmin } = useAuth()

  const [items, setItems] = useState<CumpleBase[]>([])
  const [cargando, setCargando] = useState(true)
  const [mesAbierto, setMesAbierto] = useState<number | null>(null)
  const [configAbierto, setConfigAbierto] = useState(false)

  // Solicitud pública (para quien no es admin)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [form, setForm] = useState({ nombre: '', dia: '', mes: '', regalo_fav: '', contacto: '' })

  useEffect(() => {
    cargarPublico()
  }, [])

  async function cargarPublico() {
    setCargando(true)
    const { data } = await supabase
      .from('cumpleanos_publico')
      .select('id, nombre, cumple_dia, cumple_mes, regalo_fav')
    setItems(data ?? [])
    setCargando(false)
  }

  const fraseHoy = useMemo(() => FRASES_HOY[Math.floor(Math.random() * FRASES_HOY.length)], [items])
  const fraseProximo = useMemo(() => FRASES_PROXIMO[Math.floor(Math.random() * FRASES_PROXIMO.length)], [items])

  const hoyCumplen = items.filter((p) => p.cumple_dia === HOY_DIA && p.cumple_mes === HOY_MES)
  const proximo = proximoCumple(items)

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
    <>
      <EdenHeader />
      <div className="cumples-banda">
      <header className="cb-header">
        <div className="cb-header-row">
          <div>
            <h1><span className="header-emoji">🥃</span> Cumpleaños</h1>
            <div className="header-subtitle">— La banda de los picantes —</div>
          </div>
          <div className="header-alerts">
            {hoyCumplen.length > 0 && (
              <div className="birthday-alert">
                <span className="dot" />
                <span>🎉 {hoyCumplen.map((p) => p.nombre).join(', ')} — {fraseHoy}</span>
              </div>
            )}
            {proximo && (
              <div className="birthday-alert">
                <span>
                  {fraseProximo} {proximo.nombre} — {proximo.cumple_dia} de {MESES[proximo.cumple_mes - 1]}
                  {proximo.dias === 1 ? ' (mañana)' : ` (en ${proximo.dias} días)`}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="months-grid">
        {MESES.map((nombre, i) => {
          const mesNum = i + 1
          const cantidad = items.filter((p) => p.cumple_mes === mesNum).length
          return (
            <button
              key={nombre}
              className={`month-btn mes-${i} ${mesNum === HOY_MES ? 'today-month' : ''}`}
              onClick={() => setMesAbierto(mesNum)}
            >
              <span className="month-zodiac">{ZODIAC_MES[i]}</span>
              <span className="month-label">{nombre}</span>
              {cantidad > 0 && <span className="count-badge">{cantidad}</span>}
            </button>
          )
        })}
      </div>

      {esAdmin && (
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <button className="config-btn" title="Configuración" onClick={() => setConfigAbierto(true)}>⚙️</button>
        </div>
      )}

      {!esAdmin && (
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: '0 20px 40px' }}>
          {!mostrarForm && !enviado && (
            <button className="btn-neon" onClick={() => setMostrarForm(true)}>Pedir agregar un cumpleaños</button>
          )}
          {enviado && <p style={{ color: 'var(--text-muted)' }}>Listo, tu pedido quedó para que un admin lo revise.</p>}

          {mostrarForm && (
            <form onSubmit={enviarSolicitud} style={{ maxWidth: 380, margin: '20px auto', textAlign: 'left' }}>
              <div className="cb-field">
                <label className="cb-label">Nombre</label>
                <input className="cb-input" required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
              </div>
              <div className="cb-field">
                <label className="cb-label">Día</label>
                <input className="cb-input" type="number" min={1} max={31} required value={form.dia} onChange={(e) => setForm({ ...form, dia: e.target.value })} />
              </div>
              <div className="cb-field">
                <label className="cb-label">Mes</label>
                <input className="cb-input" type="number" min={1} max={12} required value={form.mes} onChange={(e) => setForm({ ...form, mes: e.target.value })} />
              </div>
              <div className="cb-field">
                <label className="cb-label">Regalo favorito (opcional)</label>
                <input className="cb-input" value={form.regalo_fav} onChange={(e) => setForm({ ...form, regalo_fav: e.target.value })} />
              </div>
              <div className="cb-field">
                <label className="cb-label">Tu contacto (opcional)</label>
                <input className="cb-input" value={form.contacto} onChange={(e) => setForm({ ...form, contacto: e.target.value })} />
              </div>
              <button className="cb-btn cb-btn--primary" type="submit">Enviar pedido</button>
            </form>
          )}
        </div>
      )}

      {cargando && <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Cargando…</p>}

      <Link to="/eden" className="cb-back">‹ volver a El Edén</Link>

      {mesAbierto !== null && (
        <div className="cb-backdrop" onClick={() => setMesAbierto(null)}>
          <div className="cb-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cb-modal-header">
              <h3 className="cb-modal-title">{ZODIAC_MES[mesAbierto - 1]} {MESES[mesAbierto - 1]}</h3>
              <button className="cb-close" onClick={() => setMesAbierto(null)}>✕</button>
            </div>
            <div className="cb-modal-body">
              {items.filter((p) => p.cumple_mes === mesAbierto).length === 0 && (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px 0' }}>Nadie cumple este mes 🥃</p>
              )}
              {items
                .filter((p) => p.cumple_mes === mesAbierto)
                .sort((a, b) => a.cumple_dia - b.cumple_dia)
                .map((p) => {
                  const esHoy = p.cumple_dia === HOY_DIA && p.cumple_mes === HOY_MES
                  const esProximo = proximo?.id === p.id
                  return (
                    <div key={p.id} className={`birthday-item ${esHoy ? 'is-today' : ''} ${esProximo && !esHoy ? 'is-next' : ''}`}>
                      <div className="birthday-day">{p.cumple_dia}</div>
                      <div style={{ flex: 1 }}>
                        <div className="birthday-name">
                          <span className="row-zodiac">{getZodiacSign(p.cumple_dia, p.cumple_mes)}</span>
                          {p.nombre} {esHoy ? '🎉' : ''}{esProximo && !esHoy ? '⏳' : ''}
                        </div>
                        <div className="birthday-sub">{p.regalo_fav ? `🎁 ${p.regalo_fav}` : ''}</div>
                      </div>
                    </div>
                  )
                })}
            </div>
            <div className="cb-modal-footer">
              <button className="btn-neon" onClick={() => setMesAbierto(null)}>Cerrar 🥃</button>
            </div>
          </div>
        </div>
      )}

      {configAbierto && esAdmin && (
        <ConfigModal onClose={() => setConfigAbierto(false)} onCambio={cargarPublico} />
      )}
      </div>
    </>
  )
}
