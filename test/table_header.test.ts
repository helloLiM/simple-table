import { shallowMount,mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import tableHeader from "../src/components/table_header";
import { nextTick } from 'vue';
import * as _ from 'lodash';
import { DATA, COLUMN } from "../src/static/data"


test("mount component", () => {
  const wrapper:any = shallowMount(tableHeader, {
    props: {
      columns : COLUMN,
      sortParams :  {
        field: '',
        direction: '',
      },
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
  
});

//显示/隐藏排序
test('hidden sort', async () => {
  const wrapper = shallowMount(tableHeader, {
    props: {
      columns : [{
        key: 'id',
        label: 'ID',
        sortable: false,
      }],
      sortParams :  {
        field: '',
        direction: '',
      },
    },
  })
  expect(wrapper.find('.table-header-sort').exists() === false).toBe(true)

  await wrapper.setProps({
    columns : [{
      key: 'id',
      label: 'ID',
      sortable: true,
    }],
  })

  expect(wrapper.find('.table-header-sort').exists() === true).toBe(true)
})

// 点击排序
test('test click sort', async () => {
  const wrapper = shallowMount(tableHeader, {
    props: {
      columns : COLUMN,
      sortParams :  {
        field: '',
        direction: '',
      },
    },
  })
  const sortColumn = wrapper.find('.table-header-sort')
  //升序
  sortColumn.trigger('click')
  await nextTick()
  expect(wrapper.props().sortParams.field === 'id' && wrapper.props().sortParams.direction === 'ASC').toBe(true)
  //升序
  sortColumn.trigger('click')
  await nextTick()
  expect(wrapper.props().sortParams.field === 'id' && wrapper.props().sortParams.direction === 'DESC').toBe(true)
  //恢复无序
  sortColumn.trigger('click')
  await nextTick()
  expect(wrapper.props().sortParams.field === 'id' && wrapper.props().sortParams.direction === '').toBe(true)
})

