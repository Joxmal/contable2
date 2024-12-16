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

  <TableDataLibroDiario :items="items" :totalItemsSuma="totalItemsSuma" />

  {{ totalItemsSuma }}
  <pre>
  {{ items }}
</pre>
</template>

<script setup lang="ts">
import DialogGeneral from '@/components/dialog/DialogGeneral.vue';
import CRUDFormLibroDiario from '@/components/reportes/libroDiario/CRUDFormLibroDiario.vue';
import TableDataLibroDiario from '@/components/TableData/TableDataLibroDiario.vue';

import { useCuentasContablesStore } from '@/stores/cuentasContables/CuentasContables';
import { useLibroDiarioStore, type GetDataLibroDiario } from '@/stores/libroDiario/LibroDiario';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';
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
  const data = items.value.reduce((acc, values) => {
    console.log(typeof values.debe)

    return {
      debe: acc.debe + values.debe,
      haber: acc.haber + values.haber,
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



</script>
