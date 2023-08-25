import type { ButtonType } from "element-plus";

/** 表格行数据类型 */
export interface TableData {
  [key: string]: any;
}

/** 表格基础类型配置  */
interface BasicColumn {
  label: string; // 标题
  width?: number | string; // 宽度
  fixed?: string; // 固定位置
  align?: string; // 行排列
  visible?: boolean; // 是否展示
}

/** 表格顶部类型配置  */
export interface TableColumn extends BasicColumn {
  prop: string;
  methods?: string;
  render?: render;
  mode?: string;
  selects?: Select[],
  type?: string;  // date money
  formatter?: Function;
  dict?: string
}

/** 表格顶部自定义函数类型 */
interface render {
  (row: TableData): VNode | JSX.Element
}

/** 表格操作栏类型 */
export interface OptionColumn extends BasicColumn {
  label: string;
  buttons: OptionButton[]
}


/** 表格操作栏子选项类型 */
export interface OptionButton {
  label: string; // 标题
  icon?: string; // icon图标
  type?: ButtonType; // 类型
  method?: Function; // 执行方法
  permission?: string | string[]; // 权限
  disabled?: boolean;
  size?: string;
  popconfirm?: boolean;
  group?: OptionButton[]
}
