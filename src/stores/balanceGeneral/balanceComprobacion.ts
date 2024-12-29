import { ref } from 'vue'
import { defineStore } from 'pinia'
import AxiosService from '@/services/userServices'
import type { GetFindAllBalanceGeneral } from '@/interface/modulos/balance-geneal/GetFinAll.interface'
import type { DateInput } from '@/components/test/FechaInput.vue'

export const useBalanceGeneralStore = defineStore('BalanceGeneral', () => {
  const reload = ref(0)
  const findAllBalanceGeneral = ref<GetFindAllBalanceGeneral>()

  function incrementReload() {
    reload.value++
  }

  async function getDataBalanceGeneralDB(date?: DateInput) {
    const { data } = await AxiosService.get<GetFindAllBalanceGeneral>('/balance-general', {
      fechaMovimientoDesde: date?.desde || undefined,
      fechaMovimientoHasta: date?.hasta || undefined,
    })
    findAllBalanceGeneral.value = data
  }

  return { reload, findAllBalanceGeneral, incrementReload, getDataBalanceGeneralDB }
})
