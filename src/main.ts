import './styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'default-passive-events'
import i18n from './languages'
import DictInstall from "./plugins/DictPlugin";

const app = createApp(App)
app.use(DictInstall)
app.use(i18n)
app.use(router)
app.use(ElementPlus)
app.use(createPinia())

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
