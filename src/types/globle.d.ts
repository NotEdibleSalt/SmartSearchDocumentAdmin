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
  routePath?: string
  children?: IMenuTree[]
}

export interface ITableColumn<T> {
  id: string;
  realWidth: number;
  type: string;
  label: string;
  className: string;
  labelClassName: string;
  property: string;
  prop: string;
  width: string | number;
  minWidth: string | number;
  renderHeader: (data: CI<T>) => VNode;
  sortable: boolean | string;
  sortMethod: (a: T, b: T) => number;
  sortBy: string | ((row: T, index: number) => string) | string[];
  resizable: boolean;
  columnKey: string;
  rawColumnKey: string;
  align: string;
  headerAlign: string;
  showOverflowTooltip?: boolean | TableOverflowTooltipOptions;
  fixed: boolean | string;
  formatter: (row: T, column: TableColumnCtx<T>, cellValue: any, index: number) => VNode | string;
  selectable: (row: T, index: number) => boolean;
  reserveSelection: boolean;
  filterMethod: FilterMethods<T>;
  filteredValue: string[];
  filters: Filters;
  filterPlacement: string;
  filterMultiple: boolean;
  index: number | ((index: number) => number);
  sortOrders: ('ascending' | 'descending' | null)[];
  renderCell: (data: any) => void;
  colSpan: number;
  rowSpan: number;
  children: TableColumnCtx<T>[];
  level: number;
  filterable: boolean | FilterMethods<T> | Filters;
  order: string;
  isColumnGroup: boolean;
  isSubColumn: boolean;
  columns: TableColumnCtx<T>[];
  getColumnIndex: () => number;
  no: number;
  filterOpened?: boolean;
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