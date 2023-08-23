import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      children: [
        {
          path: '/admin',
          name: 'AdminUser',
          component: () => import('@/views/user/AdminUserManage.vue')
        },
        {
          path: '/menu',
          name: 'Menu',
          component: () => import('@/views/menu/MenuManage.vue')
        },
        {
          path: '/role',
          name: 'Role',
          component: () => import('@/views/role/RoleManage.vue')
        },
        {
          path: '/dict',
          name: 'Dict',
          component: () => import('@/views/dict/DictManage.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue')
    }
  ]
})

export default router
