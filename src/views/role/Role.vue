<template>
  <div>
    <dform ref="formRef" :data="formData" :items="items" />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import dform from '@/components/dform/index'
import type { FormItemI } from '@/types/dform'
import { addRoleApi, getRoleApi, updateRoleApi } from '@/api/role'

let formData = reactive({
  id: '',
  name: '',
  description: '',
  status: ''
})

const items: FormItemI[] = [
  {
    label: '角色名称',
    prop: 'name',
    type: 'input',
    required: true
  },
  {
    label: '描述',
    prop: 'description',
    type: 'textarea',
    rows: 3
  },
  {
    label: '状态',
    prop: 'status',
    type: 'select',
    required: true,
    selectConfig: {
      dict: 'AvailableStatus'
    }
  }
]

const formRef = ref()
const submit = async () => {
  if (formData.id) {
    await updateRoleApi(formData.id, formData)
  } else {
    await addRoleApi(formData)
  }
  formRef.value.formRef.resetFields()
}

const initForm = (roleId: string) => {
  if (roleId) {
    getRoleApi(roleId).then((res) => {
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
