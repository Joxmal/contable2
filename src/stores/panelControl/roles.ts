import { ref } from 'vue'
import { defineStore } from 'pinia'
import AxiosService from '@/services/userServices'
import type { FindAllRoles } from '@/interface/modulos/roles/GetFindAllRoles.interface'

export const useRolesPanelControlStore = defineStore('RolesPanelControl', () => {
  const reload = ref(0)
  const findAllRoles = ref<FindAllRoles[]>([])

  function incrementReload() {
    reload.value++
  }

  async function dataRolesDB() {
    const { data } = await AxiosService.get<FindAllRoles[]>('/roles', {})
    findAllRoles.value = data
  }

  return { reload, findAllRoles, incrementReload, dataRolesDB }
})
