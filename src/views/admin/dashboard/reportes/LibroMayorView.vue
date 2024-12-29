<template>
  <v-card class="d-flex  bg-surface-variant flex-wrap">
    <div class="ma-2 pa-2 me-auto">
      <v-tooltip text="Calcular usando el Sando Anterior del ultimo periodo">
        <template v-slot:activator="{ props }">
          <v-checkbox width="180" v-bind="props" hide-details density="compact" label="Sando Anterior(SA)"></v-checkbox>
        </template>
      </v-tooltip>
    </div>

    <DialogGeneral class="ma-2 pa-2 " props_open-btn="naturaleza" props_title-dialog="NATURALEZA DE LAS CUENTAS ">
      <template #contenido>
        <VImg cover src="/images/examples/naturalezaCuentas.webp" alt="Portada" class=" rounded-lg" />
      </template>
    </DialogGeneral>
  </v-card>


  <v-card flat>
    <v-card-title class="text-center">
      LIBRO MAYOR
      <FechaInput class="mx-auto" @date="fechaRaw = $event"></FechaInput>
      <VBtn class="mt-1" color="primary" @click="buscarLibroMayor">BUSCAR</VBtn>
    </v-card-title>
    <v-row>
      <v-col cols="12" sm="6" md="6" lg="4" v-for="(item, index) in storeLibroMayor.getDataDB?.cuentasID"
        :key="`${index}-${item}`">
        <v-card :class="{ 'border-error': +item.totalNeto < 0 }" border width="auto"
          :title="`${item.cuentaName}(${item.cuentaID})`">
          <v-table density="compact" height="300">
            <thead>
              <tr>
                <th>
                  Asiento
                </th>
                <th>
                  fecha
                </th>
                <th>
                  Descripción
                </th>
                <th>
                  Debe
                </th>
                <th>
                  Haber
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in item.data" :key="`data-${index}`">
                <td>
                  {{ data.asiento }}
                </td>
                <td>
                  {{ formatDateString(data.fecha) }}
                </td>
                <td>
                  {{ data.descripcion }}
                </td>
                <td>
                  {{ financialFixed(data.debe) }}
                </td>
                <td>
                  {{ financialFixed(data.haber) }}
                </td>

              </tr>
              <tr class="font-weight-bold">
                <td colspan="3" class="text-center ">TOTAL</td>
                <td>{{ financialFixed(item.debe) }}</td>
                <td>{{ financialFixed(item.haber) }}</td>
              </tr>
              <tr class="font-weight-bold">
                <td colspan="3" class="text-center ">TOTAL NETO</td>

                <td>{{ +item.debe > +item.haber ? financialFixed(Math.abs(+item.totalNeto)) : '' }} </td>
                <td>{{ +item.debe < +item.haber ? financialFixed(Math.abs(+item.totalNeto)) : '' }} </td>
              </tr>

            </tbody>
          </v-table>
          <template #actions>
            <v-table density="compact">
              <tbody>
                <tr cols class="font-weight-bold">
                  <td class="text-center ">TOTAL NETO: {{ financialFixed(Math.abs(+item.totalNeto)) }} </td>
                </tr>
                <tr :class="''">
                  <td class="text-center "> {{ +item.debe > +item.haber ? 'Cuenta Deudora' : 'Cuenta Acreedora' }} </td>
                </tr>
              </tbody>
            </v-table>

          </template>

          <!-- <pre>
          {{ item }}
        </pre> -->
        </v-card>
      </v-col>
    </v-row>
  </v-card>

</template>

<script setup lang="ts">
import FechaInput, { type DateInput } from '@/components/test/FechaInput.vue';
import { onMounted, ref } from 'vue';
import { useLibroMayorStore } from '@/stores/libroMayor/LibroMayor';
import { formatDateString } from '@/utils/fechas/formatDateString';
import { financialFixed } from '@/utils/fechas/financialFixed';
import DialogGeneral from '@/components/dialog/DialogGeneral.vue';

const storeLibroMayor = useLibroMayorStore()
const fechaRaw = ref<DateInput>()

onMounted(() => {
  storeLibroMayor.getLibroMayor()
})


function buscarLibroMayor() {

  if (fechaRaw.value) {
    storeLibroMayor.getLibroMayor({
      desde: fechaRaw.value.desde,
      hasta: fechaRaw.value.hasta,
      raw: fechaRaw.value.raw
    })
  }
}




</script>
