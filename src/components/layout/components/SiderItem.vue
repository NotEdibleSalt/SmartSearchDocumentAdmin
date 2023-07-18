<template>
  <div class="sider-item">
    <template v-if="routeInfo && routeInfo.children">
      <el-sub-menu :key="routeInfo.routePath">
        <template #title>
          <el-text class="mx-1" type="success">{{ routeInfo.title }}</el-text>
        </template>
        <div v-for="item in routeInfo.children" :key="item.routePath">
          <SiderItem :menuInfo="item" />
        </div>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :key="routeInfo.routePath">
        <el-text class="mx-1" type="success">{{ routeInfo.title }}</el-text>
      </el-menu-item>
    </template>
  </div>
</template>
<script setup lang="ts">
import type { IMenuTree } from '@/types/globle'
import { computed, type PropType } from 'vue'

const props = defineProps({
  menuInfo: {
    type: Object as PropType<IMenuTree> | undefined,
    required: true
  }
})

const routeInfo = computed(() => props.menuInfo).value
</script>

<style lang="scss" scope>
@import '../../../styles/globle.scss';
.sider-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $sider-height;
  border-bottom: solid 3px #f2f3f5;
}
.sider-item:hover {
  background-color: #e7387b;
  color: black;
}
.sider-item:active {
  border-right: solid 3px #75c9cc;
  color: black;
}
.el-menu-item {
  height: $sider-height;
  line-height: $sider-height;
}
</style>
