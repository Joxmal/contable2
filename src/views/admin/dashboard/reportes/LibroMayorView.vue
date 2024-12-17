<template>
  <FechaInput @date="fechaRaw = $event"></FechaInput>

  <v-card title="cuentas T">

    <div class="d-flex flex-wrap ga-2">
      <v-card width="800" v-for="n in 40" :key="n" :title="n" color="red">


      </v-card>
    </div>


  </v-card>

</template>

<script setup lang="ts">
import FechaInput from '@/components/test/FechaInput.vue';
import { ref } from 'vue';

const fechaRaw = ref()

</script>
