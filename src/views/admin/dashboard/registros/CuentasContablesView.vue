<template>
  <DialogGeneral @close="update = false" ref="dialog" :props_title-dialog="update ? 'Editar Cuenta' : 'Crear Cuenta'"
    props_open-btn="CREAR CUENTA">
    <template #contenido>
      <CreateUpdateCuentasContables :update="update" :updateId="updateId" ref="dialogContenido" />
    </template>
  </DialogGeneral>


  <!-- tabla de cuentas contables -->
  <TableDataCuentaContable :items="storeCuentasContables.dataCuentasContables.cuentaContables"
    @eliminar="console.log($event)" @editar="updateForm" />
</template>
<script setup lang="ts">
import TableDataCuentaContable from '@/components/TableData/TableDataCuentaContable.vue'
import { useCuentasContablesStore } from '@/stores/cuentasContables/CuentasContables';
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import CreateUpdateCuentasContables from '@/components/resgistros/cuentasContables/CreateUpdateCuentasContables.vue';
import DialogGeneral from '@/components/dialog/DialogGeneral.vue';
import useWaitForDialog from '@/composables/useWaitForDialog';


//store
const storeCuentasContables = useCuentasContablesStore()
const { reload } = storeToRefs(storeCuentasContables)

///-----------------------
onMounted(() => {
  storeCuentasContables.fetchDataCuentas()
})

watch(reload, () => {
  storeCuentasContables.fetchDataCuentas()
})

//EDITAR
const dialog = ref<InstanceType<typeof DialogGeneral> | null>(null);
const dialogContenido = ref<InstanceType<typeof CreateUpdateCuentasContables> | null>(null);
const update = ref(false)
const updateId = ref(0)

export interface Data {
  id: number;
  codigo: number;
  nombre: string;
  description: string;
  Cuenta_contable_tipoId: number;
  companyId: number;
  createdAt: Date;
  updatedAt: Date;
}


async function updateForm(data: Data) {

  console.log(data)



  const { Cuenta_contable_tipoId, codigo, description, id, nombre } = data
  updateId.value = +id
  update.value = true
  if (dialog.value) {
    dialog.value.dialog = true;
  }

  await useWaitForDialog(dialog)

  if (dialogContenido.value) {
    dialogContenido.value.cuentaPadre.value.value = Cuenta_contable_tipoId;
    dialogContenido.value.cod.value.value = codigo;
    dialogContenido.value.nombre.value.value = nombre;
    dialogContenido.value.description.value.value = description;
  }
}

</script>
