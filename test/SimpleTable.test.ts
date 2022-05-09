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
      columns : COLUMN
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
  
});

// 数据为空
test('empty body', async () => {
  const wrapper:any = shallowMount(SimpleTable, {
    props: {
      tableData : DATA,
      columns : COLUMN
    }
  });
  expect(wrapper.find('.empty-table').exists() === false).toBe(true)
  await wrapper.setProps({
    tableData: [],
  })
  expect(wrapper.find('.empty-table').exists() === true).toBe(true)
})

// 点击排序
test('test click sort', async () => {
  const sortData = DATA.slice(0, 2);
  const copyData = _.cloneDeep(sortData);

  const wrapper = shallowMount(SimpleTable, {
    props: {
      tableData : copyData,
      columns : COLUMN
    },
  })
  const sortColumn = wrapper.find('.table-header-sort')
  const body:any = wrapper.find('.table-body')
  sortColumn.trigger('click')
  await nextTick()

  expect(body.html().includes('<tr class="tr0" mark="row0">')).toBe(true)

  sortColumn.trigger('click')
  await nextTick()

  const body1:any = wrapper.find('.table-body')
  expect(body1.html().includes('<tr class="tr0" mark="row1">')).toBe(true)
})
