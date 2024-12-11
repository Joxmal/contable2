//obtiene un numero o string y le da dos decimales
export function useFinancial(x: string | number | undefined) {
  return Number(Number(x)).toFixed(2)
}
