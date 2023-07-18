/**
 * 选项类型
 */
export interface SelectOptionI {
  label: string
  value: string | number
}

export interface IMenuTree {
  key: string
  title: string
  routePath: string
  children?: IMenuTree[]
}
