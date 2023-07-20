<template>
  <div class="sider-title">{{ $t('sider.title') }}</div>
  <el-menu :router="true">
    <SiderItem v-for="route in routers" :menuInfo="route" :key="route.key" />
  </el-menu>
</template>
<script setup lang="ts">
import SiderItem from './SiderItem.vue'
import { computed } from 'vue'

const routers = computed(() => {
  return [
    {
      key: 'asdf',
      title: 'aasda',
      routePath: '/aa',
      children: [
        {
          key: '123',
          title: '系统管理',
          routePath: '/aa'
        }
      ]
    },
    {
      key: '123',
      title: '123',
      routePath: '/aa'
    }
  ]
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
