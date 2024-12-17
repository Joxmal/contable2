import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import AxiosService from '@/services/userServices'
// import { toast } from 'vue3-toastify'

interface CreatedRowLibroDiario {
  cuentaID: number | null
  debe: number
  haber: number
  description: string
}

interface FormCreateLibroDiario {
  asiento: number | undefined
  fechaMovimientoDesde: string
  createdRowLibroDiario: CreatedRowLibroDiario[]
}

///

export interface GetDataLibroDiario {
  id: number
  asiento: number
  fecha: Date
  cuentaId: number
  descripcion: string
  debe: number
  haber: number
  companyId: number
  createdAt: Date
  updatedAt: Date
}

export const useLibroDiarioStore = defineStore('LibroDiario', () => {
  //cuenta cuando se hace un post o un update
  const reload = ref(0)

  const vDateInput = ref<string[]>()
  const params = ref({
    fechaMovimientoDesde: undefined as undefined | string,
    fechaMovimientoHasta: undefined as undefined | string,
  })

  // formulario para crear
  const formCreateLibroDiario = ref({}) as Ref<FormCreateLibroDiario>

  const dataLibroDiario = ref([]) as Ref<GetDataLibroDiario[]>

  ////-------------------

  function asignarFormulario(data: FormCreateLibroDiario) {
    const { asiento, createdRowLibroDiario, fechaMovimientoDesde } = data
    const { value } = formCreateLibroDiario
    value.asiento = asiento
    value.createdRowLibroDiario = createdRowLibroDiario
    value.fechaMovimientoDesde = fechaMovimientoDesde
  }

  //-----obtener tipos principales de las cuentas contables
  async function getLibroDiario() {
    const param = {
      fechaMovimientoDesde: params.value.fechaMovimientoDesde || undefined,
      fechaMovimientoHasta: params.value.fechaMovimientoHasta || undefined,
    }
    try {
      const { data } = await AxiosService.get<GetDataLibroDiario[]>('/libro-diario', param)
      dataLibroDiario.value = data
    } catch (error) {
      console.error(error)
      throw new Error()
    }
  }

  async function PostDataLibroDiario() {
    const body = { ...formCreateLibroDiario.value }

    try {
      await AxiosService.post('/libro-diario', body)
      reload.value++
    } catch (error: any) {
      throw new Error(error.response.data.message)
    }
  }

  return {
    getLibroDiario,
    PostDataLibroDiario,
    asignarFormulario,
    reload,
    dataLibroDiario,
    params,
    vDateInput,
  }
})
