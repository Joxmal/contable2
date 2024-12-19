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
          <p class="text-center mt-5 font-weight-semibold">{{ dataUser.authSession?.user?.firstName || '' }}</p>
          <p class="text-center text-body-2 text-medium-emphasis mt-1">
            <a href="mailto:joxmal123@gmail.com">{{ dataUser.authSession?.user?.roleCompany.name }}</a>
          </p>
        </div>
      </VScaleTransition>
    </div>
    <!-- Nav Items -->
    <VList nav>
      <template v-for="(m, i) in menu" :key="`${i}-${m}`">
        <VListItem :active="activeItem === m.name" @click="toView(m.name as string)" v-if="!m.items" link
          density="default">
          <template #prepend>
            <VIcon size="22" :icon="m.icon" class="mr-4" />
          </template>
          <VListItemTitle v-text="m.title" class="text-body-2 font-weight-regular" />
        </VListItem>

        <!-- añadir en el comparador || los que no quiero mostrar al los role users -->
        <VListGroup :value="m.title"
          v-if="m.items && !((m.title === 'Registros' || m.title === 'Administrar') && usePersistedStore().authSession?.user?.rolePrimary === 'Super Usuario')">
          <template #activator="{ props }">
            <VListItem v-bind="props" density="comfortable">
              <template #prepend>
                <VIcon size="22" :icon="m.icon" class="mr-4" />
              </template>
              <VListItemTitle v-text="m.title" class="text-body-2 font-weight-regular" />
            </VListItem>
          </template>

          <div class="border-s ml-5">
            <template v-for="(child, index) in m.items" :key="`${index}+${child.title}`">
              <VListItem :active="activeItem === child.name" @click="toView(child.name)" class="rounded-0"
                style="padding-inline-start: 26px !important" link color="primary" density="compact" :toView="''">
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

      <!-- //solo para los root--------------------------------------- -->

      <template v-if="usePersistedStore().authSession?.user.rolePrimary === 'root'">
        <template v-for="(m, i) in menuRoot" :key="`${i}-${m}`">
          <!-- añadir en el comparador || los que no quiero mostrar al los role users -->
          <VListGroup :value="m.title"
            v-if="m.items && !((m.title === 'Registros' || m.title === 'Administrar') && usePersistedStore().authSession?.user?.rolePrimary === 'Super Usuario')">
            <template #activator="{ props }">
              <VListItem v-bind="props" density="comfortable">
                <template #prepend>
                  <VIcon size="22" :icon="m.icon" class="mr-4" />
                </template>
                <VListItemTitle v-text="m.title" class="text-body-2 font-weight-regular" />
              </VListItem>
            </template>

            <div class="border-s ml-5">
              <template v-for="(child, index) in m.items" :key="`${index}+${child.title}`">
                <VListItem :active="activeItem === child.name" @click="toView(child.name)" class="rounded-0"
                  style="padding-inline-start: 26px !important" link color="primary" density="compact" :toView="''">
                  <VListItemTitle v-text="child.title" class="text-body-2 font-weight-regular" />
                </VListItem>
              </template>
            </div>
          </VListGroup>
        </template>
      </template>


      <!-- //--------------------------- -->
    </VList>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
import { useLayoutStore } from "@/stores/layout";
import { usePersistedStore } from "@/stores/persisted";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useTheme } from "vuetify";
import { useRouter } from "vue-router";

const dataUser = usePersistedStore()

const rail = ref(false);
const router = useRouter()
const activeItem = ref('')
const toView = (name: string) => {
  activeItem.value = name
  router.push({ name: name })
}

const { drawer } = storeToRefs(useLayoutStore())
const theme = useTheme();
const menu = [
  { title: "Panel", icon: "solar:home-angle-2-line-duotone", name: 'DasboardPanelView' },
  {
    title: "Registros",
    icon: "solar:box-line-duotone",
    items: [
      { title: "Cuentas Contables", name: 'DasboardCuentasContables' },
    ],
  },
  {
    title: "Reportes",
    icon: "wpf:statistics",
    items: [
      { title: "Libro Diario", name: 'DasboardReportesLibroDiario' },
      { title: "Libro Mayor", name: 'DasboardReportesLibroMayor' },
    ],
  },

  { title: "Configuración", icon: "solar:settings-line-duotone" },
];

const menuRoot = [
  {
    title: "ROOT",
    icon: "dashicons:admin-network",
    items: [
      { title: "PANEL", name: 'DasboardRootPanel' },
      { title: "COMPAÑIAS", name: 'DasboardRootCompany' },
    ],
  },
]

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
