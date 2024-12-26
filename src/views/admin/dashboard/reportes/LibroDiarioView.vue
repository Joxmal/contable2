<template>


  <v-row class="pb-2">
    <v-col>
      <DialogGeneral :closed-number-dialog="closedNumberDialog" persistent @close="update = false" ref="dialog"
        :props_title-dialog="update ? 'Editar Asiento' : 'Crear Asiento'" props_open-btn="CREAR ASIENTO">
        <template #contenido>
          <CRUDFormLibroDiario @post="ocultar" :update="update" :updateId="updateId" ref="dialogContenido" />
        </template>
      </DialogGeneral>
    </v-col>
  </v-row>

  <v-divider :thickness="5" />

  <v-card>
    <template #title>
      <div class="d-flex ga-2 flex-column justify-center align-center">

        <v-date-input clearable width="300" v-model="storeLibroDiario.vDateInput"
          @update:model-value="asignarTimeStorage" density="compact" variant="solo" prepend-icon=""
          prepend-inner-icon="$calendar" label="Seleccionar Rango de Fechas" multiple="range" hide-details
          @click:clear="clearVDateInput">
        </v-date-input>
        <VBtn @click="reloadLibroDiario++" color="primary">Buscar</VBtn>
      </div>

    </template>
    <!-- buscador por fecha -->
    <TableDataLibroDiario :items="items" :totalItemsSuma="totalItemsSuma" />
  </v-card>
  <pre>
  {{ totalItemsSuma }}
</pre>

</template>

<script setup lang="ts">
import { VDateInput } from 'vuetify/labs/VDateInput'
import DialogGeneral from '@/components/dialog/DialogGeneral.vue';
import CRUDFormLibroDiario from '@/components/reportes/libroDiario/CRUDFormLibroDiario.vue';
import TableDataLibroDiario from '@/components/TableData/TableDataLibroDiario.vue';

import { useLibroDiarioStore, type GetDataLibroDiario } from '@/stores/libroDiario/LibroDiario';
import { useCuentasContablesStore } from '@/stores/cuentasContables/CuentasContables';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';
import { FechatoISOString } from '@/utils/fechas/toISOString';
const storeCuentasContables = useCuentasContablesStore()
const storeLibroDiario = useLibroDiarioStore()

const { reload: reloadLibroDiario } = storeToRefs(storeLibroDiario)

//ocultar el dialogo al crear o editar
const closedNumberDialog = ref(0)
function ocultar(value: boolean) {
  if (value)
    closedNumberDialog.value++
}


onMounted(async () => {
  await storeCuentasContables.fetchDataCuentas()
  await storeLibroDiario.getLibroDiario()
  asignarItems()
})
watch(reloadLibroDiario, async () => {
  await storeLibroDiario.getLibroDiario()
  asignarItems()
})

//EDITAR
const update = ref(false)
const updateId = ref(0)

interface GetDataLibroDiarioConCuenta extends GetDataLibroDiario {
  cuentaName?: string; // Nueva propiedad añadida
}

const items = ref<GetDataLibroDiarioConCuenta[]>()


export interface TotalItemsSuma {
  debe: number
  haber: number
  isValid: boolean
}
const totalItemsSuma = computed((): TotalItemsSuma => {
  if (!items.value) {
    return {
      debe: 0,
      haber: 0,
      isValid: false
    }
  }
  console.log(items.value)
  const data = items.value.reduce((acc, values) => {

    return {
      debe: +acc.debe + +values.debe,
      haber: +acc.haber + +values.haber,
    }
  }, { debe: 0, haber: 0 })

  const isValid = data.debe - data.haber === 0 ? true : false

  return {
    ...data,
    isValid
  }
})

function asignarItems() {
  const itemsRaw: GetDataLibroDiarioConCuenta[] = [...storeLibroDiario.dataLibroDiario]
  itemsRaw.forEach((item) => {
    const { cuentaId } = item
    // Asignar cuentaName al objeto actual
    item.cuentaName = storeCuentasContables.dataCuentasContables.cuentaContables.find(value => value.codigo === cuentaId)?.nombre || ''
  })

  items.value = itemsRaw
}

function clearVDateInput() {
  storeLibroDiario.vDateInput = undefined
  storeLibroDiario.params.fechaMovimientoDesde = undefined

  storeLibroDiario.params.fechaMovimientoHasta = undefined
}

function asignarTimeStorage() {
  if (!storeLibroDiario.vDateInput) {
    return
  }
  storeLibroDiario.params.fechaMovimientoDesde = storeLibroDiario.vDateInput[0] || undefined

  if (storeLibroDiario.vDateInput.length === 1) {
    storeLibroDiario.params.fechaMovimientoHasta = FechatoISOString({ fecha: storeLibroDiario.vDateInput[0], hora: '12am' })
  } else {
    storeLibroDiario.params.fechaMovimientoHasta = storeLibroDiario.vDateInput[storeLibroDiario.vDateInput.length - 1]
  }

  console.log(storeLibroDiario.vDateInput)
  console.log(storeLibroDiario.params)
}
</script>
