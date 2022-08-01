/**
 * @file 表格-接口
 */
 export interface Record {
    id: string;
    [field: string] : any;
}

export interface Column {
    key: string
    label: string
    hidden?: boolean,
    sortable?: boolean
  }
export interface TabData {
    id: string;
    [key: string]: any;
}

export interface TableData {
    [index: number]: any
}

export interface sortParams {

    // 排序字段
    field: string;

    // 排序方向（升序、降序、默认排序）
    direction: 'ASC' | 'DESC' | '';
}



