import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface EdenLinkProps {
  to: string
  icon?: string
  children: ReactNode
}

export default function EdenLink({ to, icon, children }: EdenLinkProps) {
  const esExterno = /^https?:\/\//.test(to)

  const contenido = (
    <>
      {icon && <span className="eden-link-icon">{icon}</span>}
      {children}
    </>
  )

  if (esExterno) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className="eden-link">
        {contenido}
      </a>
    )
  }

  return (
    <Link to={to} className="eden-link">
      {contenido}
    </Link>
  )
}
