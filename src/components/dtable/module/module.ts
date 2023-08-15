import type { TableData } from '@/types/dtable';
import {
  ref,
  watch,
  nextTick
} from 'vue';

export default function (props: { data: any[]; showCheckBox: any; turnRadio: any; selectedIdArr: string | any[]; tableLabel: string | any[]; }, emit: (arg0: string, arg1: any[], arg2: Function | undefined) => void, CommonTable: { value: { clearSelection: () => void; toggleRowSelection: (arg0: { id: any; }, arg1: boolean) => void; }; }) {
  const curPageCheck = ref([])
  watch(() => props.data, () => {
    if (props.showCheckBox || props.turnRadio) {
      nextTick(() => {
        CommonTable.value.clearSelection()
        curPageCheck.value = []
        if (props.showCheckBox && props.turnRadio) {
          props.data.filter((item) => {
            if (item.id === props.selectedIdArr[0]) {
              CommonTable.value.toggleRowSelection(item, true)
            }
          })
        } else if (props.showCheckBox) {
          props.data.filter((item: { id: string; }) => {
            if (props.selectedIdArr.includes(item.id)) {
              CommonTable.value.toggleRowSelection(item, true)
              curPageCheck.value.push(item.id)
            }
          })
        }
      })
    }
  }, {
    immediate: true
  })
  watch(() => props.selectedIdArr, (val) => {
    if (props.showCheckBox || props.turnRadio) {
      nextTick(() => {
        CommonTable.value.clearSelection()
        curPageCheck.value = []
        if (props.showCheckBox && props.turnRadio) {
          props.data.filter((item: { id: string; }) => {
            if (item.id === val[0]) {
              CommonTable.value.toggleRowSelection(item, true)
            }
          })
        } else if (props.showCheckBox) {
          props.data.filter((item: { id: any; }) => {
            if (val.includes(item.id)) {
              CommonTable.value.toggleRowSelection(item, true)
              curPageCheck.value.push(item.id)
            }
          })
        }
      })
    }
  }, {
    immediate: true
  })
  const methods = {
    /**
     * prop 单值 或者 数组过滤(此处为针对时间组，不作为通用处理)
     */
    propFilter(prop, row) {
      const res = prop.reduce((total, cur) => {
        if (row[cur]) {
          return (total += row[cur] + '~')
        } else {
          return ''
        }
      }, '')
      return res ? res.replace(/~$/, '') : ''
    },
    handleTableButton(row: any, type: Function) {
      emit('operation', row, type);
    },
    /**
     * 后续扩展位
     * @param {*} methods
     * @param {*} row
     */
    handleClickon(methods: string, row: TableData) {
      emit(methods, { methods, row })
    },
    handleSelectionChange(val: any[]) {
      if (props.showCheckBox && props.turnRadio) {
        // 选择项大于1时
        if (val.length > 1) {
          const del_row = val.shift()
          CommonTable.value.toggleRowSelection(del_row, false)
        }
      }
      // 全选
      if (props.showCheckBox && props.selectedIdArr) {
        if (props.turnRadio) {
          emit('handle-selection-change', val)
        } else {
          // 一般复选框都是走到这一步
          emit('handle-selection-change', val)
        }
      } else {
        emit('handle-selection-change', val)
      }
    },
    getRowKeys(row) {
      return row.id
    },
    selectAll(val) {
      if (props.showCheckBox && props.turnRadio) {
        // 选择项大于1时
        if (val.length > 1) {
          val.length = 1
        }
      }
      emit('handle-selection-change', val)
    },
    // 斑马纹表格背景色
    tabRowClassName({ rowIndex }) {
      const index = rowIndex + 1
      if (index % 2 === 0) {
        return 'even-row'
      } else {
        return 'odd-row'
      }
    },
    cellClassName({ row, columnIndex }) {
      if (row.confirmTag === 2 && columnIndex < props.tableLabel.length) {
        return 'height_light_cell'
      } else {
        return ''
      }
    },
    buttonDisabled(item, row) {
      if (typeof item.disabled === 'function') return item.disabled(row) || false
      if (!item.disabled) return item.disabled
    },
    /**
     * 单选框选中事件
     */
    rowClick(row) {
      emit('rowClick', row)
    }
  }
  return {
    methods
  }
}
