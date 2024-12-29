import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '@/views/NotFoundView.vue'
import { loadLayoutMiddleware } from './middleware/loadLayoutMiddleware'
import LoginView from '@/views/LoginView.vue'
// import authMiddleware from './middleware/authMiddleware'

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
        //panel principal (todos lo ven)
        {
          path: 'panel',
          name: 'DasboardPanelView',
          component: () => import('../views/admin/dashboard/PanelView.vue'),
        },
        //panel de control de la empresa
        {
          path: 'panelControl',
          name: 'panelControlView',
          component: () => import('../views/admin/dashboard/panel-control/RouterView.vue'),
          children: [
            {
              path: 'panelControlUsuarios',
              name: 'DasboardPanelUsuarios',
              component: () => import('../views/admin/dashboard/panel-control/UsuariosView.vue'),
            },
            {
              path: 'panelControlRoles',
              name: 'DasboardPanelRoles',
              component: () => import('../views/admin/dashboard/panel-control/RolesView.vue'),
            },
          ],
        },
        //registro
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
        //reportes
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
            {
              path: 'balance-comprobacion',
              name: 'DasboardReportesBalanceComprobacion',
              component: () =>
                import('../views/admin/dashboard/reportes/BalanceComprobacionView.vue'),
            },
            {
              path: 'balance-general',
              name: 'DasboardReportesBalanceGeneral',
              component: () => import('../views/admin/dashboard/reportes/BalanceGeneralView.vue'),
            },
          ],
        },
        //root
        {
          path: 'root',
          name: 'rootView',
          component: () => import('../views/admin/dashboard/root/IndexView.vue'),
          children: [
            {
              path: 'rootPanel',
              name: 'DasboardRootPanel',
              component: () => import('../views/admin/dashboard/root/PanelRootView.vue.vue'),
            },
            {
              path: 'rootPlanes',
              name: 'DasboardRootPlanes',
              component: () => import('../views/admin/dashboard/root/PlanesView.vue'),
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
// router.beforeEach(authMiddleware)
export default router
