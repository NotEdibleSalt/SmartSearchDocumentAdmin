
export interface DictI {
  id: string,
  name: string,
  type: string,
  items: IDictItem[]
}


export interface IDictItem {
  id: string;
  label: string;
  value: string | number | boolean;
}
