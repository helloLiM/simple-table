import { ExtractPropTypes, PropType } from "vue";
import type { Column, sortParams } from "./interface";

//  定义 Props
export const tableProps = {
  test: {
    type: Boolean,
    default: false,
  },

  tableData: {
    type: Array as PropType<Record<string, any>[]>,
    default: []
  },

  columns: {
    type: Array as PropType<Column[]>,
    default: []
  },

  sortParams: {
    type: Object as PropType<sortParams>,
    default: {
      field: '',
      direction: '',
    }
  },

  pageLimit: {
    type: Number,
    default: 10
  },

  pageJump: {
    type: Number,
    default: 1
  },

  showHeader: {
    type: Boolean,
    default: true,
  }
} as const;

export type TableProps = ExtractPropTypes<typeof tableProps>;
