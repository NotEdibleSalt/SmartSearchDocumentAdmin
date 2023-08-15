<template>
  <div class="sider-item">
    <template v-if="routeInfo && routeInfo.children">
      <el-sub-menu :index="routeInfo.routePath ? routeInfo.routePath : routeInfo.key">
        <template #title>
          {{ routeInfo.title }}
        </template>
        <div v-for="item in routeInfo.children" :index="item.routePath">
          <SiderItem :menuInfo="item" />
        </div>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="routeInfo.routePath">
        {{ routeInfo.title }}
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
.sider-item {
  border-bottom: solid 2px #f2f3f5;
}

.el-menu-item.is-active {
  background-color: rgba(49, 195, 240, 0.966);
  color: #000;
}

.el-menu-item:hover {
  border-right: solid 5px #f1176b;
}
</style>
