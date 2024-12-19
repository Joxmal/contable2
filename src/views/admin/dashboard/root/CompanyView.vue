<template>

  <v-row class="pb-2">
    <v-col>
      <DialogGeneral :closed-number-dialog="closedNumberDialog" ref="dialog"
        :props_title-dialog="update ? 'Editar Compañia' : 'Crear Compañia'" props_open-btn="CREAR COMPAÑIA">
        <template #contenido>
          <CRUDCompany />
        </template>
      </DialogGeneral>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import DialogGeneral from '@/components/dialog/DialogGeneral.vue';
import CRUDCompany from '@/components/root/CRUDCompany.vue';
import { ref } from 'vue';
const closedNumberDialog = ref(0)



//EDITAR
const dialog = ref<InstanceType<typeof DialogGeneral> | null>(null);
const dialogContenido = ref<InstanceType<typeof CRUDCompany> | null>(null);
const update = ref(false)
const updateId = ref(0)
</script>
