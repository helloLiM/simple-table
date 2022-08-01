import { defineComponent, PropType, ref } from "vue";
import type { TabData } from "./interface";
import { TableProps, tableProps } from "./types";
import * as _ from 'lodash'
// 排序对应顺序


export default defineComponent({
    name: 'TablePagination',
    props: {
        // 表格数据
        allData: {
            type: Array as PropType<TabData[]>,
            default: () => [],  
            required: true
        },

         // 页码限制
         pageLimit: {
            type: Number,
            default: 10
        },

        // 改变排序的方法
        changeData: {
          type: Function,
          default: () => {}
        },

        //跳页设置
        pageJump: {
          type: Number,
          default: 1
        },
      
    },

  setup(props) {
    let nowPage = ref<number>(1);
    let inputPage = ref(props.pageJump);

    //分页函数 整理出数据展示的开始与结束index
    const changePage = function(params: number|undefined, type: string) {
        let allPage = Math.ceil(props.allData.length / props.pageLimit);
        params = params ? Math.round(params) : 1;
        if( params <= 0){
            nowPage.value = 1;
            type === 'input' ? inputPage.value = 1 : '';
        }else if(params >= allPage){
            nowPage.value = allPage
            type === 'input' ? inputPage.value = allPage : '';
        }else {
            nowPage.value = params
        }
        inputPage.value = nowPage.value;
        let start = props.pageLimit * (nowPage.value - 1);
        let end = start + props.pageLimit;
        props.changeData(start, end);
    };


      return () => (
        <div class="table-pagination">
          <ul>
            <li class="table-pagination_prev" onClick={() => {changePage(nowPage.value - 1, 'page')}}>上一页</li>

            <li class="table-pagination_next" onClick={() => {changePage(nowPage.value + 1, 'page')}}>下一页</li>
            <li class="table-pagiantion_info">共 { props.allData.length} 条</li>
            <li class="table-pagiantion_info">第 { nowPage.value } 页</li>
            <li class="table-pagiantion_info">共 { Math.ceil(props.allData.length / props.pageLimit) } 页</li>
            <li class="table-pagiantion_info">
              <input class="inputPage"  type="number" v-model={inputPage.value}></input>
              <span class="table-pagiantion_jump" onClick={() => {changePage(inputPage.value,'input')}}>跳转</span>
            </li>
          </ul>
        </div >
      )
    }
})