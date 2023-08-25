<template>
  <div>
    <dform ref="formRef" :data="formData" :items="items" />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance, type ComponentInternalInstance } from 'vue'
import dform from '@/components/dform/index'
import type { FormItemI } from '@/types/dform'
import { addAccountApi, getAccountApi } from '@/api/account'
import { AvailableStatus } from '@/enums/StatusEnum'

let formData = reactive({
  id: '',
  name: '',
  username: '',
  phone: '',
  email: '',
  status: AvailableStatus.ENABLE
})

let items: FormItemI[] = [
  {
    label: '账号id',
    prop: 'id',
    hidden: true,
    type: 'input'
  },
  {
    label: '姓名',
    prop: 'name',
    type: 'input',
    required: true
  },
  {
    label: '用户名',
    prop: 'username',
    type: 'input',
    required: true
  },
  {
    label: '手机号',
    prop: 'phone',
    type: 'input',
    required: true
  },
  {
    label: '邮箱',
    prop: 'email',
    type: 'input'
  },
  {
    label: '密码',
    prop: 'password',
    type: 'input',
    hidden: true,
    required: true
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
  await addAccountApi(formData)
  formRef.value.formRef.resetFields()
}

const instance = getCurrentInstance() as ComponentInternalInstance | null

const initForm = (accountId: string) => {
  if (accountId) {
    getAccountApi(accountId).then((res) => {
      Object.assign(formData, res)
    })
  } else {
    items = items.map((item) => {
      if (item.prop === 'password') {
        item.hidden = false
      }
      return item
    })

    if (instance !== null) {
      instance!.proxy!.$forceUpdate()
    }

    Object.assign(formData, {})
  }
}

defineExpose({
  submit,
  initForm
})
</script>
