<template>
  <FechaInput @date="fechaRaw = $event"></FechaInput>

  <v-card flat title="LIBRO MAYOR">

    <div class="d-flex flex-wrap ga-4">
      <v-row>
        <v-col cols="12" sm="4" v-for="(item, index) in storeLibroMayor.getDataDB?.cuentasID" :key="`${index}-${item}`">
          <v-card border width="auto" :title="`${item.cuentaName}(${item.cuentaID})`">
            <v-table height="300">
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
                  <td v-for="(td, index) in data" :key="`td-${index}`">
                    {{ isISODate(td) ? formatDateString(td) : td }}
                  </td>

                </tr>
                <tr class="font-weight-bold">
                  <td colspan="3" class="text-center ">TOTAL</td>
                  <td>{{ item.debe }}</td>
                  <td>{{ item.haber }}</td>
                </tr>
                <!-- <tr class="font-weight-bold">
              <td colspan="3" class="text-center ">TOTAL NETO</td>
              <td colspan="2">{{ item.debe - item.haber }}</td>
            </tr> -->

              </tbody>
            </v-table>

            <!-- <pre>
          {{ item }}
        </pre> -->

          </v-card>
        </v-col>
      </v-row>

    </div>


  </v-card>

</template>

<script setup lang="ts">
import FechaInput from '@/components/test/FechaInput.vue';
import { onMounted, ref } from 'vue';
import { useLibroMayorStore } from '@/stores/libroMayor/LibroMayor';
import { formatDateString } from '@/utils/fechas/formatDateString';
import { isISODate } from '@/utils/fechas/isISODate';

const storeLibroMayor = useLibroMayorStore()

onMounted(() => {
  storeLibroMayor.getLibroMayor()
})
const fechaRaw = ref()

</script>
