import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { SelectOptionI } from '@/types/globle'
import { getBrowserLang } from '@/utils'

export const useViewConfigStore = defineStore('viewConfig', () => {
  const viewConfig = reactive({
    language: getBrowserLang(),
    isDark: false
  })

  function getLanguageOptions(): SelectOptionI[] {
    return [
      { value: 'zh-cn', label: '简体中文' },
      { value: 'en', label: 'English' }
    ]
  }

  return { viewConfig, getLanguageOptions }
})
