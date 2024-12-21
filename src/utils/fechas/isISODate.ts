export function isISODate(value: any) {
  // Verifica si el valor es una fecha en formato ISO
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
  return isoDatePattern.test(value)
}
