<template>
  <div class="sider-title">{{ $t('sider.title') }}</div>
  <el-menu mode="vertical" @click="clickMenuItem">
    <SiderItem v-for="route in routers" :menuInfo="route" :key="route.key" />
  </el-menu>
</template>
<script setup lang="ts">
import router from '@/router'
import SiderItem from './SiderItem.vue'
import { computed } from 'vue'
// import { getMenuTree } from '@/utils/MenuUtil'

const routers = computed(() => {
  return [
    {
      key: 'asdf',
      title: 'aasda',
      routePath: '/aa'
    },
    {
      key: '123',
      title: '123',
      routePath: '/aa'
    }
  ]
})

const clickMenuItem = (menuItem: { key: string }): void => {
  router.push(menuItem.key)
}
</script>

<style lang="scss" scope>
@import '../../../styles/globle.scss';
.sider-title {
  height: $sider-height;
  line-height: $sider-height;
  text-align: center;
  background-image: linear-gradient(to right, #ec4887, #a25ab0);
}

.el-menu {
  border-right: solid 0px #fff;
}
</style>
