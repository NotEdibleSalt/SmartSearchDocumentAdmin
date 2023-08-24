<template>
  <div class="app-container">
    <div class="search-container">
      <slot name="query" />
    </div>

    <el-card shadow="never">
      <template #header>
        <slot name="button" />
      </template>

      <div>
        <slot name="table" />
        <div :class="{ hidden: hidden }" class="pagination">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :background="background"
            :layout="layout"
            :page-sizes="pageSizes"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { type PropType } from 'vue'
import { useVModel } from '@vueuse/core'
import { scrollTo } from '../../utils/scroll-to'

const props = defineProps({
  total: {
    required: true,
    type: Number as PropType<number>,
    default: 0
  },
  page: {
    type: Number,
    default: 1
  },
  size: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default() {
      return [10, 20, 30, 50]
    }
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  background: {
    type: Boolean,
    default: true
  },
  autoScroll: {
    type: Boolean,
    default: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['pagination', 'update:page', 'update:size'])

const currentPage = useVModel(props, 'page', emit)
const pageSize = useVModel(props, 'size', emit)

function handleSizeChange(val: number) {
  emit('pagination', { page: currentPage, size: val })
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}

function handleCurrentChange(val: number) {
  currentPage.value = val
  emit('pagination', { page: val, size: props.size })
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}
</script>
<style scoped lang="scss">
.app-container {
  padding: 10px;
}

.search-container {
  padding: 20px 0 0 20px;
  margin-bottom: 10px;
  background-color: var(--el-bg-color-overlay);
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);
}

.pagination {
  padding: 12px;

  &.hidden {
    display: none;
  }
}
</style>
