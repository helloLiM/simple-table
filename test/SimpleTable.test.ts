import { shallowMount,mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import SimpleTable from "../src/components/SimpleTable";
import { nextTick } from 'vue';
import * as _ from 'lodash';
import { DATA, COLUMN } from "../src/static/data"

test("mount component", () => {
  const wrapper:any = shallowMount(SimpleTable, {
    props: {
      tableData : DATA,
      columns : COLUMN,
      hideHeader : false,
      sortParams :  {
        field: '',
        direction: '',
      },
      pageLimit: 10
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
  
});

// 隐藏表头
test('test hidden table-header', async () => {
  const wrapper:any = shallowMount(SimpleTable, {
    props: {
      tableData : DATA,
      columns : COLUMN,
      showHeader : true,
      sortParams :  {
        field: '',
        direction: '',
      },
      pageLimit: 10
    },
  });
  expect(wrapper.find('.table-header').exists() === true).toBe(true)
  await wrapper.setProps({
    showHeader : false,
  })
  expect(wrapper.find('.table-header').exists() === false).toBe(true)
})

// 排序,模拟传入排序字段
test('test click sort', async () => {
  const sortData = DATA.slice(0, 2);
  const copyData = _.cloneDeep(sortData);

  const wrapper = shallowMount(SimpleTable, {
    props: {
      tableData : copyData,
      columns : COLUMN,
      showHeader : true,
      sortParams :  {
        field: '',
        direction: '',
      },
      pageLimit: 10
    },
  })
  const body:any = wrapper.find('.table-body')
  await wrapper.setProps({
    sortParams :  {
      field: 'id',
      direction: 'ASC',
    },
  })

  expect(body.html().includes('<tr class="table-tr tr0" mark="row0">')).toBe(true)

  await wrapper.setProps({
    sortParams :  {
      field: 'id',
      direction: 'DESC',
    },
  })

  const body1:any = wrapper.find('.table-body')
  expect(body1.html().includes('<tr class="table-tr tr0" mark="row1">')).toBe(true)
})

// 数据为空
test('empty body', async () => {
  const wrapper:any = shallowMount(SimpleTable, {
    props: {
      tableData : DATA,
      columns : COLUMN,
      hideHeader : false,
      sortParams :  {
        field: '',
        direction: '',
      },
      pageLimit: 10
    },
  });
  expect(wrapper.find('.empty-table').exists() === false).toBe(true)
  await wrapper.setProps({
    tableData: [],
  })
  expect(wrapper.find('.empty-table').exists() === true).toBe(true)
})
