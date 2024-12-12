<template>

  <v-card title="Cuentas" border>
    <template v-slot:text>
      <v-text-field placeholder="Buscador" v-model="search" label="Buscar" prepend-inner-icon="mdi-magnify"
        variant="outlined" hide-details single-line>
      </v-text-field>
    </template>

    <v-data-table class="daTableBorder" :items="items" items-per-page="100" :headers="headers" density="compact"
      :search="search">
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

      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td class="text-blue-darken-1 text-subtitle-1 font-weight-bold text-center py-1" :colspan="columns.length">
            {{ item.description }}
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
import type { ReadonlyHeaders, ReadonlyItems } from '@/interface/vuetify/dataTable';
import { ref } from 'vue';

defineProps<{
  items: ReadonlyItems
}>();

const headers: ReadonlyHeaders = [
  {
    title: 'Asiento',
    align: 'start',
    sortable: true,
    key: 'asiento',
    width: 80,
    cellProps: () => {
      return {
        class: 'text-center'
      }
    }
  },
  {
    key: 'fecha',
    title: 'Fecha',
  },
  {
    key: 'cuentaId',
    title: 'Cuenta',
  },
  {
    key: 'debe',
    title: 'Debe',
  },
  {
    key: 'haber',
    title: 'Haber',
  },
  {
    key: 'actions',
    title: 'Acciones',
    width: 90,
    sortable: false
  },
  { title: "", key: "data-table-expand" },
]

const search = ref("");

</script>
