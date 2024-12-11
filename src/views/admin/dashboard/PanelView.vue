<template>
  <h2>PANEL</h2>

  <VBtn @click="notify">hola</VBtn>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';


const notify = () => {
  toast("ERROR AL INICIAR SESIÓN", {
    type: toast.TYPE.ERROR,
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT
  });
}
</script>
