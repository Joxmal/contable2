import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '@/views/NotFoundView.vue'
import { loadLayoutMiddleware } from './middleware/loadLayoutMiddleware'
import LoginView from '@/views/LoginView.vue'
import authMiddleware from './middleware/authMiddleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'loginView',
      component: LoginView,
      meta: {
        layout: 'BlanckLayout',
        requireAuth: false,
      },
    },
    {
      path: '/dashboard',
      name: 'dashboardView',
      component: () => import('../views/admin/dashboard/IndexView.vue'),
      children: [
        {
          path: 'panel',
          name: 'DasboardPanelView',
          component: () => import('../views/admin/dashboard/PanelView.vue'),
        },
        {
          path: 'registro',
          name: 'registrosView',
          component: () => import('../views/admin/dashboard/registros/RouterView.vue'),
          children: [
            {
              path: 'cuentasContables',
              name: 'DasboardCuentasContables',
              component: () =>
                import('../views/admin/dashboard/registros/CuentasContablesView.vue'),
            },
          ],
        },

        {
          path: 'reportes',
          name: 'reportesView',
          component: () => import('../views/admin/dashboard/reportes/RouterView.vue'),
          children: [
            {
              path: 'libroDiario',
              name: 'DasboardReportesLibroDiario',
              component: () => import('../views/admin/dashboard/reportes/LibroDiarioView.vue'),
            },
            {
              path: 'libroMayor',
              name: 'DasboardReportesLibroMayor',
              component: () => import('../views/admin/dashboard/reportes/LibroMayorView.vue'),
            },
          ],
        },
      ],
      meta: {
        layout: 'DefaultLayout',
        requireAuth: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
    },
  ],
})

// Middleware para cargar el layout
router.beforeEach(loadLayoutMiddleware)

// Middleware global para manejar la autenticación
router.beforeEach(authMiddleware)
export default router
