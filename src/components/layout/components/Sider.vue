<template>
  <div class="sider-title">{{ $t('sider.title') }}</div>
  <el-menu :router="true">
    <SiderItem v-for="route in routers" :menuInfo="route" :key="route.id" />
  </el-menu>
</template>
<script setup lang="ts">
import { useRouteStore } from '@/stores/route'
import SiderItem from './SiderItem.vue'
import { computed } from 'vue'
import { getLocalStorage } from '@/utils/storage'

const routeStore = useRouteStore()
const routers = computed(() => {
  const token = getLocalStorage<TokenI>('token')
  if (token) {
    return routeStore.getMenuTree(token?.loginId)
  }
  return []
})
</script>

<style lang="scss" scope>
@import '../../../styles/variables.scss';
.sider-title {
  height: 6vh;
  line-height: 6vh;
  min-height: $sider-height;
  text-align: center;
  background-image: linear-gradient(to right, #ec4887, #a25ab0);
}

.dark .sider-title {
  background-image: linear-gradient(to right, #2b2525, #2d3028, #31311e);
  color: var(--el-menu-text-color);
}
</style>
