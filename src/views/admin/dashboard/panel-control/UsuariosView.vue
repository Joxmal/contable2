<template>
  <h2>PANEL</h2>
  <TableDataUsuarios :table-items="dataUsersDB" />

</template>

<script setup lang="ts">
import TableDataUsuarios from '@/components/TableData/TableDataUsuarios.vue';
import AxiosService from '@/services/userServices'
import type { GetONECompanyUser, AuthUser } from '@/interface/company/GetId.interface';
import { ref } from 'vue';
import { onMounted } from 'vue';

onMounted(() => {
  companyDataDB()

})


const dataUsersDB = ref<AuthUser[]>([])


//Obtener datos de los usuarios
async function companyDataDB() {
  try {
    const { data } = await AxiosService.get<GetONECompanyUser>('/company/SUPERADMIN')
    dataUsersDB.value = data.auth_users
    console.log(data)
  } catch (error) {
    console.error(error)
    throw new Error()
  }
}
</script>
