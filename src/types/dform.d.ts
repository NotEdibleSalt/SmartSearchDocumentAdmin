
export interface FormItemI {
  label: string
  prop: string
  type: string
  required?: boolean
  disabled?: boolean
  hidden?: boolean
  rows?: number
  selectConfig?: SelectConfigI
  numberConfig?: NumberConfigI
  dateConfig?: DateConfigI
  checkboxConfig?: CheckboxConfigI
  radioConfig?: RadioConfigI
}

export interface SelectConfigI {

  options: SelectOptionI[]
  multiple?: boolean
  clearable?: boolean
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  defaultFirstOption?: boolean
  clearIcon?: boolean
  suffixIcon?: boolean
  fitInputWidth?: boolean
}

export interface SelectOptionI {

  value: string | number | boolean | object
  label: string | number | boolean | object
  disabled?: boolean
}

export interface NumberConfigI {

  min?: number
  max?: number
  step?: number
  precision?: number
  controls?: boolean
  controlsPosition?: string
}

export interface DateConfigI {

  readonly?: boolean
  disabled?: boolean
  size?: string // large/default/small
  editable?: boolean
  clearable?: boolean
  startPlaceholder?: string
  endPlaceholder?: boolean
  type?: string  // year/month/date/dates/datetime/ week/datetimerange/daterange/ monthrange
  format?: string
  defaultValue?: string
  clearIcon?: boolean
  suffixIcon?: boolean
  disabledDate?: Function
}

export interface CheckboxConfigI {

  min?: number
  max?: number
  disabled?: boolean
  size?: string // large/default/small
  textColor?: string
  fill?: string
  tag?: string
  options: SelectOptionI[]
}

export interface RadioConfigI {

  border?: boolean
  textColor?: string
  options: SelectOptionI[]
}
