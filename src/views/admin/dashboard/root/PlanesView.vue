<template>
  <v-row class="pb-2">
    <v-col cols="12">
      <DialogGeneral :closed-number-dialog="closedNumberDialog" ref="dialog"
        :props_title-dialog="update ? 'Editar PLAN' : 'Crear PLAN'" props_open-btn="CREAR PLAN">
        <template #contenido>
          <CRUDPlanes />
        </template>
      </DialogGeneral>
    </v-col>

    <v-col>
      <v-select label="Informacion del plan" class="mb-4" v-model="planCompanySelect" density="compact"
        :items="storePlanes.dataPlanesDB" item-title="nombre" item-value="id" return-object>
      </v-select>
    </v-col>
  </v-row>


  <v-card elevation="10" class="pa-2" v-if="planCompanySelect">
    <v-card-title class="text-center">
      {{ planCompanySelect.nombre }}
    </v-card-title>
    id: {{ planCompanySelect.id }}
    <v-card-subtitle class="text-h6  opacity-100">
      {{ planCompanySelect.description }}
    </v-card-subtitle>
    <v-divider></v-divider>


    <v-row>
      <v-col cols="12" sm="4" v-for="(permission, key) in planCompanySelect.permissions" :key="key">
        <v-card :color="permission ? 'success' : 'error'" class="text-center" :title="key" width="auto" border />
      </v-col>
    </v-row>






  </v-card>

</template>

<script setup lang="ts">
import DialogGeneral from '@/components/dialog/DialogGeneral.vue';
import CRUDPlanes from '@/components/root/CRUDPlanes.vue';
import { onMounted, ref } from 'vue';
import { useRootPlanesStore, type GetPlanes } from '@/stores/root/rootPlanes';
const storePlanes = useRootPlanesStore()


onMounted(() => {
  storePlanes.getPlanes()
})


const closedNumberDialog = ref(0)


const planCompanySelect = ref<GetPlanes>()

//EDITAR
const dialog = ref<InstanceType<typeof DialogGeneral> | null>(null);
// const dialogContenido = ref<InstanceType<typeof CRUDPlanes> | null>(null);
const update = ref(false)
// const updateId = ref(0)

</script>
