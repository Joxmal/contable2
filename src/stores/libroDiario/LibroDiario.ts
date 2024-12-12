import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import AxiosService from '@/services/userServices'
import { toast } from 'vue3-toastify'

interface CuentaContables {
  id: number
  nombre: string
  codigo: number
  description: string
  Cuenta_contable_tipoId: number
}

interface cuentasTipo {
  id: number
  nombre: string
  codigo: number
  description: string
  createdAt: Date
  updatedAt: Date
}

interface DataLibroDiario {
  cuentasTipo: cuentasTipo[]
  cuentaContables: CuentaContables[]
}

interface FormCreateLibroDiario {
  fecha: string
  cuentaId: number
  description: string
  debe: number
  haber: number
}

export const useLibroDiarioStore = defineStore('LibroDiario', () => {
  const reload = ref(0)

  const formCreateLibroDiario = ref({}) as Ref<FormCreateLibroDiario>
  const dataLibroDiario = ref<DataLibroDiario>({
    cuentasTipo: [],
    cuentaContables: [],
  })

  ////-------------------

  function asignarFormulario(data: FormCreateLibroDiario) {
    const { cuentaId, debe, description, fecha, haber } = data
    const { value } = formCreateLibroDiario
    value.cuentaId = cuentaId
    value.debe = debe
    value.description = description
    value.fecha = fecha
    value.haber = haber
  }

  //-----obtener tipos principales de las cuentas contables
  async function fetchDataLibroDiario() {
    const { data, error } = await AxiosService.get<cuentasTipo[]>('/libro-diario')

    if (error) {
      toast.error('error al obtener tipos de cuentas primarios')
    } else {
      dataLibroDiario.value.cuentasTipo = data
    }
  }

  return {
    fetchDataLibroDiario,
    asignarFormulario,
    reload,
  }
})
