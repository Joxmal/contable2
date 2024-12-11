<!-- src/App.vue -->
<template>
  <component :is="route.meta.layoutComponent">
    <router-view />
    <!-- {{ x }}- {{ y }} -->
  </component>



  <!--
  <DefaultLayout>
    <RouterView></RouterView>
  </DefaultLayout> -->
</template>

<script lang="ts" setup>



import { useRoute } from 'vue-router';
// import { useMouse } from './composables/useMouse';
import { onMounted, ref, defineAsyncComponent } from 'vue';

// const { x, y } = useMouse()
const route = useRoute();
const layout = ref<null | any>(null); // Inicializa como null

const layoutComponent2 = ref<any>(null);

onMounted(async () => {
  layoutComponent2.value = defineAsyncComponent(() => import(`./layouts/${route.meta.layout}.vue`))
  const layoutName: string = (route.meta as { layout?: string }).layout || 'DefaultLayout';
  try {
    const layoutComponent = defineAsyncComponent(() => import(`./layouts/${layoutName}.vue`))
    layout.value = layoutComponent; // Asigna el componente cargado
    console.log(layout.value)
  } catch (error) {
    console.error('Error loading layout:', error);
    console.log(layout.value)
    // Manejo de errores: puedes asignar un layout por defecto aquí si lo deseas
    const defaultLayout = defineAsyncComponent(() => import('./layouts/DefaultLayout.vue'))
    layout.value = defaultLayout;
  }
});
</script>
