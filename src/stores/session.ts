import { defineStore } from 'pinia'
import { usePersistedStore } from './persisted'
import { useRouter } from 'vue-router'

export const useSessionStore = defineStore('session', () => {
  function cerrarSesión() {
    usePersistedStore().authSession = {
      token: '',
      user: {
        id: 1,
        name: '',
        role: 'user',
      },
    }
    return useRouter().push('/')
  }

  return { cerrarSesión }
})
