<template>
  <div>
    <el-button
      type="primary"
      @click="
        () => {
          dialogObj.dialogVisible = true
          dialogObj.dialogTitle = '新增字典项'
          dictItemId = ''
        }
      "
      >{{ $t('operation.add') }}
    </el-button>
    <dtable :columns="columns" :datas="tableDatas" :options="options" />
  </div>
  <div>
    <el-dialog
      v-model="dialogObj.dialogVisible"
      :title="dialogObj.dialogTitle"
      width="33%"
      destroy-on-close
      center
      @open="openDictItemView"
    >
      <div>
        <DictItem ref="dictItemRef" :dictId="props.dictId"></DictItem>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="saveDictItem">
            {{ $t('operation.add') }}
          </el-button>
          <el-button
            @click="
              () => {
                dialogObj.dialogVisible = false
                dialogObj.dialogTitle = '新增字典项'
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
import { ref, reactive, onMounted, type PropType } from 'vue'
import dtable from '@/components/dtable/index'
import type { OptionColumn, TableColumn } from '@/types/dtable'
import DictItem from './DictItem.vue'
import { delDictItemApi } from '@/api/dictItem'
import { getAllDictItemsByIdApi } from '@/api/dict'
import usePage from '@/components/page/use-page'

const props = defineProps({
  dictId: {
    type: String as PropType<string>,
    required: true
  }
})

const { dialogObj } = usePage()

onMounted(() => {
  handleQuery()
})

/**
 * 查询
 */
function handleQuery() {
  loading.value = true

  getAllDictItemsByIdApi(props.dictId).then((res) => {
    loading.value = false
    tableDatas.value = res
  })
}

const columns: TableColumn[] = [
  {
    label: '值',
    prop: 'value'
  },
  {
    label: '标签',
    prop: 'label'
  },
  {
    label: '描述',
    prop: 'description'
  },
  {
    label: '排序（升序）',
    prop: 'sort'
  }
]

const options: OptionColumn = {
  label: '操作',
  width: '220px',
  buttons: [
    {
      label: '编辑',
      type: 'primary',
      method: (row: any) => {
        dialogObj.dialogVisible = true
        dialogObj.dialogTitle = '编辑字典项'
        dictItemId.value = row.id
      }
    },
    {
      label: '删除',
      type: 'danger',
      popconfirm: true,
      method: (row: any) => {
        delDictItemApi(row.id).then(() => {
          handleQuery()
        })
      }
    }
  ]
}

let tableDatas = ref([])
const loading = ref(false)

const dictItemRef = ref()
const saveDictItem = () => {
  dictItemRef.value.submit().then(() => {
    dialogObj.dialogVisible = false
    dictItemId.value = ''
  })
}

let dictItemId = ref('')
const openDictItemView = () => {
  dictItemRef.value.initForm(dictItemId.value)
}
</script>
