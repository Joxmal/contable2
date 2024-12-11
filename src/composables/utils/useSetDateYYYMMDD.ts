export function useSetDateYYYMMDD(date: string) {
  const fecha = new Date(date)

  // Extraer el año, mes y día
  const anio = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0') // Los meses son 0-indexed
  const dia = String(fecha.getDate()).padStart(2, '0')

  // Formatear la fecha en el formato YYYY-MM-DD
  const fechaFormateada = `${anio}-${mes}-${dia}`

  return fechaFormateada
}
