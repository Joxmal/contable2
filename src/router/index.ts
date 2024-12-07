import { createRouter, createWebHistory } from 'vue-router'

import AnotherView from '@/views/AnotherView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { loadLayoutMiddleware } from './middleware/loadLayoutMiddleware'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'loginView',
      component: LoginView,
      meta: {
        layout: 'BlanckLayout',
      },
    },
    {
      path: '/dashboard',
      name: 'dashboardView',
      component: () => import('../views/admin/dashboard/IndexView.vue'),
      children: [
        {
          path: 'panel',
          name: 'panelView',
          component: () => import('../views/admin/dashboard/PanelView.vue'),
        },
        {
          path: 'test',
          name: 'TestView',
          component: () => import('../views/admin/dashboard/PruebaView.vue'),
        },
      ],
      meta: {
        layout: 'DefaultLayout',
      },
    },

    {
      path: '/another_view',
      name: 'Another',
      component: AnotherView,
      meta: {
        layout: 'DefaultLayout',
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        layout: 'MainLayout',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
    },
  ],
})

router.beforeEach(loadLayoutMiddleware)
export default router
