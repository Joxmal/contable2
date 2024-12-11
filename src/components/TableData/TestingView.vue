<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref } from 'vue'

const groupBy = ref([
  {
    key: 'gluten',
    order: 'asc',
  },
])

const headers = [
  {
    title: 'GRUPO', // Encabezado vacío para el grupo
    align: 'start',
    sortable: true,
    key: 'data-table-group', // Clave para el grupo
    width: '60px', // Ajusta el ancho aquí
  },
  {
    title: 'Dessert (100g serving)',
    align: 'start',
    sortable: false,
    key: 'name',
  },
]

</script>

<template>
  <v-data-table :group-by="groupBy" :headers="headers" item-value="name">
    <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
      <tr>
        <td :colspan="columns.length" class="group-header-cell">
          <VBtn :icon="isGroupOpen(item) ? '$expand' : '$next'" size="small" variant="text" @click="toggleGroup(item)">
          </VBtn>
          {{ item.value ? 'Contains gluten' : 'Gluten free' }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<style scoped>
.group-header-cell {
  width: 20px;
  /* Ajusta el ancho según sea necesario */
}
</style>
