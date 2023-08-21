import { defineComponent, ref, type PropType } from 'vue'
import type { FormItemI } from '@/types/dform'
import type { FormInstance } from 'element-plus'

export default defineComponent({
  name: 'dform',
  props: {
    labelPosition: {
      type: String,
      default: 'right'
    },
    statusIcon: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    labelSuffix: {
      type: String,
      default: ':'
    },
    data: {
      type: Object,
      default: () => {}
    },
    items: {
      type: Array as PropType<FormItemI[]>,
      default: () => []
    }
  },
  setup(props, { expose }) {
    const formRef = ref<FormInstance>()
    expose({
      formRef
    })

    return () => (
      <div>
        <el-form
          label-position={props.labelPosition}
          status-icon={props.statusIcon}
          label-width={props.labelWidth}
          label-suffix={props.labelSuffix}
          model={props.data}
          ref={formRef}
        >
          {props.items.map((item) => {
            return (
              <el-form-item
                v-show={!item.hidden}
                required={item.required}
                label={item.label}
                prop={item.prop}
              >
                {item.type === 'input' && (
                  <el-input disabled={item.disabled} v-model={props.data[item.prop]} />
                )}
                {item.type === 'textarea' && (
                  <el-input
                    rows={item.rows}
                    type="textarea"
                    disabled={item.disabled}
                    v-model={props.data[item.prop]}
                  />
                )}
                {item.type === 'select' && (
                  <el-select
                    disabled={item.disabled}
                    multiple={item.selectConfig?.multiple}
                    clearable={item.selectConfig?.clearable}
                    collapse-tags={item.selectConfig?.collapseTags}
                    collapse-tags-tooltip={item.selectConfig?.collapseTagsTooltip}
                    default-first-option={item.selectConfig?.defaultFirstOption}
                    clear-icon={item.selectConfig?.clearIcon}
                    suffix-icon={item.selectConfig?.suffixIcon}
                    fit-input-width-icon={item.selectConfig?.fitInputWidth}
                    v-model={props.data[item.prop]}
                  >
                    {item.selectConfig?.options.map((option) => {
                      return (
                        <el-option
                          key={option.value}
                          label={option.label}
                          value={option.value}
                          disabled={option.disabled}
                        />
                      )
                    })}
                  </el-select>
                )}
                {item.type === 'number' && (
                  <el-input-number
                    min={item.numberConfig?.min}
                    max={item.numberConfig?.max}
                    step={item.numberConfig?.step}
                    precision={item.numberConfig?.precision}
                    controls={item.numberConfig?.controls}
                    controls-position={item.numberConfig?.controlsPosition}
                    v-model={props.data[item.prop]}
                  />
                )}
                {item.type === 'date' && (
                  <el-date-picker
                    type={item.dateConfig?.type}
                    disabled={item.dateConfig?.disabled}
                    size={item.dateConfig?.size}
                    editable={item.dateConfig?.editable}
                    clearable={item.dateConfig?.clearable}
                    start-placeholder={item.dateConfig?.startPlaceholder}
                    end-placeholder={item.dateConfig?.endPlaceholder}
                    format={item.dateConfig?.format}
                    clear-icon={item.dateConfig?.clearIcon}
                    suffix-icon={item.dateConfig?.suffixIcon}
                    disabled-date={item.dateConfig?.disabledDate}
                    v-model={props.data[item.prop]}
                  />
                )}
                {item.type === 'checkbox' && (
                  <el-checkbox-group
                    min={item.checkboxConfig?.min}
                    max={item.checkboxConfig?.max}
                    size={item.checkboxConfig?.size}
                    fill={item.checkboxConfig?.fill}
                    tag={item.checkboxConfig?.tag}
                    disabled={item.checkboxConfig?.disabled}
                    text-color={item.checkboxConfig?.textColor}
                    v-model={props.data[item.prop]}
                  >
                    {item.radioConfig?.options.map((option) => {
                      return (
                        <el-checkbox
                          disabled={item.disabled}
                          key={option.value}
                          label={option.value}
                        >
                          {option.label}
                        </el-checkbox>
                      )
                    })}
                  </el-checkbox-group>
                )}
                {item.type === 'radio' && (
                  <el-radio-group
                    disabled={item.disabled}
                    border={item.radioConfig?.border}
                    text-color={item.radioConfig?.textColor}
                    v-model={props.data[item.prop]}
                  >
                    {item.radioConfig?.options.map((option) => {
                      return (
                        <el-radio disabled={option.disabled} label={option.value}>
                          {option.label}
                        </el-radio>
                      )
                    })}
                  </el-radio-group>
                )}
              </el-form-item>
            )
          })}
        </el-form>
      </div>
    )
  }
})
