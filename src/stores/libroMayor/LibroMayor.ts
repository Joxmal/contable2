import { ref } from 'vue'
import { defineStore } from 'pinia'
import AxiosService from '@/services/userServices'
// import { toast } from 'vue3-toastify'

export interface GetDataDB {
  companyId: number
  cuentasID: CuentasID[]
}

interface CuentasID {
  cuentaID: number
  cuentaName: string
  data: Datum[]
  debe: number
  haber: number
}

interface Datum {
  asiento: number
  fecha: Date
  descripcion: string
  debe: number
  haber: number
}

export const useLibroMayorStore = defineStore('LibroMayor', () => {
  //cuenta cuando se hace un post o un update
  const reload = ref(0)
  const getDataDB = ref<GetDataDB>()

  //-----obtener tipos principales de las cuentas contables
  async function getLibroMayor() {
    try {
      const { data } = await AxiosService.get<GetDataDB>('/libro-mayor')
      console.log(data)
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
