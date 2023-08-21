

export interface IMenuTree {
  key: string
  title: string
  routePath?: string
  children?: IMenuTree[]
}

export interface IButton {
  size: useSizeProp,
  disabled: Boolean,
  type: buttonTypes,
  icon: iconPropType,
  loading: Boolean,
  loadingIcon: iconPropType,
  plain: Boolean,
  text: Boolean,
  link: Boolean,
  bg: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean,
  color: String,
  dark: Boolean,
  autoInsertSpace: Boolean,
  tag: string | Component,
}