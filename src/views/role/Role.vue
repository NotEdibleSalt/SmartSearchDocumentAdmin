<template>
  <div>
    <dform ref="formRef" :data="formData" :items="items" />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import dform from '@/components/dform/index'
import type { FormItemI } from '@/types/dform'
import { addRoleApi, getRoleApi } from '@/api/role'

let formData = reactive({
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
      options: [
        {
          label: '1',
          value: '1'
        },
        {
          label: '2',
          value: '2'
        }
      ]
    }
  }
]

const formRef = ref()
const submit = async () => {
  await addRoleApi(formData)
  formRef.value.resetFields()
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
