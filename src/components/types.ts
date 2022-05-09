import { ExtractPropTypes, PropType } from "vue";
import type { Column } from "./interface";

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
  }
} as const;

export type TableProps = ExtractPropTypes<typeof tableProps>;
