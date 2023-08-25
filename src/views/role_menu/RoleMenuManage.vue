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
          <el-form-item prop="keywords" label="关键字">
            <el-input
              v-model="queryParams.name"
              placeholder="角色、菜单关联表名称"
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
            <el-button type="primary" @click="handleQuery">{{ $t("operation.search") }}</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:button>
        <el-button
          type="primary"
          @click="
            () => {
              dialogObj.dialogVisible = true
              dialogObj.dialogTitle = '新增角色、菜单关联表'
              roleMenuId = ''
            }
          "
        >{{ $t("operation.add") }}
        </el-button
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
      @open="openRoleMenuView"
    >
      <div>
        <RoleMenu ref="roleMenuRef"></RoleMenu>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="saveRoleMenu">
            {{ $t("operation.add") }}
          </el-button>
          <el-button
            @click="
              () => {
                dialogObj.dialogVisible = false
                dialogObj.dialogTitle = '新增角色、菜单关联表'
              }
            "
          >{{ $t("operation.cancel") }}</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="tsx">
import { ElForm } from "element-plus";
import { ref, reactive, onMounted } from "vue";
import dtable from "@/components/dtable/index";
import type { OptionColumn, TableColumn } from "@/types/dtable";
import RoleMenu from "./RoleMenu.vue";
import { delRoleMenuApi, roleMenuPagingApi } from "@/api/roleMenu";
import usePage from "@/components/page/use-page";

const { pagObj, dialogObj } = usePage();

onMounted(() => {
  handleQuery();
});

const queryParams = reactive({
  name: "",
  status: ""
});

/**
 * 查询
 */
function handleQuery() {
  loading.value = true;

  roleMenuPagingApi({ ...queryParams, ...pagObj }).then((res) => {
    loading.value = false;
    tableDatas.value = res.content;
    pagObj.total = res.totalElements;
  });
}

const columns: TableColumn[] = [
  {
    label: "主键",
    prop: "id",
    hidden: true

  },
  {
    label: "角色id",
    prop: "roleId"

  },
  {
    label: "菜单id",
    prop: "menuId"

  }


];

const options: OptionColumn = {
  label: "操作",
  buttons: [
    {
      label: "编辑",
      type: "primary",
      method: (row: any) => {
        dialogObj.dialogVisible = true;
        dialogObj.dialogTitle = "编辑角色、菜单关联表";
        roleMenuId.value = row.id;
      }
    },
    {
      label: "删除",
      type: "danger",
      popconfirm: true,
      method: (row: any) => {
        delRoleMenuApi(row.id).then(() => {
          handleQuery();
        });
      }
    }
  ]
};

let tableDatas = ref([]);
const loading = ref(false);
const pagination = (page: { page: number; limit: number }) => {
  pagObj.pageNumber = page.page;
  pagObj.pageSize = page.limit;
  handleQuery();
};

const roleMenuRef = ref();
const saveRoleMenu = () => {
  roleMenuRef.value.submit().then(() => {
    dialogObj.dialogVisible = false;
    roleMenuId.value = "";
  });
};

let roleMenuId = ref("");
const openRoleMenuView = () => {
  roleMenuRef.value.initForm(roleMenuId.value);
};
</script>

