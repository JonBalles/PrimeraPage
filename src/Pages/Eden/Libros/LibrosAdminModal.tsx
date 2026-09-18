import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

interface Libro {
  id: string
  titulo: string
  escritor: string
  genero: string | null
  estado: string
}

interface UsuarioBusqueda {
  id: string
  nombre: string
}

interface LibrosAdminModalProps {
  onClose: () => void
  onCambio: () => void
}

export function LibrosAdminModal({ onClose, onCambio }: LibrosAdminModalProps) {
  const [libros, setLibros] = useState<Libro[]>([])
  const [cargando, setCargando] = useState(true)
  const [busy, setBusy] = useState<string | null>(null)

  const [nuevo, setNuevo] = useState({ titulo: '', escritor: '', genero: '' })
  const [error, setError] = useState<string | null>(null)

  const [prestandoId, setPrestandoId] = useState<string | null>(null)
  const [busquedaUsuario, setBusquedaUsuario] = useState('')
  const [usuarios, setUsuarios] = useState<UsuarioBusqueda[]>([])

  useEffect(() => {
    cargar()
  }, [])

  async function cargar() {
    setCargando(true)
    const { data } = await supabase
      .from('libros')
      .select('id, titulo, escritor, genero, estado')
      .order('titulo', { ascending: true })
    setLibros(data ?? [])
    setCargando(false)
  }

  async function agregarLibro() {
    setError(null)
    if (!nuevo.titulo.trim() || !nuevo.escritor.trim()) {
      setError('Título y escritor son obligatorios.')
      return
    }

    setBusy('nuevo')
    const { error: errInsert } = await supabase.from('libros').insert({
      titulo: nuevo.titulo.trim(),
      escritor: nuevo.escritor.trim(),
      genero: nuevo.genero.trim() || null,
      estado: 'disponible',
      fecha_alta: new Date().toISOString(),
    })
    setBusy(null)

    if (errInsert) {
      setError('No se pudo guardar el libro.')
      return
    }

    setNuevo({ titulo: '', escritor: '', genero: '' })
    await cargar()
    onCambio()
  }

  async function buscarUsuarios(texto: string) {
    setBusquedaUsuario(texto)
    if (texto.trim().length < 2) {
      setUsuarios([])
      return
    }
    const { data } = await supabase
      .from('usuarios')
      .select('id, nombre')
      .ilike('nombre', `%${texto.trim()}%`)
      .limit(8)
    setUsuarios(data ?? [])
  }

  async function prestarA(libro: Libro, usuarioId: string) {
    setBusy(libro.id)
    await supabase.from('prestamos').insert({
      id_usuario: usuarioId,
      id_libro: libro.id,
      estado: true,
      inicio: new Date().toISOString(),
    })
    await supabase.from('libros').update({ estado: 'prestado' }).eq('id', libro.id)
    setBusy(null)
    setPrestandoId(null)
    setBusquedaUsuario('')
    setUsuarios([])
    await cargar()
    onCambio()
  }

  async function marcarDevuelto(libro: Libro) {
    setBusy(libro.id)
    const { data: activo } = await supabase
      .from('prestamos')
      .select('id')
      .eq('id_libro', libro.id)
      .eq('estado', true)
      .is('fin', null)
      .maybeSingle()

    if (activo) {
      await supabase
        .from('prestamos')
        .update({ estado: false, fin: new Date().toISOString() })
        .eq('id', activo.id)
    }

    await supabase.from('libros').update({ estado: 'disponible' }).eq('id', libro.id)
    setBusy(null)
    await cargar()
    onCambio()
  }

  return (
    <div className="libros-backdrop" onClick={onClose}>
      <div className="libros-modal" onClick={(e) => e.stopPropagation()}>
        <div className="libros-modal-header">
          <h3 className="libros-modal-title">Gestión de libros</h3>
          <button className="libros-close" onClick={onClose}>✕</button>
        </div>

        <div className="libros-modal-body">
          <div className="libros-add-card">
            <h6>Agregar libro</h6>
            <div className="libros-add-grid">
              <div className="libros-field">
                <label className="libros-label">Título *</label>
                <input className="libros-input" value={nuevo.titulo} onChange={(e) => setNuevo({ ...nuevo, titulo: e.target.value })} />
              </div>
              <div className="libros-field">
                <label className="libros-label">Escritor *</label>
                <input className="libros-input" value={nuevo.escritor} onChange={(e) => setNuevo({ ...nuevo, escritor: e.target.value })} />
              </div>
              <div className="libros-field" style={{ gridColumn: '1 / -1' }}>
                <label className="libros-label">Género</label>
                <input className="libros-input" value={nuevo.genero} onChange={(e) => setNuevo({ ...nuevo, genero: e.target.value })} />
              </div>
            </div>
            <button className="libros-btn libros-btn--primary" style={{ marginTop: 10 }} disabled={busy === 'nuevo'} onClick={agregarLibro}>
              {busy === 'nuevo' ? 'guardando…' : 'Agregar'}
            </button>
            {error && <p className="libros-error">{error}</p>}
          </div>

          <div className="libros-table-wrap">
            <table className="libros-table">
              <thead>
                <tr><th>Título</th><th>Escritor</th><th>Género</th><th>Estado</th><th></th></tr>
              </thead>
              <tbody>
                {cargando && <tr><td colSpan={5} style={{ textAlign: 'center', padding: 20 }}>cargando…</td></tr>}

                {!cargando && libros.map((l) => (
                  <tr key={l.id}>
                    <td><strong>{l.titulo}</strong></td>
                    <td>{l.escritor}</td>
                    <td>{l.genero || '—'}</td>
                    <td>{l.estado}</td>
                    <td style={{ minWidth: 220 }}>
                      {l.estado === 'disponible' && prestandoId !== l.id && (
                        <button className="libros-btn" onClick={() => setPrestandoId(l.id)}>Prestar</button>
                      )}

                      {l.estado === 'disponible' && prestandoId === l.id && (
                        <div style={{ position: 'relative' }}>
                          <input
                            className="libros-input"
                            placeholder="buscar por nombre…"
                            value={busquedaUsuario}
                            onChange={(e) => buscarUsuarios(e.target.value)}
                            autoFocus
                          />
                          {usuarios.length > 0 && (
                            <div className="libros-suggest">
                              {usuarios.map((u) => (
                                <div key={u.id} onClick={() => prestarA(l, u.id)}>{u.nombre}</div>
                              ))}
                            </div>
                          )}
                          <button
                            className="libros-btn"
                            style={{ marginTop: 4 }}
                            onClick={() => { setPrestandoId(null); setBusquedaUsuario(''); setUsuarios([]) }}
                          >
                            cancelar
                          </button>
                        </div>
                      )}

                      {l.estado === 'prestado' && (
                        <button className="libros-btn libros-btn--primary" disabled={busy === l.id} onClick={() => marcarDevuelto(l)}>
                          Marcar devuelto
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="libros-modal-footer">
          <span style={{ marginRight: 'auto', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{libros.length} libros</span>
          <button className="libros-btn" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}
