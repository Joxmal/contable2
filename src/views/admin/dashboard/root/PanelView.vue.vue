<template>
  <v-card class="mx-auto" title="Compañias creadas">
    <template v-slot:prepend>
      <v-avatar color="blue-darken-2">
        <v-icon icon="mdi-domain"></v-icon>
      </v-avatar>
    </template>

    <v-card-text class="text-h4 text-center">{{ dataraw?.length }}</v-card-text>
  </v-card>
  <v-card border class="my-2" title="Seleccion de Empresa">
    <v-select density="compact" v-model="selectCOmpany" :items="dataraw" item-value="id"
      item-title="data_company.nameCompany" return-object></v-select>


    <v-card v-if="selectCOmpany" border title="Datos">
      <template #text>
        <VList density="compact" class="opacity-100 text-center">

          <v-list-item density="compact" title="llave secreta de la compañia">
            {{ selectCOmpany?.authKeyCompany }}
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item density="compact" title="Fecha de creacion"
            :id="`${selectCOmpany.id} ${selectCOmpany?.createdAt}`">
            {{ formatDateString(selectCOmpany?.createdAt) }}
          </v-list-item>
          <v-divider></v-divider>

          <v-list-item title="Cantidad de usuarios">
            {{ selectCOmpany?._count.auth_users }}
          </v-list-item>
          <v-divider></v-divider>

          <v-list-item title="Total de roles creados">
            {{ selectCOmpany?._count.roles }}
          </v-list-item>
          <v-divider></v-divider>

          <v-list-item title="Cuentas Contables creadas">
            {{ selectCOmpany?._count.Cuenta_contables }}
          </v-list-item>
          <v-divider></v-divider>

          <v-list-item title="Total de transsioneses del libro diario">
            {{ selectCOmpany?._count.Libro_Diario }}
          </v-list-item>

        </VList>
      </template>





      <template #actions>
        <VBtn color="primary" variant="flat">Panel de usuarios</VBtn>
      </template>

    </v-card>

  </v-card>
  <v-card class="mx-auto">
    <div class="d-flex ga-2 flex-wrap">
      <template v-if="dataCompanySelectChartPie">
        <apexchart type="donut" :options="dataCompanySelectChartPie?.options"
          :series="dataCompanySelectChartPie?.series"></apexchart>
      </template>

    </div>
  </v-card>

</template>

<script setup lang="ts">
import type { GetCompanyDB } from '@/interface/root/company/company.interface';
import AxiosService from '@/services/userServices'
import { formatDateString } from '@/utils/fechas/formatDateString';



import { computed, onMounted, ref } from 'vue';

const dataraw = ref<GetCompanyDB[]>()
const selectCOmpany = ref<GetCompanyDB>()
const dataCompanySelectChartPie = computed(() => {



  if (!selectCOmpany.value) {
    return null
  }

  console.log(selectCOmpany.value)
  const nameRoles = selectCOmpany.value.roles.map((role) => role.name)
  const cantidadDeUsuarioPorRole = selectCOmpany.value.roles.map(role => role.auth_users.map(value => value).length)

  if (nameRoles.length === 0 || cantidadDeUsuarioPorRole.length === 0) {
    return null
  }
  return {
    options: {
      title: {
        text: `Roles de la compañia (${nameRoles.length})`
      },
      labels: nameRoles,
      dataLabels: {
        enabled: true // Habilita las etiquetas de datos
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 180
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
    },
    series: cantidadDeUsuarioPorRole,
  }
})

async function getLibroDiario() {
  try {
    const { data } = await AxiosService.get<GetCompanyDB[]>('/company')
    dataraw.value = data
    console.log(data)
  } catch (error) {
    console.error(error)
    throw new Error()
  }
}

onMounted(() => {
  getLibroDiario()
})

// interfaces




</script>
