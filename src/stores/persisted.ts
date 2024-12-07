import { defineStore } from 'pinia'
export interface AuthSession {
  token: string
  user: User
}

export interface User {
  firstName: string
  lastName: string
  rolePrimary: string
  roleCompany: string
}

export const usePersistedStore = defineStore('persisted', {
  state: () => ({
    authSession: {} as AuthSession | null,
  }),
  persist: {
    storage: localStorage,
  },
})
