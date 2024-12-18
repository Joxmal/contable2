<template>
  inicio

  <v-btn color="success" @click="getLibroDiario">text</v-btn>

  <pre>
    {{ dataraw }}
  </pre>
</template>

<script setup lang="ts">
import AxiosService from '@/services/userServices'
import { ref } from 'vue';

const dataraw = ref()

async function getLibroDiario() {
  try {
    const { data } = await AxiosService.get('/company')
    dataraw.value = data
  } catch (error) {
    console.error(error)
    throw new Error()
  }
}




</script>
