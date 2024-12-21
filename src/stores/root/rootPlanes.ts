import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import AxiosService from '@/services/userServices'
import type { Permissions } from '@/interface/permissions'
import type { AxiosError } from 'axios'

export interface GetPlanes {
  id: number
  nombre: string
  permissions: Permissions
  description: string
  permissionsId: number
  createdAt: Date
  updatedAt: Date
}

interface Form {
  nombre: string
  description?: string
  Permissions: Permissions
}

export const useRootPlanesStore = defineStore('rootPlanes', () => {
  const reload = ref(0)

  //data que llega directamente de la base de datos
  const dataPlanesDB = ref() as Ref<GetPlanes[]>

  const form = ref({}) as Ref<Form>

  async function postPlanes() {
    const body = { ...form.value }
    try {
      const { data } = await AxiosService.post('/company-plan', body)
      console.log(data)
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        // Verifica si hay un mensaje específico en la respuesta

        const dataRaw = error.response?.data as any

        const errorMessage = dataRaw.message || JSON.stringify(dataRaw)

        throw new Error(errorMessage) // Lanza el mensaje de error
      } else {
        throw new Error('An unexpected error occurred')
      }
    }
  }

  async function getPlanes() {
    try {
      const { data } = await AxiosService.get<GetPlanes[]>('/company-plan')
      dataPlanesDB.value = data
    } catch (error: any) {
      console.log(error)
      throw new Error(error)
    }
  }

  // Función de tipo guardia para verificar si el error es un AxiosError
  function isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined
  }
  return {
    reload,
    form,
    dataPlanesDB,
    getPlanes,
    postPlanes,
  }
})
