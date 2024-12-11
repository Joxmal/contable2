import { computed, ref } from 'vue'
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
interface DataCuentasContables {
  cuentasTipo: cuentasTipo[]
  cuentaContables: CuentaContables[]
}

export const useCuentasContablesStore = defineStore('cuentasContables', () => {
  const reload = ref(0)

  const formCreateCuentasContables = ref({
    cuentaPadreCod: 0,
    cod: 0,
    name: '',
    description: '',
  })
  const dataCuentasContables = ref<DataCuentasContables>({
    cuentasTipo: [],
    cuentaContables: [],
  })

  //computed

  const combinedList = computed(() => {
    const litaTiposCuentas = dataCuentasContables.value.cuentasTipo
    const litaCuentas = dataCuentasContables.value.cuentaContables

    console.log('litaCuentas', litaCuentas)
    const litaCuentaTiposMap = litaTiposCuentas.map((values) => {
      return {
        value: values.codigo,
        tipo: values.nombre,
      }
    })

    const listaCuentasMap = litaCuentas.map((values) => {
      return {
        value: values.codigo,
        tipo: values.nombre,
      }
    })
    const combinedList = litaCuentaTiposMap.concat(listaCuentasMap)
    console.log(combinedList)
    return combinedList
  })
  ////-------------------

  function asignarFormulario({
    cuentaPadreCod,
    cod,
    name,
    description,
  }: {
    cuentaPadreCod: number
    cod: number
    name: string
    description: string
  }) {
    const { value } = formCreateCuentasContables
    value.cuentaPadreCod = cuentaPadreCod
    value.cod = cod
    value.name = name
    value.description = description
  }

  //-----obtener tipos principales de las cuentas contables
  async function fetchDataCuentasTipo() {
    const { data, error } = await AxiosService.get<cuentasTipo[]>('/cuentas-contables/tipos')

    console.log(data)
    dataCuentasContables.value.cuentasTipo = data
    if (error) {
      toast.error('error')
    } else {
      dataCuentasContables.value.cuentasTipo = data
    }
  }

  //-----obtener las cuentas contables hijas de los tipos principales
  async function fetchDataCuentas() {
    const { data, error } = await AxiosService.get<CuentaContables[]>('/cuentas-contables')
    console.log('data', data)
    if (error) {
      toast.error('error')
    } else {
      dataCuentasContables.value.cuentaContables = data
    }
  }

  //-----crear las cuentas contables hijas de los tipos principales
  async function PostDataCuentas() {
    const body = { ...formCreateCuentasContables.value }
    const { data, error } = await AxiosService.post('/cuentas-contables', body)
    console.log(data)
    if (error) {
      toast.error('error')
    } else {
      reload.value++
      toast.success('Creado correctamente')
    }

    if (error) {
      toast.error('error')
    } else {
      dataCuentasContables.value.cuentasTipo = data
    }
  }

  //-----editar las cuentas contables hijas de los tipos principales
  async function patchDataCuentas(id: number) {
    const body = { ...formCreateCuentasContables.value }
    const { error } = await AxiosService.patch(`/cuentas-contables/${id}`, body)

    if (error) {
      toast.error('error')
    } else {
      reload.value++
      toast.success('Editado correctamente')
    }
  }

  //-----eliminar tipo de cuenta contable
  async function deleteDataCuentas(id: number) {
    const confirma = confirm('¿Quiere eliminar Esta Cuenta Contable?')
    if (!confirma) return

    const { error } = await AxiosService.delete<CuentaContables[]>(`/cuentas-contables/${id}`)

    if (error) {
      toast.error('error')
    } else {
      reload.value++
    }
  }

  return {
    fetchDataCuentasTipo,
    deleteDataCuentas,
    PostDataCuentas,
    patchDataCuentas,
    dataCuentasContables,
    asignarFormulario,
    reload,
    fetchDataCuentas,
    combinedList,
  }
})
