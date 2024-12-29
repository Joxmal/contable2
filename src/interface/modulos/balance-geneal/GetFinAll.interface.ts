export interface GetFindAllBalanceGeneral {
  activos: Cuenta[] | []
  pasivos: Cuenta[] | []
  patrimonio: Cuenta[]
  ingresos: Cuenta[]
  gastos: Cuenta[]
  totales: Totales
}

export interface Cuenta {
  cuentaID: number
  tipoCuenta: string
  naturalezaPrimary: boolean
  cuentaName: string
  naturaleza: boolean
  debe: string
  haber: string
  totalNeto: string
  saldoDeudor: string
  saldoAcreedor: number
}

export interface Totales {
  activos: Activos
  pasivo_patrimonio: PasivoPatrimonio
}

export interface Activos {
  totalActivo: string
}

export interface PasivoPatrimonio {
  capitalSocial: string
  pasivo: string
  totalIngreso: string
  totalGastos: string
  utilidadEjercico: string
  total_pasivo_patrimonio: string
}
