import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { getAccountMenuTreeApi } from '@/api/account'

export const useRouteStore = defineStore('routeStore', () => {

  const menuTreeMap = reactive(new Map<string, [] | undefined>())

  const getMenuTree = (accountId: string) => {
    if (!accountId) {
      return undefined
    }
    let menuTrees = menuTreeMap.get(accountId);
    if (!menuTrees) {

      if (!menuTreeMap.has(accountId)) {
        loadAccountMenuTree(accountId)
      }
    }
    return menuTrees
  }

  const loadAccountMenuTree = async (accountId: string) => {

    if (!accountId) {
      return undefined
    }

    try {
      menuTreeMap.set(accountId, undefined);
      const menuTrees = await getAccountMenuTreeApi(accountId);
      if (menuTrees) {
        menuTreeMap.set(accountId, menuTrees);
      }

    } catch (error) {
      console.error(error);
    }
  }


  return { menuTreeMap, getMenuTree }
})
