<template>
  <div>
    <page :total="100" @pagination="pagination">
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
            <el-button type="primary" @click="handleQuery">搜索</el-button>
            <el-button @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </template>

      <template v-slot:table>
        <dtable :columns="columns" :datas="datas" :options="options" />
      </template>
    </page>
  </div>
</template>
<script setup lang="ts">
import { ElForm } from 'element-plus'
import { ref, reactive } from 'vue'
import dtable from '@/components/dtable/index'
import type { OptionColumn, TableColumn, TableData } from '@/types/dtable'

defineOptions({
  name: 'Role',
  inheritAttrs: false
})

const pagination = (page: { page: number; limit: number }) => {
  console.log(page)
}

const columns: TableColumn[] = [
  {
    label: '姓名',
    prop: 'name'
  },
  {
    label: '日期',
    prop: 'date',
    type: 'date'
  },
  {
    label: '金额',
    prop: 'amt',
    type: 'money'
  }
]

const options: OptionColumn = {
  label: '操作',
  buttons: [
    {
      label: '打印',
      type: 'primary',
      method: (row: any) => {
        console.log('111111111111')
        console.log(row)
      }
    }
  ]
}

const datas = [
  {
    name: '张三',
    date: '2020-04-02T08:02:17-05:00',
    amt: '200000000007'
  },
  {
    name: '李四',
    date: '2023-05-02T08:02:17-05:00',
    amt: '200000000007'
  }
]

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
