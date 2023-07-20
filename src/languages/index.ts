import { createI18n } from 'vue-i18n'

import zhCh from './modules/zh'
import en from './modules/en'
import { getBrowserLang } from '@/utils/lang'

const i18n = createI18n({
  allowComposition: true,
  legacy: false,
  locale: getBrowserLang(),
  messages: {
    'zh-cn': zhCh,
    en: en
  },
  globalInjection: true
})

export default i18n
