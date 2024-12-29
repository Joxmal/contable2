<template>
  <h2 class="text-center">PANEL DE USUARIOS</h2>
  <TableDataUsuarios @alterUser="alternarUsuario" :table-items="store.dataUsersDB" />

</template>

<script setup lang="ts">
import TableDataUsuarios from '@/components/TableData/TableDataUsuarios.vue';
import { watch } from 'vue';
import { onMounted } from 'vue';
import { useUsersPanelControlStore } from '@/stores/panelControl/users';
import { storeToRefs } from 'pinia';

const store = useUsersPanelControlStore()
const { reload } = storeToRefs(store)

onMounted(() => {
  store.usersDataDB()
})

watch(reload, () => {
  store.usersDataDB()
})

async function alternarUsuario(id: number) {
  await store.AlterUsersDataDB(id)
  store.reload++
}


</script>
