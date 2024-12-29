<template>
  <v-row class="pb-2">
    <v-col>
      <DialogGeneral :closed-number-dialog="closedNumberDialog" persistent @close="update = false" ref="dialog"
        :props_title-dialog="update ? 'Editar Usuario' : 'Crear Usuario'" props_open-btn="CREAR Usuario">
        <template #contenido>
          <CRUDUsers :update="update" @created="reload" ref="dialogContenido" />
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
        <v-icon size="small" start @click="updateForm(item)">
          mdi-pencil
        </v-icon>

        <v-icon v-if="!(item.primaryRole === 'SuperAdmin' || item.primaryRole === 'root')" size="small" end
          @click="$emit('alterUser', item.id)">
          mdi-account-reactivate
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
import type { AuthUser } from '@/interface/modulos/company/GetId.interface';
import type { ReadonlyHeaders, ReadonlyRowProps } from '@/interface/vuetify/dataTable';
import CRUDUsers from '../PanelControl/cruds/CRUDUsers.vue';
import DialogGeneral from '../dialog/DialogGeneral.vue';
import { useUsersPanelControlStore } from '@/stores/panelControl/users';
import useWaitForDialog from '@/composables/useWaitForDialog';
import { toast } from 'vue3-toastify';

const store = useUsersPanelControlStore()

defineEmits(['alterUser'])

const closedNumberDialog = ref(0)

const search = ref()

const props = defineProps<{
  tableItems: AuthUser[] | undefined
}>();

function reload() {
  store.incrementReload()
  closedNumberDialog.value++
}


onMounted(() => {
})

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



//EDITAR
const dialog = ref<InstanceType<typeof DialogGeneral> | null>(null);
const dialogContenido = ref<InstanceType<typeof CRUDUsers> | null>(null);
const update = ref(false)

async function updateForm(data: AuthUser) {

  if (!data.is_active) {
    toast.warning('El usuario esta desactivado')
    return
  }

  update.value = true
  if (dialog.value) {
    dialog.value.dialog = true;
  }

  await useWaitForDialog(dialog)


  if (dialogContenido.value) {
    dialogContenido.value.updateId = data.id
    dialogContenido.value.nameUser.value.value = data.username;
    dialogContenido.value.passwordUser.value.value = data.password;
    dialogContenido.value.roleId.value.value = data.roleId;
    dialogContenido.value.firtsName.value.value = data.first_name;
    dialogContenido.value.lastName.value.value = data.second_name;
    dialogContenido.value.description.value.value = data.description;
  }
}


// const updateId = ref(0)


</script>
