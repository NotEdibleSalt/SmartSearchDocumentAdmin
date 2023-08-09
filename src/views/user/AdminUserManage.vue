<template>
  <div>
    <page :total="100">
      <template v-slot:query>
        <el-form ref="queryFormRef" :model="queryParams" :inline="true">
          <el-form-item prop="keywords" label="关键字">
            <el-input
              v-model="queryParams.keywords"
              placeholder="角色名称"
              clearable
              @keyup.enter="handleQuery"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleQuery"><i-ep-search />搜索</el-button>
            <el-button @click="resetQuery"><i-ep-refresh />重置</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:table>
        <mtable></mtable>
      </template>
    </page>
  </div>
</template>
<script setup lang="ts">
import { ElForm } from 'element-plus'
import { ref, reactive } from 'vue'

defineOptions({
  name: 'Role',
  inheritAttrs: false
})

const queryFormRef = ref(ElForm)
const loading = ref(false)

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  keywords: ''
})

/**
 * 查询
 */
function handleQuery() {
  loading.value = true
}
/**
 * 重置查询
 */
function resetQuery() {
  queryFormRef.value.resetFields()
  queryParams.pageNum = 1
  handleQuery()
}
</script>
