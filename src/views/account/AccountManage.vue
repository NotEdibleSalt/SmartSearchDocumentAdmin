<template>
  <div>
    <page :total="pagObj.total" :page="pagObj.page" :limit="pagObj.size" @pagination="pagination">
      <template v-slot:query>
        <el-form :model="queryParams" :inline="true">
          <el-form-item prop="name" label="用户名">
            <el-input
              v-model="queryParams.name"
              placeholder="账户名称"
              clearable
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="status" label="状态">
            <el-select
              v-model="queryParams.status"
              placeholder="状态"
              clearable
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery">{{ $t('operation.search') }}</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:button>
        <el-button
          type="primary"
          @click="
            () => {
              dialogObj.dialogVisible = true
              dialogObj.dialogTitle = '新增账户'
              accountId = ''
            }
          "
          >{{ $t('operation.add') }}</el-button
        >
      </template>
      <template v-slot:table>
        <dtable :columns="columns" :datas="tableDatas" :options="options" />
      </template>
    </page>
  </div>
  <div>
    <el-dialog
      v-model="dialogObj.dialogVisible"
      :title="dialogObj.dialogTitle"
      width="33%"
      destroy-on-close
      center
      @open="openAccountView"
    >
      <div>
        <Account ref="accountRef"></Account>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="saveAccount">
            {{ $t('operation.add') }}
          </el-button>
          <el-button
            @click="
              () => {
                dialogObj.dialogVisible = false
                dialogObj.dialogTitle = '新增账户'
              }
            "
            >{{ $t('operation.cancel') }}</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="tsx">
import { ElForm } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import dtable from '@/components/dtable/index'
import type { OptionColumn, TableColumn } from '@/types/dtable'
import Account from './Account.vue'
import { delAccountApi, accountPagingApi } from '@/api/account'
import usePage from '@/components/page/use-page'

const { pagObj, dialogObj } = usePage()

onMounted(() => {
  handleQuery()
})

const queryParams = reactive({
  name: '',
  status: ''
})

/**
 * 查询
 */
function handleQuery() {
  loading.value = true

  accountPagingApi({ ...queryParams, ...pagObj }).then((res) => {
    loading.value = false
    tableDatas.value = res.content
    pagObj.total = res.totalElements
  })
}

const columns: TableColumn[] = [
  {
    label: '姓名',
    prop: 'name'
  },
  {
    label: '用户名',
    prop: 'username'
  },
  {
    label: '手机号',
    prop: 'phone'
  },
  {
    label: '邮箱',
    prop: 'email'
  },
  {
    label: '状态',
    prop: 'status',
    dict: 'AvailableStatus'
  }
]

const options: OptionColumn = {
  label: '操作',
  buttons: [
    {
      label: '编辑',
      type: 'primary',
      method: (row: any) => {
        dialogObj.dialogVisible = true
        dialogObj.dialogTitle = '编辑账户'
        accountId.value = row.id
      }
    },
    {
      label: '删除',
      type: 'danger',
      popconfirm: true,
      method: (row: any) => {
        delAccountApi(row.id).then(() => {
          handleQuery()
        })
      }
    }
  ]
}

let tableDatas = ref([])
const loading = ref(false)
const pagination = (page: { page: number; size: number }) => {
  pagObj.page = page.page
  pagObj.size = page.size
  handleQuery()
}

const accountRef = ref()
const saveAccount = () => {
  accountRef.value.submit().then(() => {
    dialogObj.dialogVisible = false
    accountId.value = ''
  })
}

let accountId = ref('')
const openAccountView = () => {
  accountRef.value.initForm(accountId.value)
}
</script>
