<template>
  <VNavigationDrawer color="" v-model="drawer" expand-on-hover :rail="rail" class="nav" width="270">
    <div v-if="$vuetify.display.lgAndUp" style="position: absolute; top: 5px; right: -20px; z-index: 9999">
      <VBtn @click="rail = !rail" size="small" flat border icon>
        <VIcon :icon="rail ? 'heroicons:chevron-right' : 'heroicons:bars-2'" />
        <VTooltip activator="parent">
          {{ rail ? "Expandir" : "Contraer" }}
        </VTooltip>

      </VBtn>
    </div>

    <!-- Logo & Logged in user -->
    <div class="pt-10 pb-7 bg-background" style="position: sticky; top: 0; z-index: 99">
      <VImg src="/pwa-512x512.png" contain class="mx-auto" :height="rail ? 50 : 70" :width="rail ? 40 : undefined" />
      <VScaleTransition leave-absolute>
        <div v-if="!rail">
          <p class="text-center mt-5 font-weight-semibold">{{ dataUser.authSession?.user.firstName }}</p>
          <p class="text-center text-body-2 text-medium-emphasis mt-1">
            <a href="mailto:joxmal123@gmail.com">{{ dataUser.authSession?.user.roleCompany }}</a>
          </p>
        </div>
      </VScaleTransition>{{
        dataUser.authSession?.user
      }}
    </div>
    <!-- Nav Items -->
    <VList nav>

      <template v-for="(m, i) in menu" :key="i">
        <VListItem v-if="!m.items" link density="default" :to="m.to">
          <template #prepend>
            <VIcon size="22" :icon="m.icon" class="mr-4" />
          </template>
          <VListItemTitle v-text="m.title" class="text-body-2 font-weight-regular" />
        </VListItem>

        <!-- añadir en el comparador || los que no quiero mostrar al los role users -->
        <VListGroup :value="m.title"
          v-if="m.items && !((m.title === 'Crear/Editar' || m.title === 'Administrar') && usePersistedStore().authSession?.user.roleCompany === 'user')">
          <template #activator="{ props }">
            <VListItem v-bind="props" density="comfortable" :to="m.to">
              <template #prepend>
                <VIcon size="22" :icon="m.icon" class="mr-4" />
              </template>
              <VListItemTitle v-text="m.title" class="text-body-2 font-weight-regular" />
            </VListItem>
          </template>

          <div class="border-s ml-5">
            <template v-for="(child, k) in m.items" :key="`child-${k}`">
              <VListItem class="rounded-0" style="padding-inline-start: 26px !important" link color="primary"
                density="compact" :to="child.to">
                <VListItemTitle v-text="child.title" class="text-body-2 font-weight-regular" />
              </VListItem>
            </template>
          </div>
        </VListGroup>
      </template>
      <VListItem @click="() => toggleTheme()" color="primary" density="comfortable">
        <template #prepend>
          <VIcon key="dark" v-if="theme.current.value.dark" size="22" icon="solar:sun-2-line-duotone" class="mr-4" />
          <VIcon key="light" v-else size="22" icon="solar:cloudy-moon-line-duotone" class="mr-4" />
        </template>
        <VListItemTitle v-text="'cambiar tema'" class="text-body-2 font-weight-regular" />
      </VListItem>
    </VList>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
import { useLayoutStore } from "@/stores/layout";
import { usePersistedStore } from "@/stores/persisted";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useTheme } from "vuetify";

const dataUser = usePersistedStore()

const rail = ref(false);

const { drawer } = storeToRefs(useLayoutStore())

const theme = useTheme();
const menu = [
  { title: "Panel", icon: "solar:home-angle-2-line-duotone", to: "/dashboard/panel" },
  {
    title: "LIBRO DIARIO",
    icon: "solar:box-line-duotone",
    items: [
      { title: "Agencia", to: "/dashboard/test" },
      { title: "Tasa Dolar", to: "/dashboard/panel" },
      { title: "Bancas", to: "/admin/dashboard/gestion/banca" },
      { title: "Programas", to: "/admin/dashboard/gestion/programas" },
      { title: "Cajas / Usuarios", to: "/admin/dashboard/gestion/cajas" },
      { title: "Cajeros", to: "/admin/dashboard/gestion/cajeros" },
    ],
  },
  {
    title: "Administrar",
    icon: "wpf:statistics",
    items: [
      { title: "Cierres Diarios", to: "/admin/dashboard/administrar/cierreDiario" },
      { title: "Premios", to: "/admin/dashboard/administrar/premios" },
    ],
  },
  {
    title: "Cierre Diario",
    icon: "solar:users-group-two-rounded-line-duotone",
    items: [
      { title: "Programas", to: "/admin/dashboard/cierreDiario/programas" },
      // { title: "Premios", to: "/admin/dashboard/cierreDiario/premios" },
      // { title: "Boletería", to: "/admin/dashboard" },
      // { title: "Hípico", to: "/admin/dashboard" },
      // { title: "Otros", to: "/admin/dashboard" },
    ],
  },

  { title: "Configuración", icon: "solar:settings-line-duotone" },
];

const themeSelect = localStorage.getItem("grow-theme")

if (themeSelect)
  theme.global.name.value = themeSelect

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  // set theme to local storage
  localStorage.setItem("grow-theme", theme.global.current.value.dark ? "dark" : "light");
};
</script>

<style lang="scss" scoped>
:deep(.v-navigation-drawer__content) {
  &::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: v-bind("theme.current.value.dark ? '#1d2636' : '#e5e5e5'");
    border-radius: 99999px;
  }
}
</style>
