/**
 * @file 表格-接口
 */
 export interface Record {
    id: string;
    [field: string] : any;
}

export interface TabCol {
    key: string;

    // 表头名称
    label: string;

    // 是否支持排序
    sortable?: boolean;
}


export interface Column {
    key: string
    label: string
    sort?: boolean
  }
export interface TabData {
    id: string;
    name: string;
    sex: string;
    age: number;

    // 是否支持排序
    sortable?: boolean;
}




