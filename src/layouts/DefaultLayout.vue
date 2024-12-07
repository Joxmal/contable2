<template>
  <div>
    <VApp>
      <!-- Admin Nav Drawer -->
      <FormAdminNav />

      <VAppBar class="px-lg-10" flat border="b">
        <VBtn v-if="$vuetify.display.mdAndDown" size="small" flat border icon @click="drawer = !drawer">
          <VIcon :icon="drawer ? 'heroicons:chevron-right' : 'heroicons:bars-2'" />
        </VBtn>
        <VSpacer />

        <VBtn icon>
          <v-menu class="elevation-0" activator="parent">
            <v-list border rounded="lg" width="180" nav>
              <VListItem>
                <VListItemTitle class="text-body-2 font-weight-semibold">username
                </VListItemTitle>
                <VListItemSubtitle>role</VListItemSubtitle>
              </VListItem>
              <hr class="mb-2 border" />
              <VListItem :value="item" density="compact" v-for="(item, index) in profileMenu" @click-once="item?.action"
                :key="index">

                <VListItemTitle class="text-body-2">
                  {{ item.title }}
                </VListItemTitle>
                <template #append>
                  <VListItemSubtitle v-if="item.shortcut" class="text-caption">{{ item.shortcut }}
                  </VListItemSubtitle>
                </template>
              </VListItem>
            </v-list>
          </v-menu>
          <VAvatar image="https://randomuser.me/api/portraits/med/women/12.jpg" size="38" />
        </VBtn>
      </VAppBar>
      <VMain>
        <v-container>
          <slot />
        </v-container>
      </VMain>
    </VApp>
  </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from "@/stores/layout";
import FormAdminNav from '@/components/form/FormAdminNav.vue'
//import { useTheme } from "vuetify";
//import { usePersistedStore } from "@/stores/persisted";
import { useSessionStore } from "@/stores/session";
//import { storeToRefs } from "pinia";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const sessionStore = useSessionStore();
const router = useRouter();

const profileMenu = [
  { title: "Perfil", shortcut: "⇧⌘P" },
  { title: "Configuración", shortcut: "⇧⌘S" },
  { title: "Tu equipo" },
  {
    title: "Cerrar sesión",
    shortcut: "⇧⌘Q",
    action: () => sessionStore.cerrarSesion(router),
  },
];

// Global drawer state
const { drawer } = storeToRefs(useLayoutStore())



//const { authSession } = storeToRefs(usePersistedStore())
</script>
