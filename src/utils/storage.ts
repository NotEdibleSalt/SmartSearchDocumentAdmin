import { sm4Util } from './sm/index'

interface StorageData<T> {
  value: T
  expire: number | null
}
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7


export const setLocalStorage = <T>(key: string, value: T, expire: number | null = DEFAULT_CACHE_TIME) => {
  try {
    const storageData: StorageData<T> = {
      value,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null
    }
    let storageDataJson = JSON.stringify(storageData)
    const encryptData = sm4Util.encryptCBC(storageDataJson)

    const encryptKey = sm4Util.encryptCBC(key);
    window.localStorage.setItem(encryptKey, encryptData)
  } catch (error) {
    return false
  }
}


export const getLocalStorage = <T>(key: string): T | null => {

  try {
    const encryptKey = sm4Util.encryptCBC(key);
    const json = window.localStorage.getItem(encryptKey)
    if (json) {
      let storageData: StorageData<T> | null = null
      try {
        let decryptData = sm4Util.decryptCBC(json)
        storageData = JSON.parse(decryptData)
      } catch {
        // 防止解析失败
      }
      if (storageData) {
        const { value, expire } = storageData
        // 在有效期内直接返回
        if (expire === null || expire >= Date.now()) {
          return value as T
        }
      }
      removeLocalStorage(key)
    }
  } catch (err) {
    return null;
  }
  return null;
}

export const removeLocalStorage = (key: string) => {

  const encryptKey = sm4Util.encryptCBC(key);
  window.localStorage.removeItem(encryptKey)
}

export const clearLocalStorage = () => {
  window.localStorage.clear()
}