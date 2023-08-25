<template>
  <div>
    <page :total="pagObj.total" :page="pagObj.page" :limit="pagObj.size" @pagination="pagination">
      <template v-slot:query>
        <el-form :model="queryParams" :inline="true">
          <el-form-item prop="keywords" label="关键字">
            <el-input
              v-model="queryParams.name"
              placeholder="角色名称"
              clearable
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="keywords" label="关键字">
            <el-input
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
              dialogObj.dialogTitle = '新增角色'
              roleId = ''
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
      @open="openRoleView"
    >
      <div>
        <Role ref="roleRef"></Role>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="saveRole">
            {{ $t('operation.save') }}
          </el-button>
          <el-button
            @click="
              () => {
                dialogObj.dialogVisible = false
                dialogObj.dialogTitle = '新增角色'
              }
            "
            >{{ $t('operation.cancel') }}</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
  <div>
    <el-dialog
      v-model="menuTreeDialogVisible"
      title="关联菜单"
      width="40%"
      destroy-on-close
      center
      @open="getMenuTree"
    >
      <div>
        <el-tree
          :data="menuTreeDataSource"
          show-checkbox
          ref="treeRef"
          node-key="id"
          default-expand-all
          highlight-current
        >
        </el-tree>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="saveRoleMeuns">
            {{ $t('operation.save') }}
          </el-button>
          <el-button
            @click="
              () => {
                menuTreeDialogVisible = false
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
import { ElForm, ElTree } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import dtable from '@/components/dtable/index'
import type { OptionColumn, TableColumn } from '@/types/dtable'
import Role from './Role.vue'
import { delRoleApi, getRolesApi } from '@/api/role'
import usePage from '@/components/page/use-page'
import { getMenuTreeApi } from '@/api/menu'
import type { TreeI } from '@/types/tree'
import { addRoleMenuApi, getRoleMenuApi, roleMenuPagingApi } from '@/api/roleMenu'

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

  getRolesApi({ ...queryParams, ...pagObj }).then((res) => {
    loading.value = false
    tableDatas.value = res.content
    pagObj.total = res.totalElements
  })
}

const columns: TableColumn[] = [
  {
    label: '角色名称',
    prop: 'name'
  },
  {
    label: '角色描述',
    prop: 'description'
  },
  {
    label: '创建时间',
    prop: 'createTime',
    type: 'date'
  },
  {
    label: '状态',
    prop: 'status',
    type: 'status',
    dict: 'AvailableStatus'
  },
  {
    label: '关联菜单',
    prop: 'asa',
    render: (rowData) => {
      return (
        <el-button
          type="warning"
          onClick={() => {
            getRoleMenu(rowData.id)
          }}
        >
          关联菜单
        </el-button>
      )
    }
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
        dialogObj.dialogTitle = '编辑角色'
        roleId.value = row.id
      }
    },
    {
      label: '删除',
      type: 'danger',
      popconfirm: true,
      method: (row: any) => {
        delRoleApi(row.id).then(() => {
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

const roleRef = ref()
const saveRole = () => {
  roleRef.value.submit().then(() => {
    dialogObj.dialogVisible = false
    roleId.value = ''
  })
}

let roleId = ref('')
const openRoleView = () => {
  roleRef.value.initForm(roleId.value)
}

const treeRef = ref<InstanceType<typeof ElTree>>()
let menuTreeDialogVisible = ref(false)
let menuTreeDataSource = ref<TreeI[]>([])
const getMenuTree = () => {
  getMenuTreeApi().then((res) => (menuTreeDataSource.value = res))
}

const getRoleMenu = (id: string) => {
  roleId.value = id
  menuTreeDialogVisible.value = true
  roleMenuPagingApi({ roleId: id, page: 0, size: 100000000 }).then((res) => {
    const menuIds = res.content.map((data: { menuId: string }) => data.menuId)
    treeRef.value!.setCheckedKeys(menuIds)
  })
}

const saveRoleMeuns = () => {
  const menuIds = treeRef.value!.getCheckedKeys()
  addRoleMenuApi({ roleId: roleId.value, menuIds: menuIds.join(',') }).then(() => {
    menuTreeDialogVisible.value = false
  })
}
</script>
