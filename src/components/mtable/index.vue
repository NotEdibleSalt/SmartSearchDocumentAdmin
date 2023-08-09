<template>
  <el-table
    ref="dataTableRef"
    v-loading="loading"
    :data="roleList"
    highlight-current-row
    border
    @selection-change="handleSelectionChange"
    v-for="column in props.tableColumn"
  >
    <el-table-column
      :type="column.type"
      :align="column.align"
      :label="column.label"
      :prop="column.prop"
      :min-width="column.minWidth"
      :width="column.width"
      :fixed="column.fixed"
    />

    <el-table-column fixed="right" label="操作" width="220">
      <template #default="scope">
        <el-button type="primary" size="small" link @click="handleDelete(scope.row.id)">
          <i-ep-delete />删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, type PropType } from 'vue'

const props = defineProps({
  tableColumn: {
    required: true,
    type: Array as PropType<ITableColumn[]>,
    default: []
  },
  op: {
    required: true,
    type: Array as PropType<ITableColumn[]>,
    default: []
  }
})

const loading = ref(false)
const ids = ref<number[]>([])

const roleList = ref<any[]>()

/**
 * 行checkbox change事件
 */
function handleSelectionChange(selection: any) {
  ids.value = selection.map((item: any) => item.id)
}

/**
 * 删除
 */
function handleDelete(roleId?: number) {
  const roleIds = [roleId || ids.value].join(',')
  if (!roleIds) {
    ElMessage.warning('请勾选删除项')
    return
  }

  ElMessageBox.confirm('确认删除已选中的数据项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    loading.value = true
  })
}
</script>
