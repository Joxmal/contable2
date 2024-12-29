<template>
  balance Comprobación


  <div class="d-flex flex-column mb-2">
    <FechaInput class="mx-auto" @date="fechaRaw = $event"></FechaInput>
    <VBtn class="mt-1" color="primary mx-auto"
      @click="store.getDataBalanceComprobacionDB({ desde: fechaRaw?.desde, hasta: fechaRaw?.hasta })">BUSCAR
    </VBtn>
  </div>


  <v-table density="compact" fixed-header hover class="bordered-table">
    <thead>
      <tr>
        <th class="font-weight-bold bordered-cell bg-blue-grey-lighten-4" v-for="header in headers" :key="header">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data, index) in store.findAllBalanceComprobacion?.mapeo" :key="`key-${index}`">
        <td class="bordered-cell">
          {{ `${data.cuentaName}(${data.cuentaID})` }}
        </td>
        <td class="bordered-cell">
          {{ financialFixed(data.debe) }}
        </td>
        <td class="bordered-cell">
          {{ financialFixed(data.haber) }}
        </td>
        <td class="bordered-cell">
          {{ financialFixed(data.saldoDeudor) }}
        </td>
        <td class="bordered-cell">
          {{ financialFixed(data.saldoAcreedor) }}
        </td>
      </tr>
      <tr class="font-weight-bold">
        <td class="bordered-cell">
          TOTALES
        </td>
        <td v-for="(data, index) in store.findAllBalanceComprobacion?.totales" :key="`Totales-${index}`"
          class="bordered-cell bg-blue-grey-lighten-4">
          {{ financialFixed(data) }}
        </td>
      </tr>
    </tbody>
  </v-table>

  <pre>
</pre>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useBalanceComprobacionStore } from '@/stores/balanceComprobacion/balanceComprobacion';
import { financialFixed } from '@/utils/fechas/financialFixed';
import FechaInput, { type DateInput } from '@/components/test/FechaInput.vue';

const fechaRaw = ref<DateInput>()

const headers = [
  'Cuenta',
  'Debe',
  'Haber',
  'Saldo Deudor',
  'Saldo Acreedor'
]

const store = useBalanceComprobacionStore()

onMounted(() => {
  store.getDataBalanceComprobacionDB()
})
</script>
