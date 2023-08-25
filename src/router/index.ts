import { getAccountMenuTreeApi } from '@/api/account'
import type { IMenuTree } from '@/types/globle'
import { getLocalStorage } from '@/utils/storage'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue')
    }
  ]
})


let isAddRoutes = false
router.beforeEach(async (to, from) => {
  if (!isAddRoutes) {
    isAddRoutes = true
    const token = getLocalStorage<TokenI>('token')
    if (!token) {
      return false
    }
    const menuTrees: IMenuTree[] = await getAccountMenuTreeApi(token.loginId);
    if (menuTrees) {
      menuTrees.forEach((route) => {
        addRoute(route, 'home')
      })
    }
    // 返回to.fullPath，当添加完所有的动态路由后，触发重定向
    return to.fullPath
  }
  return true
})

const modules = import.meta.glob('@/views/*/*.vue')
const addRoute = (menuTree: IMenuTree, parentName: string) => {
  const filePath = menuTree.path.replace('@', '/src')
  if (menuTree.path && menuTree.routePath) {
    let routeRaw = {
      path: menuTree.routePath,
      name: menuTree.routeName,
      component: modules[`${filePath}`]
    }
    router.addRoute(parentName, routeRaw)
  }

  if (menuTree.children) {
    menuTree.children.forEach((item) => {
      addRoute(item, parentName)
    })
  }
}

export default router
