import useAxios from '@/composables/useAxios'
import type { AxiosRequestConfig } from 'axios'
import { usePersistedStore } from '@/stores/persisted'

class AxiosService {
  private baseURL: string
  private token: string | undefined = usePersistedStore().authSession?.token

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL
  }

  setToken(token: string | undefined) {
    this.token = token
  }

  private createConfig(endpoint: string, method: string, data?: any): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      url: `${this.baseURL}${endpoint}`,
      method,
      ...(method === 'GET' ? { params: data } : { data }), // Condicionalmente asignar params o data
    }

    if (this.token) {
      config.headers = {
        Authorization: `Bearer ${this.token}`,
      }
    }

    return config
  }

  async get<T>(endpoint: string, params?: any) {
    const { exec, response, error } = useAxios<T>()
    console.log(params)
    const getData = await exec(this.createConfig(endpoint, 'GET', params))
    console.log(getData)

    return { data: response.value as T, error: error.value }
  }

  async post<T>(endpoint: string, data: any) {
    const { exec, response, error } = useAxios<T>()
    await exec(this.createConfig(endpoint, 'POST', data))
    return { data: response.value, error: error.value }
  }

  async patch<T>(endpoint: string, data: any) {
    const { exec, response, error } = useAxios<T>()
    await exec(this.createConfig(endpoint, 'PATCH', data))
    return { data: response.value, error: error.value }
  }

  async delete<T>(endpoint: string) {
    const { exec, response, error } = useAxios<T>()
    await exec(this.createConfig(endpoint, 'DELETE'))
    return { data: response.value, error: error.value }
  }
}

export default new AxiosService(import.meta.env.VITE_API_URL)
