<template>
  <v-card>

    <template #text>
      <v-text-field placeholder="Buscador" v-model="search" label="Buscar" prepend-inner-icon="mdi-magnify"
        variant="outlined" hide-details single-line>
      </v-text-field>
    </template>

    <v-data-table hover density="compact" :search="search" :row-props="props.rowProps" :loading="table_loading"
      :headers="table_headers" :items="table_items" :show-expand="showExpand" :expand-on-click="showExpand"
      fixed-header>
      <template v-slot:item.actions="{ item }">
        <v-icon v-if="!props.disableOptionsShow?.iconEdit" size="small" start class="me-2"
          @click="$emit('editar', item)">
          mdi-pencil
        </v-icon>

        <v-icon v-if="!props.disableOptionsShow?.iconDelete" size="small" start @click="$emit('eliminar', item.id)">
          mdi-delete
        </v-icon>

        <v-btn :class="extraAction1?.class" size="small" v-if="props.extraAction1" color="secondary"
          :icon="props.extraAction1?.icon" variant="outlined" @click="$emit(`extraAction1`, item)"></v-btn>

      </template>

      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td class="text-primary" :colspan="columns.length">
            {{ item.description ? item.description : null }}


          </td>
        </tr>
      </template>

      <template v-slot:top>
        <div class="text-center  bg-blue-grey-lighten-3 font-weight-bold text-h6">
          {{ props.table_title }}
        </div>
      </template>

    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import type { ReadonlyHeaders, ReadonlyItems, ReadonlyRowProps } from '@/interface/vuetify/dataTable';
import { ref } from 'vue';



interface extraActions {
  icon: string
  class?: object
}

interface DisableOptionsShow {
  iconEdit?: boolean
  iconDelete?: boolean
}

const props = defineProps<{
  disableOptionsShow?: DisableOptionsShow
  table_title?: string;
  table_loading?: boolean;
  table_headers?: ReadonlyHeaders;
  table_items: ReadonlyItems;
  props_titleDialog?: string;
  props_prepend_icon?: string;
  extraAction1?: extraActions
  showExpand?: boolean
  rowProps?: ReadonlyRowProps
}>();



const search = ref("");

</script>
