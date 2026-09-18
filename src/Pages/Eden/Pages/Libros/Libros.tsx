import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../../../lib/supabaseClient'
import { useAuth } from '../../../../lib/useAuth'
import { EdenHeader } from '../../../../Components/EdenTitle/EdenHeader'
import { LibrosAdminModal } from './LibrosAdminModal'
import './Libros.css'

interface LibroPublico {
  id: string
  titulo: string
  escritor: string
  genero: string | null
  estado: string
}

export function Libros() {
  const { esAdmin } = useAuth()
  const [libros, setLibros] = useState<LibroPublico[]>([])
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [adminAbierto, setAdminAbierto] = useState(false)

  useEffect(() => {
    cargar()
  }, [])

  async function cargar() {
    setCargando(true)
    const { data } = await supabase
      .from('libros_publico')
      .select('id, titulo, escritor, genero, estado')
      .order('titulo', { ascending: true })
    setLibros(data ?? [])
    setCargando(false)
  }

  const filtrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim()
    if (!texto) return libros
    return libros.filter(
      (l) => l.titulo.toLowerCase().includes(texto) || l.escritor.toLowerCase().includes(texto),
    )
  }, [libros, busqueda])

  return (
    <>
      <EdenHeader />
      <div className="libros-page">
        <div className="libros-container">
          <div className="libros-header">
            <h1>Préstamo de libros</h1>
            <p>La biblioteca de la comunidad</p>
          </div>

          <input
            className="libros-search"
            placeholder="Buscar por título o autor…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          {cargando && <p className="libros-vacio">Cargando…</p>}
          {!cargando && filtrados.length === 0 && <p className="libros-vacio">No hay libros para mostrar.</p>}

          <div className="libros-lista">
            {filtrados.map((l) => (
              <div key={l.id} className="libro-item">
                <div className="libro-item__info">
                  <span className="libro-item__titulo">{l.titulo}</span>
                  <span className="libro-item__meta">{l.escritor}{l.genero ? ` · ${l.genero}` : ''}</span>
                </div>
                <span className={`libro-badge ${l.estado === 'disponible' ? 'libro-badge--disponible' : 'libro-badge--prestado'}`}>
                  {l.estado === 'disponible' ? 'Disponible' : 'Prestado'}
                </span>
              </div>
            ))}
          </div>

          {esAdmin && (
            <button className="libros-gear" title="Gestionar" onClick={() => setAdminAbierto(true)}>⚙️</button>
          )}

          <div style={{ textAlign: 'center' }}>
            <Link to="/eden" className="libros-back">‹ volver a El Edén</Link>
          </div>
        </div>
      </div>

      {adminAbierto && esAdmin && (
        <LibrosAdminModal onClose={() => setAdminAbierto(false)} onCambio={cargar} />
      )}
    </>
  )
}
