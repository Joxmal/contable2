// src/middleware/authMiddleware.ts
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { usePersistedStore } from '@/stores/persisted'

export default function authMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const store = usePersistedStore() // Accede al store de Pinia
  const requireAuth = to.meta.requireAuth as boolean

  console.log('Auth Middleware:', {
    authSession: store.authSession,
    requireAuth,
  })

  if (requireAuth && !store.authSession) {
    console.log('Redirigiendo a login')
    next({ name: 'loginView' }) // Redirige a la vista de login si no está autenticado
  } else if (to.name === 'loginView' && store.authSession && !requireAuth) {
    next({ name: 'dashboardView' }) // Redirige a dashboardView
  } else {
    next() // Permite el acceso a la ruta
  }
}
