import { ref } from 'vue'
import { defineStore } from 'pinia'
import AxiosService from '@/services/userServices'
import type { GetFindAllBalanceComprobacion } from '@/interface/modulos/balance-comprobacion/GetFindAll.interface'
import type { DateInput } from '@/components/test/FechaInput.vue'

export const useBalanceComprobacionStore = defineStore('BalanceComprobacion', () => {
  const reload = ref(0)
  const findAllBalanceComprobacion = ref<GetFindAllBalanceComprobacion>()

  function incrementReload() {
    reload.value++
  }

  async function getDataBalanceComprobacionDB(date?: DateInput) {
    const { data } = await AxiosService.get<GetFindAllBalanceComprobacion>(
      '/balance-comprobacion',
      {
        fechaMovimientoDesde: date?.desde || undefined,
        fechaMovimientoHasta: date?.hasta || undefined,
      },
    )
    findAllBalanceComprobacion.value = data
  }

  return { reload, findAllBalanceComprobacion, incrementReload, getDataBalanceComprobacionDB }
})
