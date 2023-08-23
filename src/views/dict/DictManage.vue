<template>
  <div>
    <page
      :total="pagObj.total"
      :page="pagObj.pageNumber"
      :limit="pagObj.pageSize"
      @pagination="pagination"
    >
      <template v-slot:query>
        <el-form :model="queryParams" :inline="true">
          <el-form-item prop="name" label="字典名称">
            <el-input v-model="queryParams.name" clearable @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item prop="type" label="字典类型">
            <el-input v-model="queryParams.status" clearable @keyup.enter="handleQuery" />
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
              dialogObj.dialogTitle = '新增字典'
              dictId = ''
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
      @open="openDictView"
    >
      <div>
        <Dict ref="dictRef"></Dict>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="saveDict">
            {{ $t('operation.add') }}
          </el-button>
          <el-button
            @click="
              () => {
                dialogObj.dialogVisible = false
              }
            "
            >{{ $t('operation.cancel') }}</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>

  <div>
    <el-drawer
      v-model="itemDrawerVisible"
      :destroy-on-close="true"
      title="字典项"
      direction="rtl"
      size="50%"
    >
      <DictItemManage :dictId="dictId" />
    </el-drawer>
  </div>
</template>
<script setup lang="tsx">
import { ElForm } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import dtable from '@/components/dtable/index'
import type { OptionColumn, TableColumn } from '@/types/dtable'
import Dict from './Dict.vue'
import { delDictApi, dictPagingApi } from '@/api/dict'
import usePage from '@/components/page/use-page'
import DictItemManage from './item/DictItemManage.vue'

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

  dictPagingApi({ ...queryParams, ...pagObj }).then((res) => {
    loading.value = false
    tableDatas.value = res.content
    pagObj.total = res.totalElements
  })
}

const columns: TableColumn[] = [
  {
    label: '名称',
    prop: 'name'
  },
  {
    label: '类型',
    prop: 'type'
  },
  {
    label: '备注',
    prop: 'remark'
  },
  {
    label: '系统内置',
    prop: 'system',
    dict: 'YesOrNo'
  },
  {
    label: '状态',
    prop: 'status',
    dict: 'AvailableStatus'
  }
]

const options: OptionColumn = {
  label: '操作',
  width: '280px',
  buttons: [
    {
      label: '编辑',
      type: 'primary',
      method: (row: any) => {
        dialogObj.dialogVisible = true
        dialogObj.dialogTitle = '编辑字典'
        dictId.value = row.id
      }
    },
    {
      label: '字典项',
      type: 'warning',
      method: (row: any) => {
        itemDrawerVisible.value = true
        dictId.value = row.id
      }
    },
    {
      label: '其他',
      group: [
        {
          label: '删除',
          type: 'danger',
          popconfirm: true,
          method: (row: any) => {
            delDictApi(row.id).then(() => {
              handleQuery()
            })
          }
        }
      ]
    }
  ]
}

let tableDatas = ref([])
const loading = ref(false)
const pagination = (page: { page: number; limit: number }) => {
  pagObj.pageNumber = page.page
  pagObj.pageSize = page.limit
  handleQuery()
}

const dictRef = ref()
const saveDict = () => {
  dictRef.value.submit().then(() => {
    dialogObj.dialogVisible = false
    dictId.value = ''
  })
}

let dictId = ref('')
const openDictView = () => {
  dictRef.value.initForm(dictId.value)
}

const itemDrawerVisible = ref(false)
</script>
