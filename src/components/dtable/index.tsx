import { defineComponent, ref, type PropType } from 'vue'
import {
  type OptionButton,
  type OptionColumn,
  type TableColumn,
  type TableData
} from '@/types/dtable'
import useModule from './module/module'
import '@/styles/dtable.scss'
import { formatDate, formatMoney } from '@/utils/format'
import { dictDataLabel } from '@/plugins/DictPlugin'
import Money from '../money'

export default defineComponent({
  name: 'dtable',
  props: {
    maxHeight: {
      type: [String, Number],
      default: 'auto'
    },
    /**
     * 表格自定义属性展示
     */
    columns: {
      type: Array as PropType<TableColumn[]>,
      default: () => []
    },
    /**
     * 表格数据源
     */
    datas: {
      type: Array as PropType<TableData[]>,
      default: () => []
    },
    /**
     * 配置需要显示的操作菜单
     */
    options: {
      type: Object as PropType<OptionColumn>,
      default: () => {}
    },
    showCheckBox: {
      // 配置是否显示全选（复选框）
      type: Boolean,
      default: false
    },
    /**
     * 是否显示索引
     */
    showIndex: {
      type: Boolean,
      default: false
    },
    turnRadio: {
      type: Boolean,
      default: false
    },
    selectedIdArr: {
      type: Array as PropType<number[] | string[]>,
      default: () => []
    },
    /**
     * 文字过长时是否隐藏
     */
    overflowText: {
      type: Boolean,
      default: false
    },
    /**
     * 加载提示
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * 是否保持之前复选框的数据
     */
    keep: {
      type: Boolean,
      default: false
    },
    /**
     * 动态绑定 key 值
     */
    keyId: {
      type: String,
      default: 'id'
    },
    /**
     * 行内自定义样式配置
     */
    rowStyle: {
      type: Object,
      default: () => {
        return {
          height: '40px'
        }
      }
    },
    /**
     * 是否展示展开按钮
     */
    showExpand: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const { emit, expose, slots } = ctx
    const tableRef = ref(null)
    const { methods } = useModule(props, emit, tableRef)
    expose({
      tableRef
    })
    return () => (
      <div v-loading={props.loading}>
        <el-table
          class="d-table"
          ref={tableRef}
          data={props.datas}
          border
          max-height={props.maxHeight}
          row-class-name={methods.tabRowClassName}
          row-style={props.rowStyle}
          cell-class-name={methods.cellClassName}
          header-row-class-name="d-table-header"
          row-key={props.keyId}
          on-select={methods.handleSelectionChange}
          on-select-all={methods.handleSelectionChange}
        >
          {props.showCheckBox && (
            <el-table-column
              key="showCheckBox"
              width="55"
              type="selection"
              reserve-selection={props.keep}
              class-name={props.turnRadio ? 'checkBoxRadio' : ''}
              align="center"
            />
          )}
          {props.showExpand && (
            <el-table-column
              key="showExpand"
              type="expand"
              v-slots={{
                default: (scope: { row: any }) => {
                  return <fragment row={scope.row}>{slots.expand?.()}</fragment>
                }
              }}
            ></el-table-column>
          )}
          {props.showIndex && (
            <el-table-column
              align="center"
              label="序号"
              width="50"
              v-slots={{
                default: (scope: { $index: number }) => {
                  return scope.$index + 1
                }
              }}
            ></el-table-column>
          )}
          {props.columns.map((item: TableColumn) => {
            if (!item.formatter) {
              if (item.type === 'dateTime') {
                item.formatter = (row: TableData, column: TableColumn, cellValue: string) =>
                  formatDate(cellValue)
              } else if (item.type === 'date') {
                item.formatter = (row: TableData, column: TableColumn, cellValue: string) =>
                  formatDate(cellValue, 'YYYY-MM-DD')
              } else if (item.type === 'money') {
                item.formatter = (
                  row: TableData,
                  column: TableColumn,
                  cellValue: number | bigint
                ) => formatMoney(cellValue)
              }
            }

            if (item.dict) {
              item.formatter = (
                row: TableData,
                column: TableColumn,
                cellValue: string | number | boolean
              ) => {
                if (item.dict) {
                  return dictDataLabel(item.dict, cellValue).value
                }
              }
            }

            return (
              <el-table-column
                key={item.prop}
                width={item.width ?? ''}
                align={item.align ?? 'center'}
                label={item.label}
                show-overflow-tooltip={props.overflowText}
                fixed={item.fixed}
                prop={item.prop}
                formatter={item.formatter}
                v-slots={{
                  default: (scope: { row: TableData }) => {
                    if (item.render) {
                      return item.render(scope.row)
                    } else {
                      if (item.type === 'money') {
                        return <Money money={scope.row[item.prop]}></Money>
                      }
                    }
                  }
                }}
              ></el-table-column>
            )
          })}
          {props.options && (
            <el-table-column
              width={props.options.width}
              label={props.options.label}
              fixed={props.options.fixed}
              align={props.options.align ?? 'center'}
              v-slots={{
                default: (scope: { row: TableData }) => {
                  return (
                    props.options.buttons && (
                      <div class="flex-box">
                        {props.options.buttons.map((button: OptionButton) => {
                          if (button.group) {
                            return (
                              <el-button
                                size={button.size}
                                type={button.type ?? 'default'}
                                icon={button.icon}
                                disabled={button.disabled}
                                v-slots={{
                                  default: () => {
                                    const popRef = ref()
                                    return (
                                      <el-dropdown
                                        trigger="click"
                                        hide-on-click={false}
                                        ref={popRef}
                                        id={scope.row.id}
                                        v-slots={{
                                          dropdown: () => {
                                            return (
                                              <el-dropdown-menu>
                                                {button.group?.map((item1) => {
                                                  if (item1.type === 'danger' && item1.popconfirm) {
                                                    return (
                                                      <el-dropdown-item>
                                                        <el-popconfirm
                                                          title="确定删除这个条数据吗？"
                                                          onConfirm={() => {
                                                            if (item1.method) {
                                                              item1.method(scope.row)
                                                            }
                                                            popRef.value.handleClose()
                                                          }}
                                                          onCancel={() => {
                                                            popRef.value.handleClose()
                                                          }}
                                                          v-slots={{
                                                            reference: () => {
                                                              return (
                                                                <el-button
                                                                  size={item1.size}
                                                                  type={item1.type ?? 'default'}
                                                                  icon={item1.icon}
                                                                  disabled={item1.disabled}
                                                                >
                                                                  {item1.label}
                                                                </el-button>
                                                              )
                                                            }
                                                          }}
                                                        ></el-popconfirm>
                                                      </el-dropdown-item>
                                                    )
                                                  } else {
                                                    return (
                                                      <el-dropdown-item>
                                                        <el-button
                                                          size={item1.size}
                                                          type={item1.type ?? 'default'}
                                                          icon={item1.icon}
                                                          disabled={item1.disabled}
                                                          onClick={() => {
                                                            if (item1.method) {
                                                              return item1.method(scope.row)
                                                            }
                                                          }}
                                                        >
                                                          {item1.label}
                                                        </el-button>
                                                      </el-dropdown-item>
                                                    )
                                                  }
                                                })}
                                              </el-dropdown-menu>
                                            )
                                          }
                                        }}
                                      >
                                        <span class="el-dropdown-link">
                                          {button.label}
                                          <el-icon class="el-icon--right">
                                            <arrow-down />
                                          </el-icon>
                                        </span>
                                      </el-dropdown>
                                    )
                                  }
                                }}
                              ></el-button>
                            )
                          }

                          if (button.type === 'danger' && button.popconfirm) {
                            return (
                              <el-popconfirm
                                title="确定删除这个条数据吗？"
                                onConfirm={() => button.method(scope.row)}
                                v-slots={{
                                  reference: () => {
                                    return (
                                      <el-button
                                        size={button.size}
                                        type={button.type ?? 'default'}
                                        icon={button.icon}
                                        disabled={button.disabled}
                                      >
                                        {button.label}
                                      </el-button>
                                    )
                                  }
                                }}
                              ></el-popconfirm>
                            )
                          } else {
                            return (
                              <el-button
                                size={button.size}
                                type={button.type ?? 'default'}
                                icon={button.icon}
                                disabled={button.disabled}
                                onClick={() => button.method(scope.row)}
                              >
                                {button.label}
                              </el-button>
                            )
                          }
                        })}
                      </div>
                    )
                  )
                }
              }}
            ></el-table-column>
          )}
        </el-table>
      </div>
    )
  }
})
