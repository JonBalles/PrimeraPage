import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'

interface EstadoAuth {
  session: Session | null
  esAdmin: boolean
  usuarioId: string | null
  cargando: boolean
}

export function useAuth(): EstadoAuth {
  const [session, setSession] = useState<Session | null>(null)
  const [esAdmin, setEsAdmin] = useState(false)
  const [usuarioId, setUsuarioId] = useState<string | null>(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nuevaSession) => {
      setSession(nuevaSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session) {
      setEsAdmin(false)
      setUsuarioId(null)
      setCargando(false)
      return
    }

    setCargando(true)

    supabase
      .from('usuarios')
      .select('id, admin')
      .eq('id_auth', session.user.id)
      .maybeSingle()
      .then(({ data }) => {
        setEsAdmin(Boolean(data?.admin))
        setUsuarioId(data?.id ?? null)
        setCargando(false)
      })
  }, [session])

  return { session, esAdmin, usuarioId, cargando }
}
