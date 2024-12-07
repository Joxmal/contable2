// src/composables/useAxios.ts
import { ref } from 'vue'
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

export default function useAxios<T>() {
  const response = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref<boolean>(false)

  const exec = async (options: AxiosRequestConfig): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const res: AxiosResponse<T> = await axios(options)
      response.value = res.data
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  return { response, error, loading, exec }
}
