<template>
  <div class="d-flex flex-column mb-2">
    <FechaInput class="mx-auto" @date="fechaRaw = $event"></FechaInput>
    <VBtn class="mt-1" color="primary mx-auto"
      @click="store.getDataBalanceGeneralDB({ desde: fechaRaw?.desde, hasta: fechaRaw?.hasta })">BUSCAR
    </VBtn>
  </div>

  <v-card class="mx-auto">

    <v-table class="table-full-bordered-cell" v-if="store.findAllBalanceGeneral" density="compact">
      <caption class="font-weight-bold bordered-cell bg-blue-grey-lighten-3">Balance General</caption>
      <thead>
        <tr>
          <th width="400" class="font-weight-bold bordered-cell bg-blue-grey-lighten-4 ">
            CUENTA
          </th>
          <th class="font-weight-bold bordered-cell text-center bg-blue-grey-lighten-4 ">
            MONTO
          </th>
          <th width="160" class="font-weight-bold bordered-cell text-center bg-blue-grey-lighten-4 ">
            TOTAL
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Activos -->
        <tr>
          <td colspan="3" class="text-center font-weight-bold">Activos</td>
        </tr>
        <tr v-for="(item, index) in store.findAllBalanceGeneral.activos" :key="`activo-${index}`">
          <td>{{ item.cuentaName }}</td>
          <td align="center">{{ financialFixed(item.totalNeto) }}</td>
          <td></td>
        </tr>
        <tr class="bordered-cell bg-blue-grey-lighten-5 font-weight-bold">
          <td colspan="2">Total Activos</td>
          <td align="right" class="">{{
            financialFixed(store.findAllBalanceGeneral.totales.activos.totalActivo) }}</td>
        </tr>
        <!-- Patrimonio -->
        <tr>
          <td colspan="3" class="text-center font-weight-bold">Patrimonio</td>
        </tr>
        <tr v-for="(item, index) in store.findAllBalanceGeneral.patrimonio" :key="`activo-${index}`">
          <td>{{ item.cuentaName }}</td>
          <td align="center">{{ financialFixed(item.totalNeto) }}</td>
          <td></td>
        </tr>
        <tr class="bordered-cell bg-blue-grey-lighten-5 font-weight-bold">
          <td colspan="2">Total Patrimonio</td>
          <td align="right" class="">{{
            financialFixed(store.findAllBalanceGeneral.totales.pasivo_patrimonio.capitalSocial) }}</td>
        </tr>
        <!-- Pasivo -->
        <tr>
          <td colspan="3" class="text-center font-weight-bold">Pasivo</td>
        </tr>
        <tr v-for="(item, index) in store.findAllBalanceGeneral.pasivos" :key="`activo-${index}`">
          <td>{{ item.cuentaName }}</td>
          <td align="center">{{ financialFixed(item.totalNeto) }}</td>
          <td></td>
        </tr>
        <tr class="bordered-cell bg-blue-grey-lighten-5 font-weight-bold">
          <td colspan="2">Total Pasivo</td>
          <td align="right" class="">{{
            financialFixed(store.findAllBalanceGeneral.totales.pasivo_patrimonio.pasivo) }}</td>
        </tr>
        <!-- Estado de Resultados-->
        <tr>
          <td colspan="3" class="text-center font-weight-bold bg-blue-grey-lighten-4">Estado de Resultados</td>
        </tr>
        <!-- Ingresos-->
        <tr>
          <td colspan="3" class="text-center font-weight-bold">Ingresos</td>
        </tr>
        <tr v-for="(item, index) in store.findAllBalanceGeneral.ingresos" :key="`activo-${index}`">
          <td>{{ item.cuentaName }}</td>
          <td align="center">{{ financialFixed(item.totalNeto) }}</td>
          <td></td>
        </tr>
        <tr class="bordered-cell bg-blue-grey-lighten-5 font-weight-bold">
          <td colspan="2">Total Ingresos</td>
          <td align="right" class=""> {{
            financialFixed(store.findAllBalanceGeneral.totales.pasivo_patrimonio.totalIngreso) }} </td>
        </tr>
        <!-- Gastos-->
        <tr>
          <td colspan="3" class="text-center font-weight-bold">Gastos</td>
        </tr>
        <tr v-for="(item, index) in store.findAllBalanceGeneral.gastos" :key="`activo-${index}`">
          <td>{{ item.cuentaName }}</td>
          <td align="center">{{ financialFixed(item.totalNeto) }}</td>
          <td></td>
        </tr>
        <tr class="bordered-cell bg-blue-grey-lighten-5 font-weight-bold">
          <td colspan="2">Total Gastos</td>
          <td align="right" class=""> {{
            financialFixed(store.findAllBalanceGeneral.totales.pasivo_patrimonio.totalGastos) }} </td>
        </tr>
        <tr class="bordered-cell bg-blue-grey-lighten-5 font-weight-bold">
          <td colspan="2" align="center">UTILIDAD NETA</td>
          <td align="center" class=""> {{
            financialFixed(store.findAllBalanceGeneral.totales.pasivo_patrimonio.utilidadEjercico) }} </td>
        </tr>
      </tbody>

    </v-table>

  </v-card>


</template>


<script setup lang="ts">
import type { DateInput } from '@/components/test/FechaInput.vue';
import FechaInput from '@/components/test/FechaInput.vue';
import { useBalanceGeneralStore } from '@/stores/balanceGeneral/balanceComprobacion';
import { financialFixed } from '@/utils/fechas/financialFixed';
import { onMounted, ref } from 'vue';

const fechaRaw = ref<DateInput>()

const store = useBalanceGeneralStore()

onMounted(() => {
  store.getDataBalanceGeneralDB()
})
</script>
