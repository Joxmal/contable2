import useAxios from '@/composables/useAxios'
import type { AxiosRequestConfig } from 'axios'

class AxiosService {
  private baseURL: string

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL
  }

  private createConfig(endpoint: string, method: string, data?: any): AxiosRequestConfig {
    return {
      url: `${this.baseURL}${endpoint}`,
      method,
      data,
    }
  }

  async get<T>(endpoint: string, params?: any) {
    const { exec, response, error } = useAxios<T>()
    await exec(this.createConfig(endpoint, 'GET', { params }))
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
