// src/stores/sessionStore.js
import { defineStore } from 'pinia'
import { usePersistedStore } from './persisted'
import type { Router } from 'vue-router'

export const useSessionStore = defineStore('session', () => {
  function cerrarSesion(router: Router) {
    usePersistedStore().authSession = null
    if (router) {
      return router.push('/') // Usa el router pasado como argumento
    }
  }

  return { cerrarSesion }
})
