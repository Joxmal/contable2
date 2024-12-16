<template>
  <h1>EXCEL</h1>
  <v-file-input label="Coloque un archivo de excel" @click:clear="deleteExcel" @change="subirExcel"></v-file-input>
</template>


<script setup lang="ts">
import readXlsxFile from 'read-excel-file';
import { ref } from 'vue';

const emit = defineEmits<{
  // <eventName>: <expected arguments>
  itemsRaw: [value: any] // named tuple syntax
  deleteItem: [value: boolean]
}>()

const items = ref<any>()
function subirExcel(event: Event) {
  // Obtener el input del evento
  const target = event.target as HTMLInputElement;

  if (target.value && target.files && target.files.length > 0) {
    readXlsxFile(target.files[0]).then((rows) => {
      items.value = rows
      emit('itemsRaw', rows)
    }).catch((error) => {
      console.error("Error al leer el archivo Excel:", error);
    });
  } else {
    console.error("No se ha seleccionado ningún archivo.");
  }
}

function deleteExcel() {
  emit('deleteItem', true)
}
</script>
