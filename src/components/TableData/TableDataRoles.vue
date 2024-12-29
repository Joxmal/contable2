<template>

  <v-row class="pb-2">
    <v-col>
      <DialogGeneral :closed-number-dialog="closedNumberDialog" @close="update = false" ref="dialog"
        :props_title-dialog="update ? 'Editar ROL' : 'Crear ROL'" props_open-btn="CREAR ROL">
        <template #contenido>
          <CRUDRoles :update="update" @created="reload" ref="dialogContenido" />
        </template>
      </DialogGeneral>
    </v-col>
  </v-row>

  <v-card>
    <template #text>
      <v-text-field placeholder="Buscador" v-model="search" label="Buscar" prepend-inner-icon="mdi-magnify"
        variant="outlined" hide-details single-line>
      </v-text-field>
    </template>

    <v-data-table :search="search" density="compact" :headers="headers" :items="props.tableItems">
      <template #top>
        <div class="text-center  bg-blue-grey-lighten-3 font-weight-bold text-h6">
          TABLA ROLES
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon size="small" start class="me-2" @click="updateForm(item)">
          mdi-pencil
        </v-icon>

        <v-icon size="small" start>
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td class="font-weight-bold" :colspan="columns.length">
            <div class="d-flex ga-1 justify-center text-center flex-wrap text-break">
              <div :class="item.permissions.balance_comprobacion ? 'bg-green-lighten-3' : 'bg-error'"
                class="pa-1 border">
                Balance de
                Comprobacion
              </div>

              <div :class="item.permissions.balance_comprobacion ? 'bg-green-lighten-3' : 'bg-error'"
                class="pa-1 border">
                Estados Financieros
              </div>

              <div :class="item.permissions.libro_diario ? 'bg-green-lighten-3' : 'bg-error'" class="pa-1 border">
                Libro Diario
              </div>

              <div :class="item.permissions.libro_mayor ? 'bg-green-lighten-3' : 'bg-error'" class="pa-1 border">
                Libro Mayor
              </div>

              <div :class="item.permissions.export_data ? 'bg-green-lighten-3' : 'bg-error'" class="pa-1 border">
                Exportar Informacion
              </div>

              <div :class="item.permissions.import_data ? 'bg-green-lighten-3' : 'bg-error'" class="pa-1 border">
                Importar Informacación
              </div>
            </div>
          </td>
        </tr>
      </template>

    </v-data-table>

  </v-card>

</template>


<script setup lang="ts">
import type { FindAllRoles } from '@/interface/modulos/roles/GetFindAllRoles.interface';
import type { ReadonlyHeaders } from '@/interface/vuetify/dataTable';
import { ref } from 'vue';
import CRUDRoles from '../PanelControl/cruds/CRUDRoles.vue';
import { useRolesPanelControlStore } from '@/stores/panelControl/roles';
import DialogGeneral from '../dialog/DialogGeneral.vue';
import { formatDateString } from '@/utils/fechas/formatDateString';
import useWaitForDialog from '@/composables/useWaitForDialog';

const store = useRolesPanelControlStore()

const search = ref()
const props = defineProps<{
  tableItems: FindAllRoles[] | undefined
}>();


const headers: ReadonlyHeaders = [
  {
    key: 'name',
    title: 'Nombre'
  },
  {
    key: 'createdAt',
    title: 'creado',
    value: (item) => formatDateString(item.createdAt)
  },
  {
    key: 'description',
    title: 'Descripsión'
  },
  {
    sortable: false,
    key: 'actions',
    title: 'ACCIONES'
  },
  { key: 'data-table-expand' }
]

function reload() {
  store.incrementReload()
  closedNumberDialog.value++
}


const closedNumberDialog = ref(0)
//EDITAR
const dialog = ref<InstanceType<typeof DialogGeneral> | null>(null);
const dialogContenido = ref<InstanceType<typeof CRUDRoles> | null>(null);
const update = ref(false)
async function updateForm(data: FindAllRoles) {

  update.value = true
  if (dialog.value) {
    dialog.value.dialog = true;
  }

  await useWaitForDialog(dialog)

  const { balance_comprobacion, est_financieros, export_data, import_data, libro_diario, libro_mayor, } = data.permissions
  const permissionsData = {
    balance_comprobacion, est_financieros, export_data, import_data, libro_diario, libro_mayor
  }

  if (dialogContenido.value) {
    dialogContenido.value.updateId = data.id
    dialogContenido.value.nombre.value.value = data.name
    dialogContenido.value.description.value.value = data.description;
    dialogContenido.value.permissions = permissionsData;

  }

}

</script>
