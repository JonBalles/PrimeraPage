import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../../../lib/supabaseClient'
import {
  MESES,
  getZodiacSign,
  wspHref,
  WspIcon,
  type UsuarioAdmin,
} from './cumplesUtils'

interface ConfigModalProps {
  onClose: () => void
  onCambio: () => void // avisa al padre que recargue la lista pública
}

type FormAlta = { nombre: string; dia: string; mes: string; wsp: string; regalo_fav: string }
const FORM_VACIO: FormAlta = { nombre: '', dia: '', mes: '', wsp: '', regalo_fav: '' }

export function ConfigModal({ onClose, onCambio }: ConfigModalProps) {
  const [items, setItems] = useState<UsuarioAdmin[]>([])
  const [cargando, setCargando] = useState(true)
  const [busy, setBusy] = useState<string | null>(null)
  const [toast, setToast] = useState<{ tipo: 'success' | 'error' | 'warning'; msg: string } | null>(null)

  const [form, setForm] = useState<FormAlta>(FORM_VACIO)
  const [formError, setFormError] = useState<string | null>(null)

  const [busqueda, setBusqueda] = useState('')
  const [filtroMes, setFiltroMes] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [pagina, setPagina] = useState(1)

  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<FormAlta>(FORM_VACIO)
  const [aEliminar, setAEliminar] = useState<UsuarioAdmin | null>(null)

  useEffect(() => {
    cargar()
  }, [])

  async function cargar() {
    setCargando(true)
    const { data } = await supabase
      .from('usuarios')
      .select('id, nombre, cumple_dia, cumple_mes, regalo_fav, numero_contacto')
      .eq('activo', true)
      .is('baja', null)
    setItems(data ?? [])
    setCargando(false)
  }

  function avisar(tipo: 'success' | 'error' | 'warning', msg: string) {
    setToast({ tipo, msg })
    setTimeout(() => setToast(null), 3500)
  }

  const filtrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim()
    const mes = Number(filtroMes) || 0
    return [...items]
      .filter((p) => {
        const coincideTexto =
          !texto || p.nombre.toLowerCase().includes(texto) || (p.numero_contacto ?? '').includes(texto)
        const coincideMes = !mes || p.cumple_mes === mes
        return coincideTexto && coincideMes
      })
      .sort((a, b) => (a.cumple_mes !== b.cumple_mes ? a.cumple_mes - b.cumple_mes : a.cumple_dia - b.cumple_dia))
  }, [items, busqueda, filtroMes])

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / pageSize))
  const paginaSegura = Math.min(pagina, totalPaginas)
  const inicio = (paginaSegura - 1) * pageSize
  const pageItems = filtrados.slice(inicio, inicio + pageSize)

  function parseFechaForm(dia: string, mes: string): { dia: number; mes: number } | null {
    const d = Number(dia)
    const m = Number(mes)
    if (!d || !m || m < 1 || m > 12 || d < 1 || d > 31) return null
    return { dia: d, mes: m }
  }

  async function agregar() {
    setFormError(null)
    if (!form.nombre.trim()) return setFormError('El nombre es obligatorio.')
    if (!form.wsp.trim()) return setFormError('El WhatsApp es obligatorio.')
    const fecha = parseFechaForm(form.dia, form.mes)
    if (!fecha) return setFormError('Fecha inválida.')

    setBusy('agregar')
    const { error } = await supabase.from('usuarios').insert({
      nombre: form.nombre.trim(),
      cumple_dia: fecha.dia,
      cumple_mes: fecha.mes,
      numero_contacto: form.wsp.trim(),
      regalo_fav: form.regalo_fav.trim() || null,
    })
    setBusy(null)

    if (error) {
      avisar('error', 'No se pudo guardar.')
      return
    }

    setForm(FORM_VACIO)
    await cargar()
    onCambio()
    avisar('success', `¡${form.nombre} sumado/a a la banda! 🎉`)
  }

  function empezarEdicion(p: UsuarioAdmin) {
    setEditandoId(p.id)
    setEditForm({
      nombre: p.nombre,
      dia: String(p.cumple_dia),
      mes: String(p.cumple_mes),
      wsp: p.numero_contacto ?? '',
      regalo_fav: p.regalo_fav ?? '',
    })
  }

  async function guardarEdicion(id: string) {
    const fecha = parseFechaForm(editForm.dia, editForm.mes)
    if (!editForm.nombre.trim() || !fecha) {
      avisar('error', 'Revisá nombre y fecha.')
      return
    }

    setBusy(id)
    const { error } = await supabase
      .from('usuarios')
      .update({
        nombre: editForm.nombre.trim(),
        cumple_dia: fecha.dia,
        cumple_mes: fecha.mes,
        numero_contacto: editForm.wsp.trim() || null,
        regalo_fav: editForm.regalo_fav.trim() || null,
      })
      .eq('id', id)
    setBusy(null)

    if (error) {
      avisar('error', 'No se pudo actualizar.')
      return
    }

    setEditandoId(null)
    await cargar()
    onCambio()
    avisar('success', 'Actualizado correctamente.')
  }

  async function eliminar(p: UsuarioAdmin) {
    setBusy(p.id)
    // Baja lógica: mantenemos el historial en vez de un DELETE físico.
    const { error } = await supabase.from('usuarios').update({ baja: new Date().toISOString() }).eq('id', p.id)
    setBusy(null)
    setAEliminar(null)

    if (error) {
      avisar('error', 'No se pudo eliminar.')
      return
    }

    await cargar()
    onCambio()
    avisar('success', `${p.nombre} fue sacado/a de la banda.`)
  }

  return (
    <div className="cb-backdrop" onClick={onClose}>
      <div className="cb-modal cb-modal--lg" onClick={(e) => e.stopPropagation()}>
        <div className="cb-modal-header">
          <h3 className="cb-modal-title">⚙️ Gestión de cumpleañeros</h3>
          <button className="cb-close" onClick={onClose}>✕</button>
        </div>

        <div className="cb-modal-body">
          <div className="cb-add-card">
            <h6>➕ Agregar a la banda</h6>
            <div className="cb-add-grid">
              <div className="cb-field">
                <label className="cb-label">Nombre *</label>
                <input
                  className="cb-input"
                  placeholder="Ej: Martina"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                />
              </div>
              <div className="cb-field">
                <label className="cb-label">Día *</label>
                <input
                  className="cb-input"
                  type="number"
                  min={1}
                  max={31}
                  value={form.dia}
                  onChange={(e) => setForm({ ...form, dia: e.target.value })}
                />
              </div>
              <div className="cb-field">
                <label className="cb-label">Mes *</label>
                <select className="cb-select" value={form.mes} onChange={(e) => setForm({ ...form, mes: e.target.value })}>
                  <option value="">—</option>
                  {MESES.map((m, i) => (
                    <option key={m} value={i + 1}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="cb-field">
                <label className="cb-label">WhatsApp *</label>
                <input
                  className="cb-input"
                  placeholder="5491112345678"
                  value={form.wsp}
                  onChange={(e) => setForm({ ...form, wsp: e.target.value })}
                />
              </div>
              <div className="cb-field" style={{ gridColumn: '1 / -1' }}>
                <label className="cb-label">Regalo favorito</label>
                <input
                  className="cb-input"
                  placeholder="Fernet con coca 🍾"
                  value={form.regalo_fav}
                  onChange={(e) => setForm({ ...form, regalo_fav: e.target.value })}
                />
              </div>
            </div>
            <button className="cb-btn cb-btn--primary" style={{ marginTop: 10 }} disabled={busy === 'agregar'} onClick={agregar}>
              {busy === 'agregar' ? 'guardando…' : 'Agregar 🎉'}
            </button>
            {formError && <p className="cb-error">{formError}</p>}
          </div>

          <div className="filter-bar">
            <input
              className="cb-input"
              placeholder="🔍 Filtrar por nombre o WhatsApp…"
              value={busqueda}
              onChange={(e) => { setBusqueda(e.target.value); setPagina(1) }}
            />
            <select
              className="cb-select"
              style={{ maxWidth: 160 }}
              value={filtroMes}
              onChange={(e) => { setFiltroMes(e.target.value); setPagina(1) }}
            >
              <option value="">Todos los meses</option>
              {MESES.map((m, i) => (
                <option key={m} value={i + 1}>{m}</option>
              ))}
            </select>
            <select
              className="cb-select"
              style={{ maxWidth: 120 }}
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPagina(1) }}
            >
              <option value={10}>10 por pág.</option>
              <option value={20}>20 por pág.</option>
              <option value={50}>50 por pág.</option>
              <option value={9999}>Todos</option>
            </select>
          </div>

          <div className="config-table-wrap">
            <table className="config-table">
              <thead>
                <tr><th>Nombre</th><th>Fecha</th><th>WhatsApp</th><th>Regalo</th><th></th></tr>
              </thead>
              <tbody>
                {cargando && (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: 20 }}>cargando…</td></tr>
                )}

                {!cargando && pageItems.map((p) => {
                  if (editandoId === p.id) {
                    return (
                      <tr key={p.id}>
                        <td><input className="cb-input" value={editForm.nombre} onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })} /></td>
                        <td style={{ display: 'flex', gap: 4 }}>
                          <input className="cb-input" style={{ width: 56 }} value={editForm.dia} onChange={(e) => setEditForm({ ...editForm, dia: e.target.value })} />
                          <input className="cb-input" style={{ width: 56 }} value={editForm.mes} onChange={(e) => setEditForm({ ...editForm, mes: e.target.value })} />
                        </td>
                        <td><input className="cb-input" value={editForm.wsp} onChange={(e) => setEditForm({ ...editForm, wsp: e.target.value })} /></td>
                        <td><input className="cb-input" value={editForm.regalo_fav} onChange={(e) => setEditForm({ ...editForm, regalo_fav: e.target.value })} /></td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                          <button className="cb-btn cb-btn--icon" disabled={busy === p.id} onClick={() => guardarEdicion(p.id)}>💾</button>{' '}
                          <button className="cb-btn cb-btn--icon" onClick={() => setEditandoId(null)}>✖️</button>
                        </td>
                      </tr>
                    )
                  }

                  const href = wspHref(p.numero_contacto)
                  return (
                    <tr key={p.id}>
                      <td><span className="row-zodiac">{getZodiacSign(p.cumple_dia, p.cumple_mes)}</span><strong>{p.nombre}</strong></td>
                      <td>{p.cumple_dia}/{String(p.cumple_mes).padStart(2, '0')} <small style={{ color: 'var(--text-muted)' }}>{MESES[p.cumple_mes - 1]}</small></td>
                      <td><small>{p.numero_contacto || '—'}</small></td>
                      <td>{p.regalo_fav || <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>
                        {href && <a href={href} target="_blank" rel="noopener noreferrer" className="btn-wsp" title="Mandar mensaje"><WspIcon /></a>}
                        <button className="cb-btn cb-btn--icon" onClick={() => empezarEdicion(p)}>✏️</button>{' '}
                        <button className="cb-btn cb-btn--icon cb-btn--danger" onClick={() => setAEliminar(p)}>🗑️</button>
                      </td>
                    </tr>
                  )
                })}

                {!cargando && pageItems.length === 0 && (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: 20, color: 'var(--text-muted)' }}>Sin resultados.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPaginas > 1 && (
            <div className="pagination-bar">
              <button className="page-btn" disabled={paginaSegura === 1} onClick={() => setPagina(paginaSegura - 1)}>‹</button>
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                <button key={n} className={`page-btn ${n === paginaSegura ? 'active' : ''}`} onClick={() => setPagina(n)}>{n}</button>
              ))}
              <button className="page-btn" disabled={paginaSegura === totalPaginas} onClick={() => setPagina(paginaSegura + 1)}>›</button>
            </div>
          )}
        </div>

        <div className="cb-modal-footer">
          <span className="page-info" style={{ marginRight: 'auto' }}>{filtrados.length} miembros</span>
          <button className="btn-neon" onClick={onClose}>Cerrar 🥃</button>
        </div>

        {aEliminar && (
          <div className="cb-backdrop" style={{ zIndex: 1070 }} onClick={() => setAEliminar(null)}>
            <div className="cb-modal cb-modal--center" onClick={(e) => e.stopPropagation()}>
              <span className="confirm-icon">🗑️</span>
              <div className="confirm-title">¿Sacar de la banda?</div>
              <div className="confirm-msg">¿Seguro que querés sacar a {aEliminar.nombre}? No hay vuelta atrás.</div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button className="cb-btn" onClick={() => setAEliminar(null)}>Cancelar</button>
                <button className="cb-btn cb-btn--danger" disabled={busy === aEliminar.id} onClick={() => eliminar(aEliminar)}>Eliminar</button>
              </div>
            </div>
          </div>
        )}

        {toast && (
          <div className={`cb-toast cb-toast--show cb-toast--${toast.tipo}`}>
            {toast.tipo === 'success' ? '🥃' : toast.tipo === 'error' ? '💀' : '⚠️'} {toast.msg}
          </div>
        )}
      </div>
    </div>
  )
}
