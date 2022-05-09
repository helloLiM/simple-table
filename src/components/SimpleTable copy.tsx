import { defineComponent, reactive, watchEffect, ref } from "vue";
import { TableProps, tableProps } from "./types";
import type { TabCol, TabData } from "./interface";
import * as _ from 'lodash'
import { DATA, COLUMN } from "../static/data";
import './style/table.less'

export default defineComponent({
  name: "SimpleTable",
  props: tableProps,
  emits: ['change-page'],
  setup(props: TableProps, { attrs, emit, slots }) {
    let tableData = ref([]); //目前渲染的表格数据
    let columnData = ref(COLUMN); //目前渲染的表格数据
    let defaultData = ref([]); //目前渲染的表格数据
    let nowPage = ref<number>(1);
    let allPage = ref<number>();
    let inputPage = ref<number>();
    let pageLimit = ref<number>(10);
    let sortParam = ref({
      field: '',
      direction: 'ASC',
    });
    const DIRECTION_MAP = {
      DESC: "",
      ASC: "DESC"
    };

    const sortColumn = (data: Array) => {
      // emit('click-sort', sortParam.value.field, sortParam.value.direction)
      if (!sortParam.value.field) {
        console.warn(`the sort field does not exist`);
        return data;
      }
  
      // 有方向排序
      if (sortParam.value.direction) {
        console.log(`${sortParam.value.direction} by ${sortParam.value.field}`);
        data.sort((a, b) => {
          const prev = a[sortParam.value.field],
            next = b[sortParam.value.field];
          return sortParam.value.direction === "ASC"
            ? prev < next
              ? -1
              : prev > next
              ? 1
              : 0
            : prev > next
            ? -1
            : prev < next
            ? 1
            : 0;
        });
      }
      return data;
    };

    // 排序函数,先升序后降序再恢复默认顺序
    const getDirect = (field: string, direct: string) => {

      const direction =
        direct && DIRECTION_MAP.hasOwnProperty(direct)
          ? DIRECTION_MAP[direct]
          : "ASC";

      sortParam.value.direction =
        sortParam.value.field !== field ? "ASC" : direction;
      sortParam.value.field = field;
    };

    //分页函数
    const changePage = function(params: number) {
      let allPage = Math.ceil(defaultData.value.length / pageLimit.value);
      params = params ? params : 1;
      if( params <= 0){
        nowPage.value = 1
      }else if(params >= allPage){
        nowPage.value = allPage
      }else {
        nowPage.value = params
      }
      let start = pageLimit.value * (nowPage.value - 1);
      tableData.value = defaultData.value.slice(start, start + pageLimit.value);
    };
    
    // 排序监听
    watchEffect(
      () => {
        debugger
        defaultData.value = sortColumn(_.cloneDeep(DATA));
      }
    );

    // 分页监听
    watchEffect(
      () => {
        let start = pageLimit.value * (nowPage.value - 1);
        debugger
        //  return data.slice(start, start + pageParam.value.pageSize);
        tableData.value = defaultData.value.slice(start, start + pageLimit.value);
      }
    );

    return () => (
      <div>
        <table class="table">
          <thead class="table-header">
              {
                columnData.value.map((item: TabCol) => (
                <th key={ item.key }>
                  { item.label }
                  {
                    (
                      <span class="table-header-sort" onClick={ () => {getDirect(item.key, sortParam.value.direction)}}>
                        <i class={[
                          "iconfont",
                          "icon-caret-up",
                          "table-header-sort-up",
                          (sortParam.value.direction === 'ASC' && sortParam.value.field === item.key) ? "active" : ""

                        ]} />
                        <i class={[
                          "iconfont",
                          "icon-caret-down",
                          "table-header-sort-down",
                          (sortParam.value.direction === 'DESC' && sortParam.value.field === item.key) ? "active" : ""
                        ]} />
                      </span>
                    )
                  }
              </th>
                ))
              }
          </thead>
          <tbody class="table-body">
                {
                  tableData.value.map((item: TabData, idx) => {
                    return (
                      <tr class={'tr' + idx} mark={'row' + item.id}>
                        <td>{ item.id }</td>
                        <td>{ item.name }</td>
                        <td>{ item.sex }</td>
                        <td>{ item.age }</td>
                      </tr>
                    )
                  })
                }
          </tbody>
        </table>

        {/* 分页器 */}
        <div class="table-pagination">
          <ul>
            <li class="table-pagination_prev" onClick={() => {changePage(nowPage.value - 1)}}>上一页</li>

            <li class="table-pagination_next" onClick={() => {changePage(nowPage.value + 1)}}>下一页</li>
            <li class="table-pagiantion_info">共 { defaultData.value.length} 条</li>
            <li class="table-pagiantion_info">第 { nowPage.value } 页</li>
            <li class="table-pagiantion_info">共 { Math.ceil(defaultData.value.length / pageLimit.value) } 页</li>
            <li class="table-pagiantion_info"><input class="inputPage"  type="number" v-model={inputPage.value}></input><span onClick={() => {changePage(inputPage.value)}}>跳转</span></li>
          </ul>
        </div >
      </div>
    );
  },
});
