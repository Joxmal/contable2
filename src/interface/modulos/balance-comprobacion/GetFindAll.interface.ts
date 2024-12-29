export interface GetFindAllBalanceComprobacion {
  mapeo: Mapeo[]
  totales: Totales
}

export interface Mapeo {
  cuentaID: number
  tipoCuenta: string
  naturalezaPrimary: boolean
  cuentaName: string
  naturaleza: boolean
  debe: string
  haber: string
  totalNeto: string
  saldoDeudor: number | string
  saldoAcreedor: number | string
}

export interface Totales {
  totalDebe: string
  totalHaber: string
  totalSaldoDeudor: string
  totalSaldoAcreedor: string
}
