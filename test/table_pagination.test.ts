import { shallowMount,mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import tablePagination from "../src/components/table_pagination";
import { nextTick } from 'vue';
import * as _ from 'lodash';

const data = [
  {
      id: '0',
      name: 'a',
      sex: 'male',
      age: 12,
  }, {
      id: '1',
      name: 'b',
      sex: 'female',
      age: 64,
  }];

// 点击上一页/下一页
test('test click page', async () => {
    const wrapper = shallowMount(tablePagination, {
        props: {
            allData : data,
            pageLimit : 1
          },
    })
  const clickPrev = wrapper.find('.table-pagination_prev')
  const clickNext = wrapper.find('.table-pagination_next')
//   在第一页点击上一页
  clickPrev.trigger('click')
  await nextTick()
  expect(wrapper.html().includes('第 1 页')).toBe(true)
//   点击下一页
  clickNext.trigger('click')
  await nextTick()
  expect(wrapper.html().includes('第 2 页')).toBe(true)
// 在最后一页点下一页
  clickNext.trigger('click')
  await nextTick()
  expect(wrapper.html().includes('第 2 页')).toBe(true)
  // 在第二页点击 上一页
  clickPrev.trigger('click')
  await nextTick()
  expect(wrapper.html().includes('第 1 页')).toBe(true)

})

// 点击跳页
test('test click page', async () => {
  const wrapper = shallowMount(tablePagination, {
      props: {
          allData : data,
          pageLimit : 1,
          pageJump : 2,
      },
  })
  const clickJump = wrapper.find('.table-pagiantion_jump')
  clickJump.trigger('click')
  await nextTick()
  expect(wrapper.html().includes('第 2 页')).toBe(true)
})

// 页码大于总页数时点击跳页
test('test click page', async () => {
  const wrapper = shallowMount(tablePagination, {
      props: {
          allData : data,
          pageLimit : 1,
          pageJump : 5.3,
      },
  })
  const clickJump = wrapper.find('.table-pagiantion_jump')
  clickJump.trigger('click')
  await nextTick()
  expect(wrapper.html().includes('第 2 页')).toBe(true)
})

// 页码小于总页数时点击跳页
test('test click page', async () => {
  const wrapper = shallowMount(tablePagination, {
      props: {
          allData : data,
          pageLimit : 1,
          pageJump : -5,
      },
  })
  const clickJump = wrapper.find('.table-pagiantion_jump')
  clickJump.trigger('click')
  await nextTick()
  expect(wrapper.html().includes('第 1 页')).toBe(true)
})
