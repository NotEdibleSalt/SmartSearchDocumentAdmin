<template>
  <div>
    <dform ref="dictItemFormRef" :data="formData" :items="items" />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, type PropType } from 'vue'
import dform from '@/components/dform/index'
import type { FormItemI } from '@/types/dform'
import { addDictItemApi, getDictItemApi } from '@/api/dictItem'

const props = defineProps({
  dictId: {
    type: String as PropType<string>,
    required: true
  }
})

let formData = reactive({
  id: '',
  dictId: props.dictId,
  label: '',
  value: '',
  description: '',
  sort: 1
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
    label: '字典ID',
    prop: 'dictId',
    type: 'input',
    hidden: true,
    required: true
  },
  {
    label: '标签',
    prop: 'label',
    type: 'input',
    required: true
  },
  {
    label: '值',
    prop: 'value',
    type: 'input',
    required: true
  },

  {
    label: '描述',
    prop: 'description',
    type: 'input'
  },
  {
    label: '排序值',
    prop: 'sort',
    type: 'number',
    numberConfig: {
      min: 1,
      controlsPosition: 'right'
    }
  }
]

const dictItemFormRef = ref()
const submit = async () => {
  await addDictItemApi(formData)
  dictItemFormRef.value.formRef.resetFields()
}

const initForm = (dictItemId: string) => {
  if (dictItemId) {
    getDictItemApi(dictItemId).then((res) => {
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
