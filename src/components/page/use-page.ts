import { reactive } from 'vue'

export default function () {

  const pagObj = reactive({
    total: 0,
    page: 0,
    size: 10
  })

  let dialogObj = reactive({
    dialogVisible: false,
    dialogTitle: ''
  })



  return {
    pagObj,
    dialogObj
  }
}