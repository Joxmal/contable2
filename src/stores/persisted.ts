import { defineStore } from 'pinia'
export interface AuthSession {
  token: string
  user: User
}

interface RoleCompany {
  name: string
  permissionsId: number
}

export interface User {
  firstName: string
  lastName: string
  rolePrimary: string
  roleCompany: RoleCompany
}

export const usePersistedStore = defineStore('persisted', {
  state: () => ({
    authSession: {} as AuthSession | null,
  }),
  persist: {
    storage: localStorage,
  },
})
