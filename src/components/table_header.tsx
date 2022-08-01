import { defineComponent, PropType, ref } from "vue";
import type { Column, sortParams } from "./interface";
import * as _ from 'lodash'
// 排序对应顺序
const DIRECTION_MAP = {
    DESC: "",
    ASC: "DESC"
};

export default defineComponent({
    name: 'TableHeader',
    props: {
        // 列配置
        columns: {
            type: Array as PropType<Column[]>,
            default: () => [],
            required: true
        },

        /** 排序配置 */
        sortParams: {
            type: Object as PropType<sortParams>,
            default: () => {}
        },

        // 改变排序的方法
        changeSort: {
          type: Function,
          default: () => {}
        }
    },

    setup(props) {

      // 先升序后降序再恢复默认顺序
      const setDirect = (direct: string) => {
        return DIRECTION_MAP.hasOwnProperty(direct) ? DIRECTION_MAP[direct] : 'ASC'
      }

      /**
     * 排序功能
     * @param {string} key 要排序的字段
     * @param {string} direction 要排序的方向
     */
      const sortColumn = (key: string, direct: 'ASC' | 'DESC' | '') => {
        // let field = ref(props.sortParams.field)
        // let direction = ref(props.sortParams.direction)
        if (!key) {
          console.warn('the sort field does not exist');
          return;
        }

        // 切换排序字段后，重新从升序开始排
        props.sortParams.direction = (props.sortParams.field !== key) ? 'ASC' : setDirect(direct)
        props.sortParams.field = key
        props.changeSort(props.sortParams.field, props.sortParams.direction);
      };

      return () => (
        <thead class="table-header">
            { props.columns.map((item: Column) => (
            <th key={ item.key }>
                { item.label }
                {
                item.sortable ? (
                    <span class="table-header-sort" onClick={ () => {sortColumn(item.key, props.sortParams.direction)}}>
                    <i class={[
                        "iconfont",
                        "icon-caret-up",
                        "table-header-sort-up",
                        (props.sortParams.direction === 'ASC' && props.sortParams.field === item.key) ? "active" : ""

                    ]} />
                    <i class={[
                        "iconfont",
                        "icon-caret-down",
                        "table-header-sort-down",
                        (props.sortParams.direction === 'DESC' && props.sortParams.field === item.key) ? "active" : ""
                    ]} />
                    </span>
                ) : ''
                }
            </th>
            ))
            }
        </thead>
      )
    }
})