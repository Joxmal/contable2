<template>
  <v-row class="pb-2">
    <v-col>
      <DialogGeneral :closed-number-dialog="closedNumberDialog" persistent @close="update = false" ref="dialog"
        :props_title-dialog="update ? 'Editar Usuario' : 'Crear Usuario'" props_open-btn="CREAR Usuario">
        <template #contenido>
          <CRUDUsers ref="dialogContenido" />
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
    <v-data-table :row-props="rowProws" :search="search" density="compact" :headers="headers" :items="props.tableItems">
      <template #top>
        <div class="text-center  bg-blue-grey-lighten-3 font-weight-bold text-h6">
          TABLA USUARIOS
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon size="small" start class="me-2" @click="$emit('editar', item)">
          mdi-pencil
        </v-icon>

        <v-icon v-if="!(item.primaryRole === 'SuperAdmin' || item.primaryRole === 'root')" size="small" start
          @click="$emit('eliminar', item.id)">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td class="text-primary" :colspan="columns.length">

            Descripcción: {{ item.description ? item.description : null }}
            <v-divider />
            Correo: {{ item.email }}
            <v-divider />
            Ultima sesión: {{ item.last_login }}
          </td>
        </tr>
      </template>

    </v-data-table>
    <hr>

  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { AuthUser } from '@/interface/company/GetId.interface';
import type { ReadonlyHeaders, ReadonlyItems, ReadonlyRowProps } from '@/interface/vuetify/dataTable';
import CRUDUsers from '../PanelControl/cruds/CRUDUsers.vue';
import DialogGeneral from '../dialog/DialogGeneral.vue';


const closedNumberDialog = ref(0)


const search = ref()

const props = defineProps<{
  tableItems: ReadonlyItems
}>();


onMounted(() => {
})

//EDITAR
const dialog = ref<InstanceType<typeof DialogGeneral> | null>(null);
// const dialogContenido = ref<InstanceType<typeof CRUDCompany> | null>(null);
const update = ref(false)
// const updateId = ref(0)

const headers: ReadonlyHeaders = [
  {
    key: 'username',
    title: 'Usuario'
  },
  {
    key: 'password',
    title: 'Contraseña'
  },
  {
    key: 'role.name',
    title: 'ROLE'
  },
  {
    key: 'first_name',
    title: 'Primer N'
  },
  {
    key: 'second_name',
    title: 'Segundo N'
  },
  {
    sortable: false,
    key: 'actions',
    title: 'ACCIONES'
  },
  {
    key: 'data-table-expand',
    title: '',
  },
]

function rowProws({ item, index }: { item: AuthUser; index: number }): ReadonlyRowProps {
  // Mapeo de roles a clases CSS
  const roleClassMap: Record<string, string> = {
    'SuperAdmin': 'bg-green-lighten-3',
    'root': 'bg-yellow-lighten-2'
  };

  // Verificar si el usuario está activo
  if (!item.is_active) {
    return { class: 'bg-red-lighten-3' };
  }

  // Verificar rol y devolver clase correspondiente
  const roleClass = roleClassMap[item.primaryRole];
  if (roleClass) {
    return { class: roleClass };
  }

  // Alternar color de fondo para filas pares
  if (index % 2 === 0) {
    return { class: 'bg-blue-grey-lighten-4' };
  }

  // Retorno por defecto si no se cumplen otras condiciones
  return { class: 'default-class' }; // Puedes cambiar 'default-class' por una clase que desees usar por defecto
}

</script>
