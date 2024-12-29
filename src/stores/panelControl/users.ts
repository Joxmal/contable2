import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AuthUser, GetONECompanyUser } from '@/interface/modulos/company/GetId.interface'
import AxiosService from '@/services/userServices'

export const useUsersPanelControlStore = defineStore('UsersPanelControl', () => {
  const reload = ref(0)
  const dataUsersDB = ref<AuthUser[]>([])

  function incrementReload() {
    reload.value++
  }

  async function usersDataDB() {
    try {
      const { data } = await AxiosService.get<GetONECompanyUser>('/company/SUPERADMIN')
      dataUsersDB.value = data.auth_users
    } catch (error) {
      console.error(error)
      throw new Error()
    }
  }

  //activa o desactiva al usuario
  async function AlterUsersDataDB(id: number | string) {
    const confirma = confirm('¿Quieres modificar este usuario?')
    if (!confirma) return
    try {
      await AxiosService.delete<GetONECompanyUser>(`/user/${id}`)
    } catch (error: any) {
      console.error(error)
      throw new Error(error)
    }
  }

  return { reload, dataUsersDB, incrementReload, usersDataDB, AlterUsersDataDB }
})
