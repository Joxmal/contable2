import { ref } from 'vue'
import { defineStore } from 'pinia'
import AxiosService from '@/services/userServices'
import type { DateInput } from '@/components/test/FechaInput.vue'
// import { toast } from 'vue3-toastify'

export interface GetDataDB {
  companyId: number
  cuentasID: CuentasID[]
}

interface CuentasID {
  cuentaID: number
  cuentaName: string
  naturaleza: boolean
  data: Datum[]
  debe: string
  haber: string
  totalNeto: string // si es negativo esta incorrecta la cuenta
}

interface Datum {
  asiento: number
  fecha: Date
  descripcion: string
  debe: string
  haber: string
}

export const useLibroMayorStore = defineStore('LibroMayor', () => {
  //cuenta cuando se hace un post o un update
  const reload = ref(0)
  const getDataDB = ref<GetDataDB>()

  //-----obtener tipos principales de las cuentas contables
  async function getLibroMayor(date?: DateInput) {
    try {
      const { data } = await AxiosService.get<GetDataDB>('/libro-mayor', {
        fechaMovimientoDesde: date ? date.desde : undefined,
        fechaMovimientoHasta: date ? date.hasta : undefined,
      })
      getDataDB.value = data
    } catch (error) {
      console.error(error)
      throw new Error()
    }
  }

  async function postLibroMayor({ reloadData = false }: { reloadData: boolean }) {
    try {
      await AxiosService.post('/libro-mayor', {})
      if (reloadData) {
        reload.value++
      }
    } catch (error: any) {
      throw new Error(error.response.data.message)
    }
  }

  return {
    getLibroMayor,
    postLibroMayor,
    getDataDB,
  }
})
