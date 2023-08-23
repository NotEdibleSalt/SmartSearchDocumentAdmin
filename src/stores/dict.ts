import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { DictI } from '@/types/dict'
import { getDictByTypeApi } from '@/api/dict'

export const useDictStore = defineStore('dictStore', () => {

  const dictMap = reactive(new Map<string, DictI | undefined>())

  const dictData = (type: string) => {
    if (!type) {
      return undefined
    }
    let dict = dictMap.get(type);
    if (!dict) {

      if (!dictMap.has(type)) {
        getDict(type)
      }
    }
    return dict?.items
  }


  const dictDataLabel = (type: string, value: string | number | boolean) => {


    const item = dictData(type)?.find(item => item.value === value)
    return item?.label
  }

  const getDict = async (type: string) => {

    if (!type) {
      return undefined
    }

    try {
      dictMap.set(type, undefined);
      const dict = await getDictByTypeApi(type)
      if (dict) {
        dictMap.set(dict.type, dict);
      }

    } catch (error) {
      console.error(error);
    }

  }




  return { dictMap, dictData, dictDataLabel }
})
