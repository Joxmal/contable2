<template>
  <h2>PANEL</h2>

  <VBtn @click="copyToClipboard">copiar token</VBtn>
  <pre>
    {{ usePersistedStore().$state }}
  </pre>

  <FechaInput />
</template>

<script setup lang="ts">
import FechaInput from '@/components/test/FechaInput.vue';
import { usePersistedStore } from '@/stores/persisted';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';

const textToCopy = ref<string | undefined>(undefined);
onMounted(() => {
  textToCopy.value = usePersistedStore().$state.authSession?.token
})

const copyToClipboard = async () => {
  if (textToCopy.value) {
    try {
      await navigator.clipboard.writeText(textToCopy.value);
      console.log('Texto copiado al portapapeles');

      toast.success(`Copiado ${textToCopy.value}`);

    } catch (err) {
      console.error('Error al copiar texto: ', err);
    }
  }
};
</script>
