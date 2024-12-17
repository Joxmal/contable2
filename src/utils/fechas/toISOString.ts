interface GuardarFechaParaBuscar {
  fecha: Date | number | string
  setUTCHours?: [number, number, number, number] // Un array de 4 elementos para horas, minutos, segundos y milisegundos
  hora?: '8am' | '12pm' | '12am'
}

export function FechatoISOString(data: GuardarFechaParaBuscar): string {
  // Si no se proporciona setUTCHours, se asigna [0, 0, 0, 0] por defecto

  // Declarar serUtc fuera de los bloques condicionales
  // Declarar serUtc con un valor predeterminado
  let serUtc: [number, number, number, number] = [0, 0, 0, 0] // Por defecto a las 00:00:00.000 UTC

  // Asignar valores a serUtc según la propiedad hora
  if (data.hora === '8am') {
    serUtc = [12, 0, 0, 0] // 8 AM en Venezuela es 12 PM UTC
  } else if (data.hora === '12pm') {
    serUtc = [16, 0, 0, 0] // 12 PM en Venezuela es 4 PM UTC
  } else if (data.hora === '12am') {
    serUtc = [23, 59, 59, 999] // Medianoche UTC
  } else if (data.setUTCHours) {
    serUtc = data.setUTCHours // Usar los valores proporcionados en setUTCHours si están disponibles
  }

  // Crear un nuevo objeto Date a partir de la fecha proporcionada
  const date = new Date(data.fecha)

  // Verificar si la fecha es válida
  if (isNaN(date.getTime())) {
    throw new Error('La fecha proporcionada no es válida.')
  }

  // Establecer las horas UTC usando los valores de serUtc
  date.setUTCHours(serUtc[0], serUtc[1], serUtc[2], serUtc[3])

  // Retornar la fecha en formato ISO
  // Retornar la fecha en formato ISO
  return date.toISOString()
}
