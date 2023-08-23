<template>
  <div>
    <dform ref="formRef" :data="formData" :items="items" />
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import dform from '@/components/dform/index'
import type { FormItemI } from '@/types/dform'
import { addDictApi, getDictApi } from '@/api/dict'
import { AvailableStatus } from '@/enums/StatusEnum'

let formData = reactive({
  name: '',
  type: '',
  remark: '',
  system: '',
  status: AvailableStatus.ENABLE
})

const items: FormItemI[] = [
  {
    label: '编号',
    prop: 'id',
    hidden: true,
    type: 'input',
    required: true
  },
  {
    label: '名称',
    prop: 'name',
    type: 'input',
    required: true
  },
  {
    label: '类型',
    prop: 'type',
    type: 'input',
    required: true
  },
  {
    label: '备注',
    prop: 'remark',
    type: 'input'
  },
  {
    label: '系统内置',
    prop: 'system',
    type: 'select',
    required: true,
    selectConfig: {
      dict: 'YesOrNo'
    }
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
  await addDictApi(formData)
  formRef.value.resetFields()
}

const initForm = (dictId: string) => {
  if (dictId) {
    getDictApi(dictId).then((res) => {
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
