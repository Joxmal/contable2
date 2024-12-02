<!-- src/layouts/DefaultLayout.vue -->
<template>
  <div>
    <header>
      <h1>Header</h1>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <p>Footer</p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';

defineComponent({
  name: 'DefaultLayout',
});
</script>

<style scoped>
/* Estilos para el layout */
header {
  background: #d40d71;
  padding: 1rem;
}

footer {
  background: #0e5aa7;
  padding: 1rem;
}
</style>
