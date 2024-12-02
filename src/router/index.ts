import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AnotherView from '@/views/AnotherView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { loadLayoutMiddleware } from './middleware/loadLayoutMiddleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: 'MainLayout',
      },
    },
    {
      path: '/another_view',
      name: 'Another',
      component: AnotherView,
      meta: {
        layout: 'MainLayout',
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
      meta: {
        layout: 'MainLayout',
      },
    },
  ],
})

router.beforeEach(loadLayoutMiddleware)
export default router
