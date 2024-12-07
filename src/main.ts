import { h } from 'vue'
import { Icon } from '@iconify/vue'
import { es, en } from 'vuetify/locale'

import { aliases, mdi } from 'vuetify/iconsets/mdi'
import type { IconSet, ThemeDefinition, IconProps } from 'vuetify'
import 'vuetify/styles'
import { createVuetify } from 'vuetify' // Importar Vuetify
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import App from './App.vue'
import router from './router'

// Función para crear un conjunto de iconos utilizando Iconify
/* const iconify = (set: string) => ({
  component: (props: IconProps) => h(Icon, { icon: `${set}:${props.icon}`, disabled: props.disabled }),
}); */
// Custom icons
const custom: IconSet = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  component: (props: IconProps) => h(Icon, { icon: props.icon, ...props }),
}

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    primary: '#1867C0',
    'primary-darken-1': '#1F5592',
    secondary: '#48A9A6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  variables: {
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.6,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000',
  },
}

const light: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#6366f1',
    error: '#ef4444',
    'on-background': '#0f172a',
    'on-surface': '#0f172a',
    gray: '#64748b',
    'primary-btn': '#0f172a',
  },
  variables: {
    'border-color': '#e2e8f0',
    'border-opacity': 1,
  },
}

const dark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#6366f1',
    background: '#0B0E15',
    surface: '#0B0E15',
    'on-background': '#f8fafc',
    'on-surface': '#f8fafc',
    gray: '#94a3b8',
    'primary-btn': '#f1f5f9',
  },
  variables: {
    'border-color': '#1e293b',
    'border-opacity': 1,
  },
}

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'custom',
    aliases,
    sets: {
      mdi,
      custom,
    },
  },
  locale: {
    locale: 'es',
    fallback: 'en',
    messages: { en, es },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light,
      dark,
      myCustomLightTheme,
    },
  },
  display: {
    mobileBreakpoint: 'lg',
    thresholds: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
  aliases: {
    PrimaryBtn: components.VBtn,
  },
  defaults: {
    VTextField: {
      color: 'primary',
      variant: 'outlined',
      density: 'compact',
    },
    PrimaryBtn: {
      color: 'primary-btn',
      minHeight: '43px',
      flat: true,
      style: 'border-radius: 6px; font-size: 14px;',
      class: 'font-weight-semibold',
    },
  },
})

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
