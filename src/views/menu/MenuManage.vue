<template>
  <div>
    <el-container>
      <el-aside width="30%" style="padding: 18px 0px">
        <div class="custom-tree-container">
          <div style="margin-bottom: 5px">
            <el-row>
              <el-col :span="8">
                <el-button
                  type="primary"
                  @click="
                    () => {
                      dialogObj.dialogVisible = true
                      dialogObj.dialogTitle = '新增顶级菜单'
                      addMenuform.menuType = 'top'
                    }
                  "
                  >{{ $t('menu.addTopMenu') }}</el-button
                >
              </el-col>
              <el-col :span="16">
                <el-input v-model="menuName" placeholder="搜索" :prefix-icon="Search" />
              </el-col>
            </el-row>
          </div>
          <div>
            <el-tree
              :data="dataSource"
              show-checkbox
              node-key="id"
              default-expand-all
              highlight-current
              ref="treeRef"
              :filter-node-method="filterNode"
              @node-click="clickTreeNode"
            >
              <template #default="{ node, data }">
                <span class="custom-tree-node">
                  <span>{{ node.label }}</span>
                  <span>
                    <a
                      class="add-children-menu-a"
                      @click="
                        () => {
                          dialogObj.dialogVisible = true
                          dialogObj.dialogTitle = '新增子菜单'
                          addMenuform.menuType = 'child'
                          addMenuform.parentId = data.id
                          addMenuform.parentName = data.label
                        }
                      "
                    >
                      {{ $t('operation.add') }}
                    </a>

                    <el-popconfirm title="确定删除这个菜单吗？" @confirm="remove(data)">
                      <template #reference>
                        <a class="del-children-menu-a">
                          {{ $t('operation.del') }}
                        </a>
                      </template>
                    </el-popconfirm>
                  </span>
                </span>
              </template>
            </el-tree>
          </div>
        </div>
      </el-aside>

      <el-main>
        <div style="margin-left: 5%">
          <el-form
            :label-position="labelPosition"
            status-icon
            label-width="100px"
            label-suffix=":"
            style="max-width: 600px; min-width: 300px"
            :model="updateMenuform"
            ref="updateMenuformRef"
          >
            <el-form-item v-show="false" required label="id" prop="id">
              <el-input disabled v-model="updateMenuform.id" />
            </el-form-item>
            <el-form-item required label="菜单类型" prop="menuType">
              <el-input disabled v-model="updateMenuform.menuType" />
            </el-form-item>
            <el-form-item
              v-if="updateMenuform.menuType === 'child'"
              required
              label="上级菜单"
              prop="parentName"
            >
              <el-input disabled v-model="updateMenuform.parentName" />
            </el-form-item>
            <el-form-item required label="菜单名称" prop="name">
              <el-input v-model="updateMenuform.name" />
            </el-form-item>
            <el-form-item label="菜单路径" prop="path">
              <el-input v-model="updateMenuform.path" />
            </el-form-item>
            <el-form-item label="路由名" prop="routeName">
              <el-input v-model="updateMenuform.routeName" />
            </el-form-item>

            <el-form-item label="路由路径" prop="routePath">
              <el-input v-model="updateMenuform.routePath" />
            </el-form-item>
            <el-form-item label="排序值" prop="sortNumber">
              <el-input-number
                :min="1"
                :max="100"
                controls-position="right"
                v-model="updateMenuform.sortNumber"
              />
            </el-form-item>

            <el-form-item label="描述" prop="description">
              <el-input v-model="updateMenuform.description" />
            </el-form-item>
            <el-form-item required label="状态" prop="status">
              <el-select v-model="updateMenuform.status">
                <el-option label="启用" value="ENABLE" />
                <el-option label="禁用" value="DISABLE" />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="updateMenu">{{ $t('operation.save') }}</el-button>
              <el-button @click="cancelUpdateMenu">{{ $t('operation.cancel') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>

    <div>
      <el-dialog
        v-model="dialogObj.dialogVisible"
        :title="dialogObj.dialogTitle"
        width="30%"
        center
      >
        <div>
          <el-form
            :label-position="labelPosition"
            status-icon
            label-width="100px"
            label-suffix=":"
            style="max-width: 600px; min-width: 300px"
            :model="addMenuform"
            ref="addMenuformRef"
          >
            <el-form-item required label="菜单类型" prop="menuType">
              <el-input disabled v-model="addMenuform.menuType" />
            </el-form-item>
            <el-form-item
              v-if="addMenuform.menuType === 'child'"
              required
              label="上级菜单"
              prop="parentName"
            >
              <el-input disabled v-model="addMenuform.parentName" />
            </el-form-item>
            <el-form-item required label="菜单名称" prop="name">
              <el-input v-model="addMenuform.name" />
            </el-form-item>
            <el-form-item label="菜单路径" prop="path">
              <el-input v-model="addMenuform.path" />
            </el-form-item>
            <el-form-item label="路由名" prop="routeName">
              <el-input v-model="addMenuform.routeName" />
            </el-form-item>

            <el-form-item label="路由路径" prop="routePath">
              <el-input v-model="addMenuform.routePath" />
            </el-form-item>
            <el-form-item label="排序值" prop="sortNumber">
              <el-input-number
                :min="1"
                :max="100"
                controls-position="right"
                v-model="addMenuform.sortNumber"
              />
            </el-form-item>

            <el-form-item label="描述" prop="description">
              <el-input v-model="addMenuform.description" />
            </el-form-item>
            <el-form-item required label="状态" prop="status">
              <el-select v-model="addMenuform.status">
                <el-option label="启用" value="ENABLE" />
                <el-option label="禁用" value="DISABLE" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="addMenu">
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import type { TreeI } from '@/types/tree'
import { Search } from '@element-plus/icons-vue'
import { addMenuApi, updateMenuApi, getMenuApi, getMenuTreeApi, delMenuApi } from '@/api/menu'
import { type ElTree, type FormInstance } from 'element-plus'

const labelPosition = ref('right')

let menuName = ref<string>('')
const treeRef = ref<InstanceType<typeof ElTree>>()
watch(menuName, (val) => {
  treeRef.value!.filter(val)
})

const filterNode = (value: string, data: any, child: any): boolean => {
  if (!value) return true
  return data.label.includes(value)
}

let dataSource = ref<TreeI[]>([])
onMounted(() => {
  getMenuTree()
})

const getMenuTree = () => {
  getMenuTreeApi().then((res) => (dataSource.value = res))
}

const clickTreeNode = (data: TreeI) => {
  getMenuApi(data.id).then((res) => {
    updateMenuform.id = res.id
    updateMenuform.parentId = res.parentId
    updateMenuform.parentName = res.parentName
    updateMenuform.menuType = res.menuType
    updateMenuform.name = res.name
    updateMenuform.path = res.path
    updateMenuform.routeName = res.routeName
    updateMenuform.routePath = res.routePath
    updateMenuform.sortNumber = res.sortNumber
    updateMenuform.description = res.description
    updateMenuform.status = res.status
  })
}

let addMenuform = reactive({
  parentId: '',
  parentName: '',
  menuType: '',
  name: '',
  path: '',
  routeName: '',
  routePath: '',
  sortNumber: 1,
  description: '',
  status: 'ENABLE'
})

let dialogObj = reactive({
  dialogVisible: false,
  dialogTitle: ''
})

const addMenuformRef = ref<FormInstance>()
const addMenu = () => {
  addMenuApi(addMenuform).then((res) => {
    dialogObj.dialogVisible = false
    getMenuTree()
    addMenuformRef.value?.resetFields()
  })
}

const updateMenuformRef = ref<FormInstance>()
let updateMenuform = reactive({
  id: '',
  parentId: '',
  parentName: '',
  menuType: '',
  name: '',
  path: '',
  routeName: '',
  routePath: '',
  sortNumber: undefined,
  description: '',
  status: ''
})

const remove = (data: TreeI) => {
  delMenuApi(data.id).then((res: any) => {
    getMenuTree()
  })
}

const updateMenu = () => {
  if (!updateMenuformRef) return
  updateMenuformRef.value?.validate((valid) => {
    if (valid) {
      updateMenuApi(updateMenuform.id, updateMenuform).then(() => {
        getMenuTree()
      })
    } else {
      return false
    }
  })
}
const cancelUpdateMenu = () => {
  if (!updateMenuform.id) {
    return
  }
  getMenuApi(updateMenuform.id).then((res) => {
    updateMenuform.id = res.id
    updateMenuform.parentId = res.parentId
    updateMenuform.parentName = res.parentName
    updateMenuform.menuType = res.menuType
    updateMenuform.name = res.name
    updateMenuform.path = res.path
    updateMenuform.routeName = res.routeName
    updateMenuform.routePath = res.routePath
    updateMenuform.sortNumber = res.sortNumber
    updateMenuform.description = res.description
    updateMenuform.status = res.status
  })
}
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .add-children-menu-a {
    margin-left: 8px;
    color: var(--el-color-primary);
  }
  .del-children-menu-a {
    margin-left: 8px;
    color: var(--el-color-danger);
  }
}
</style>
