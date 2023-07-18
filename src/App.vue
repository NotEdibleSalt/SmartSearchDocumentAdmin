<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import { useViewConfigStore } from '@/stores/locale'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const i18n = useI18n()
const viewConfigStore = useViewConfigStore()
const locale = computed(() => {
  i18n.locale.value = viewConfigStore.viewConfig.language
  if ('en' === viewConfigStore.viewConfig.language) {
    return en
  }
  return zhCn
})
</script>

<style scoped></style>
