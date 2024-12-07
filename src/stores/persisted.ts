import { defineStore } from 'pinia'
export interface AuthSession {
  token: string
  user: User
}

interface User {
  id: number
  name: string
  role: 'user' | 'admin' | 'superAdmin' | 'root'
}

export const usePersistedStore = defineStore('persisted', {
  state: () => ({
    authSession: {
      token: '',
      user: {
        id: 1,
        name: 'joxmal',
        role: 'user',
      },
    } as AuthSession,
  }),
  persist: {
    storage: localStorage,
  },
})
