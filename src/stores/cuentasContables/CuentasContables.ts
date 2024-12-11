import { ref } from 'vue'
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

  //-----

  async function fetchDataCuentasTipo() {
    const { data, error } = await AxiosService.get('/cuentas-contables/tipos')

    if (error) {
      toast.error('error')
    } else {
      dataCuentasContables.value.cuentasTipo = data
    }
  }

  async function fetchDataCuentas() {
    const { data, error } = await AxiosService.get('/cuentas-contables')
    console.log('data', data)
    if (error) {
      toast.error('error')
    } else {
      dataCuentasContables.value.cuentaContables = data
    }
  }

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

  return {
    fetchDataCuentasTipo,
    PostDataCuentas,
    dataCuentasContables,
    asignarFormulario,
    reload,
    fetchDataCuentas,
  }
})
