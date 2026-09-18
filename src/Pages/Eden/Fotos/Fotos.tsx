import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../../lib/supabaseClient'
import { useAuth } from '../../../lib/useAuth'
import { EdenHeader } from '../../../Components/EdenTitle/EdenHeader'
import './Fotos.css'

const WORKER_URL = 'https://eden-fotos-worker.jonatan-a-ballestero.workers.dev'

interface Foto {
  id: string
  url: string
  descripcion: string | null
  created: string
}

export function Fotos() {
  const { esAdmin } = useAuth()
  const [fotos, setFotos] = useState<Foto[]>([])
  const [cargando, setCargando] = useState(true)
  const [subiendo, setSubiendo] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    cargar()
  }, [])

  async function cargar() {
    setCargando(true)
    const { data } = await supabase
      .from('fotos')
      .select('id, url, descripcion, created')
      .order('created', { ascending: false })
    setFotos(data ?? [])
    setCargando(false)
  }

  async function subirArchivo(archivo: File) {
    setError(null)
    setSubiendo(true)

    const { data: sesion } = await supabase.auth.getSession()
    const token = sesion.session?.access_token

    if (!token) {
      setError('Tu sesión expiró, volvé a loguearte.')
      setSubiendo(false)
      return
    }

    try {
      const resp = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': archivo.type,
          'X-Filename': archivo.name,
        },
        body: archivo,
      })

      if (!resp.ok) {
        const motivo = await resp.text()
        setError(`No se pudo subir la foto (${resp.status}): ${motivo}`)
        setSubiendo(false)
        return
      }

      const { key, url } = (await resp.json()) as { key: string; url: string }

      await supabase.from('fotos').insert({ storage_key: key, url })
      await cargar()
    } catch {
      setError('No se pudo subir la foto.')
    }

    setSubiendo(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  async function borrar(foto: Foto) {
    await supabase.from('fotos').delete().eq('id', foto.id)
    await cargar()
    // Nota: esto borra el registro en Supabase; el archivo queda en R2
    // (limpieza manual por ahora, no crítico para el MVP).
  }

  return (
    <>
      <EdenHeader />
      <div className="fotos-page">
        <div className="fotos-container">
          <div className="fotos-header">
            <h1>Fotos</h1>
            <p>Momentos de la comunidad</p>
          </div>

          {esAdmin && (
            <div className="fotos-upload">
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) => e.target.files?.[0] && subirArchivo(e.target.files[0])}
                disabled={subiendo}
              />
              {subiendo && <span className="fotos-subiendo">subiendo…</span>}
              {error && <p className="fotos-error">{error}</p>}
            </div>
          )}

          {cargando && <p className="fotos-vacio">Cargando…</p>}
          {!cargando && fotos.length === 0 && <p className="fotos-vacio">Todavía no hay fotos.</p>}

          <div className="fotos-grid">
            {fotos.map((f) => (
              <div key={f.id} className="foto-item">
                <img src={f.url} alt={f.descripcion ?? 'Foto de El Edén'} loading="lazy" />
                {esAdmin && (
                  <button className="foto-item__borrar" onClick={() => borrar(f)} title="Eliminar">✕</button>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/eden" className="fotos-back">‹ volver a El Edén</Link>
          </div>
        </div>
      </div>
    </>
  )
}
