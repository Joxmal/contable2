<template>

  <v-card title="Cuentas" border>
    <template v-slot:text>
      <v-text-field placeholder="Buscador" v-model="search" label="Buscar" prepend-inner-icon="mdi-magnify"
        variant="outlined" hide-details single-line>
      </v-text-field>
    </template>

    <v-data-table :items="items" items-per-page="100" :group-by="groupBy" :headers="headers" multi-sort
      density="compact" :search="search">
      <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
        <tr>
          <td :colspan="columns.length">
            <VBtn :icon="isGroupOpen(item) ? '$expand' : '$next'" size="small" variant="text"
              @click="toggleGroup(item)">
            </VBtn>
            {{ item.value }}({{ item.items.length }})
          </td>
        </tr>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" start class="me-2" @click="$emit('editar', item)">
          mdi-pencil
        </v-icon>

        <v-icon size="small" start @click="$emit('eliminar', item.id)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>

</template>

<script setup lang="ts">
import type { ReadonlyHeaders, ReadonlyItems, ReadOnlySortItem } from '@/interface/vuetify/dataTable';
import { ref } from 'vue';

defineProps<{
  items: ReadonlyItems
}>();




const headers: ReadonlyHeaders = [
  {
    title: '', // Encabezado vacío para el grupo
    align: 'start',
    sortable: false,
    key: 'data-table-group', // Clave para el grupo
    width: '0px', // Ajusta el ancho aquí,
  },
  {
    title: 'Codigo',
    align: 'start',
    sortable: false,
    key: 'codigo',
    value: (item: { codigo: string | number }) => String(item.codigo).split('').join('-'),
  },
  {
    key: 'nombre',
    title: 'Nombre',
  },
  {
    key: 'description',
    title: 'Decripsión',
  },
  {
    key: 'actions',
    title: 'Acciones',
    width: 100
  },
]

const search = ref("");

const groupBy: ReadOnlySortItem = [
  {
    key: 'Cuenta_contable_tipoId',
    order: 'asc'
  }
]


</script>
