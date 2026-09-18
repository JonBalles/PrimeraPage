interface EdenTitleProps {
  subtitulo?: string
}

export default function EdenTitle({ subtitulo = 'Comunidad' }: EdenTitleProps) {
  return (
    <div className="eden-title-wrapper">
      <h1 className="eden-title">El Edén</h1>
      <p className="eden-subtitle">{subtitulo}</p>
    </div>
  )
}
