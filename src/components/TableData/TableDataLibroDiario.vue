<template>

  <v-card title="Cuentas" border>
    <template v-slot:text>
      <v-text-field placeholder="Buscador" v-model="search" label="Buscar" prepend-inner-icon="mdi-magnify"
        variant="outlined" hide-details single-line>
      </v-text-field>
    </template>

    <v-data-table :row-props="rowProws" class="daTableBorder" :items="items" items-per-page="100" :headers="headers"
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

      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td class="text-blue-darken-1 text-subtitle-1 font-weight-bold text-center py-1" :colspan="columns.length">
            {{ item.descripcion }}
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

      <template v-slot:body.append>

        <tr :class="props.totalItemsSuma.isValid ? 'bg-blue-grey-lighten-3' : 'bg-red-lighten-4'"
          class="text-left  font-weight-bold">
          <td colspan="3" class="border-e-md text-center ">TOTAL</td>
          <td class="border-e-md">{{ financialFixed(props.totalItemsSuma.debe) }}</td>
          <td class="border-e-md">{{ financialFixed(props.totalItemsSuma.haber) }}</td>
          <td></td>
          <td></td>
        </tr>
      </template>

    </v-data-table>
  </v-card>

</template>

<script setup lang="ts">
import type { ReadonlyHeaders, ReadonlyItems, ReadonlyRowProps } from '@/interface/vuetify/dataTable';
import { financialFixed } from '@/utils/fechas/financialFixed';
import { formatDateString } from '@/utils/fechas/formatDateString';
import type { TotalItemsSuma } from '@/views/admin/dashboard/reportes/LibroDiarioView.vue';
import { ref } from 'vue';



const props = defineProps<{
  items: ReadonlyItems
  totalItemsSuma: TotalItemsSuma
}>();
function rowProws(item: any): ReadonlyRowProps {
  if (item.item.asiento % 2 === 0) {
    return { class: 'bg-blue-grey-lighten-4' }
  }

}

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
    value: (item) => (formatDateString(item.fecha))
  },
  {
    key: 'cuentaId',
    title: 'Cuenta',
    cellProps: (item) => {
      if (!item.item.cuentaName) {
        return {
          class: 'bg-red-lighten-4',
        }
      } else {
        return {
          class: '',
        }
      }
    },
    value(item) {
      if (!item.cuentaName) {
        return `el codigo ${item.cuentaId} no esta asociado`
      }
      return item.cuentaName + `( ${item.cuentaId})`
    },
  },
  {
    key: 'debe',
    title: 'Debe',
    value: ({ debe }) => financialFixed(debe)
  },
  {
    key: 'haber',
    title: 'Haber',
    value: ({ haber }) => financialFixed(haber)
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
