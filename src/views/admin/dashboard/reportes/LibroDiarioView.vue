<template>

  <v-row class="pb-2">
    <v-col>
      <DialogGeneral @close="update = false" ref="dialog"
        :props_title-dialog="update ? 'Editar Cuenta' : 'Crear Cuenta'" props_open-btn="CREAR CUENTA">
        <template #contenido>
          <CRUDFormLibroDiario :update="update" :updateId="updateId" ref="dialogContenido" />
        </template>
      </DialogGeneral>
    </v-col>
  </v-row>

  <TableDataLibroDiario :items="items" />
</template>

<script setup lang="ts">
import DialogGeneral from '@/components/dialog/DialogGeneral.vue';
import CRUDFormLibroDiario from '@/components/reportes/libroDiario/CRUDFormLibroDiario.vue';
import TableDataLibroDiario from '@/components/TableData/TableDataLibroDiario.vue';

import { useCuentasContablesStore } from '@/stores/cuentasContables/CuentasContables';
import { onMounted, ref } from 'vue';
const storeCuentasContables = useCuentasContablesStore()
onMounted(() => {
  storeCuentasContables.fetchDataCuentas()
  storeCuentasContables.fetchDataCuentasTipo()
})
//EDITAR
const update = ref(false)
const updateId = ref(0)

const items = [
  {
    asiento: 1,
    fecha: '2-4-5',
    cuentaId: 1001,
    debe: 100,
    haber: 0,
    description: 'hola mundo'
  },
  {
    asiento: 1,
    fecha: '2-4-5',
    cuentaId: 1001,
    debe: 100,
    haber: 0,
    description: 'hola mundo'
  },
  {
    asiento: 1,
    fecha: '2-4-5',
    cuentaId: 1001,
    debe: 100,
    haber: 0,
    description: 'hola mundo'
  },
  {
    asiento: 1,
    fecha: '2-4-5',
    cuentaId: 1001,
    debe: 100,
    haber: 0,
    description: 'hola mundo'
  },
  {
    asiento: 1,
    fecha: '2-4-5',
    cuentaId: 1001,
    debe: 100,
    haber: 0,
    description: 'hola mundo'
  },
]

</script>
