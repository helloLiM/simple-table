import { defineComponent, watchEffect, ref } from "vue";
import { TableProps, tableProps } from "./types";
import type { TabData, Column } from "./interface";
import tableHeader from "./table_header";
import tablePagination from "./table_pagination"
import * as _ from 'lodash'
import './style/table.less'

const ASC = "ASC";
const DESC = "DESC";

export default defineComponent({
  name: "SimpleTable",
  props: tableProps,
  components: {
    tableHeader,
    tablePagination
  },
  setup(props: TableProps) {
    let tableData = ref([]); //单页渲染的表格数据
    let allData = ref([]); //所有的表格数据
    let columnData = ref(_.cloneDeep(props.columns)); //表头数据
    let nowPage = ref<number>(1);

    //排序函数
    const sortColumn = (data: Array) => {
      if (!props.sortParams.field) {
        console.warn(`the sort field does not exist`);
        return data;
      }

      if (props.sortParams.direction) {
        console.log(`${props.sortParams.direction} by ${props.sortParams.field}`);

        data.sort((a, b) => {
          const prev = a[props.sortParams.field],
            next = b[props.sortParams.field];
            if(props.sortParams.direction === ASC) {
              return prev < next ? -1 : prev > next ? 1 : 0
            }else if(props.sortParams.direction === DESC){
              return prev < next ? 1 : prev > next ? -1 : 0
            }
        });
      }
      return data;
    };

    // 排序方式传入
    const getDirect = (field: string, direct: ASC | DESC | '') => {
      props.sortParams.field = field;
      props.sortParams.direction = direct;
    };

    //分页函数  接受分页器传入的数据截取开始与结束index
    const changeData = function(start:number, end:number) {
      tableData.value = allData.value.slice(start, end);
    };
    
    
    // 排序监听
    watchEffect(
      () => {
        allData.value = sortColumn(_.cloneDeep(props.tableData));
      }
    );

    // 分页监听
    watchEffect(
      () => {
        let start = props.pageLimit * (nowPage.value - 1);
        tableData.value = allData.value.slice(start, start + props.pageLimit);
      }
    );

    return () => (
      <div>
        <table class="table">
        { props.showHeader ? (<table-header
          columns={columnData.value}
          sort-params={props.sortParams}
          change-sort={getDirect}
          class="table-header"
          ></table-header>) : ''}
        
          <tbody class="table-body">
                {
                  tableData.value.length ?
                  (
                  tableData.value.map((item: TabData, idx) => (
                    <tr  class={'table-tr'} class={'tr' + idx} mark={'row' + item.id}>
                      {
                        props.columns.map((column: Column) => (
                          <td>
                            {
                              item[column.key]
                            }
                          </td>
                        ))
                      }

                    </tr>
                  ))
                  ) : 
                  (
                    <tr>
                      <td colspan={props.columns.length} class="empty-table">
                        暂无数据
                      </td>
                    </tr>
                  )
                }
          </tbody>
        </table>
        <table-pagination
          allData={allData.value}
          page-limit={props.pageLimit}
          page-jump={props.pageJump}
          change-data={changeData}
        ></table-pagination>
      </div>
    );
  },
});
