<template>
  <TableDataRoles :table-items="store.findAllRoles" />


</template>

<script setup lang="ts">
import TableDataRoles from '@/components/TableData/TableDataRoles.vue';
import { onMounted, watch } from 'vue';
import { useRolesPanelControlStore } from '@/stores/panelControl/roles';
import { storeToRefs } from 'pinia';

const store = useRolesPanelControlStore()
const { reload } = storeToRefs(store)

watch(reload, () => {
  store.dataRolesDB()
})


onMounted(() => {
  store.dataRolesDB()
})

</script>
