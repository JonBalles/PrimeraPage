export const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

export const ZODIAC_MES = ['♑♒', '♒♓', '♓♈', '♈♉', '♉♊', '♊♋', '♋♌', '♌♍', '♍♎', '♎♏', '♏♐', '♐♑']

export const FRASES_HOY = [
  '¡Hoy alguien cumple y está para el festejo! 🍾',
  '¡Feliz cumple! Que el próximo resacón sea épico 🥃',
  '¡Cumple hoy! La ronda corre por su cuenta 🎲',
  'Hoy es el día del rey/reina del grupo 👑',
  '¡Feliz cumple! Ya sos un año más sabio (o lo mismo, pero con estilo) 🎰',
]

export const FRASES_PROXIMO = [
  'El próximo en sufrir los festejos:',
  'Se viene el próximo festejo de la banda:',
  'Preparate para el próximo brindis:',
  'La próxima víctima del festejazo:',
]

export interface CumpleBase {
  id: string
  nombre: string
  cumple_dia: number
  cumple_mes: number
  regalo_fav: string | null
}

export interface UsuarioAdmin extends CumpleBase {
  numero_contacto: string | null
}

export function getZodiacSign(dia: number, mes: number): string {
  if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) return '♒'
  if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) return '♓'
  if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) return '♈'
  if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) return '♉'
  if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) return '♊'
  if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) return '♋'
  if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) return '♌'
  if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) return '♍'
  if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) return '♎'
  if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) return '♏'
  if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) return '♐'
  return '♑'
}

const HOY = new Date()
export const HOY_DIA = HOY.getDate()
export const HOY_MES = HOY.getMonth() + 1

export function diasHasta(dia: number, mes: number): number {
  const ahora = new Date(HOY.getFullYear(), HOY.getMonth(), HOY.getDate())
  let t = new Date(HOY.getFullYear(), mes - 1, dia)
  if (t < ahora) t.setFullYear(t.getFullYear() + 1)
  return Math.round((t.getTime() - ahora.getTime()) / 86400000)
}

export function proximoCumple<T extends CumpleBase>(items: T[]): (T & { dias: number }) | null {
  if (!items.length) return null
  return items
    .map((p) => ({ ...p, dias: diasHasta(p.cumple_dia, p.cumple_mes) }))
    .filter((p) => p.dias > 0)
    .sort((a, b) => a.dias - b.dias)[0] ?? null
}

export function wspHref(numero: string | null): string | null {
  if (!numero) return null
  const limpio = numero.replace(/\D/g, '')
  return limpio ? `https://wa.me/${limpio}` : null
}

export function WspIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.124 1.523 5.855L0 24l6.29-1.507A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.882 0-3.638-.5-5.153-1.375l-.369-.219-3.733.894.937-3.626-.241-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
      />
    </svg>
  )
}
