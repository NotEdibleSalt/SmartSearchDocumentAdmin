<template>
  <div>
    <dform ref="formRef" :data="formData" :items="items" />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import dform from '@/components/dform/index'
import type { FormItemI } from '@/types/dform'
import { addRoleMenuApi, getRoleMenuApi } from '@/api/roleMenu'

let formData = reactive({
  id: '',
  roleId: '',
  menuId: ''
})

const items: FormItemI[] = [
  {
    label: '主键',
    prop: 'id',
    hidden: true,
    type: 'input',
    required: true
  },
  {
    label: '角色id',
    prop: 'roleId',
    type: 'input',
    required: true
  },
  {
    label: '菜单id',
    prop: 'menuId',
    type: 'input',
    required: true
  }
]

const formRef = ref()
const submit = async () => {
  await addRoleMenuApi(formData)
  formRef.value.resetFields()
}

const initForm = (roleMenuId: string) => {
  if (roleMenuId) {
    getRoleMenuApi(roleMenuId).then((res) => {
      Object.assign(formData, res)
    })
  } else {
    Object.assign(formData, {})
  }
}

defineExpose({
  submit,
  initForm
})
</script>
