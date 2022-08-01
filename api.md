## API设计

### 表格demo
```
<template>
  <SimpleTable
    :table-data="tableList"
    :columns="columns"
	:show-header="true"
	:show-check="false"	
	:show-page="true"	
	:empty-text="'暂无数据'"
	height="200">
  </SimpleTable>
</template>

<script lang="ts">

export default defineComponent({
  name: 'App',
  components: {
    SimpleTable
  },
  setup() {
    const tableList = ref([{
        id: '0',
        name: 'a',
        sex: 'male',
        age: 12,
    }, {
        id: '1',
        name: 'b',
        sex: 'female',
        age: 64,
    }, {
        id: '2',
        name: 'c',
        sex: 'male',
        age: 5,
    }, {
        id: '3',
        name: 'd',
        sex: 'female',
        age: 21,
    }, {
        id: '4',
        name: 'e',
        sex: 'female',
        age: 75,
    }])
    const columns = ref([{
      key: 'id',
      label: 'ID',
      sortable: true,
      hidden: true
    },{
      key: 'name',
      label: '名称',
      sortable: true,
      hidden: false
    },{
      key: 'sex',
      label: '性别',
      hidden: false
    },{
      key: 'age',
      label: '年龄',
      sortable: true,
      hidden: false
    }]);

    return {
      tableList,
      columns,
    };
  },
})

</script>
```

### Table Attributes

|  参数  | 说明  |  类型 |  可选值 |  默认值 |
|  :----:  | ----  | ----  | :----: |  ----  | 
| columns  | 表头数据 | Array | - | - |
| table-data  | 表体数据 | Array | - | - |
| show-header  | 是否显示表头 | Boolean | true/false | true |
| show-check  | 是否显示check按钮 | Boolean | true/false | false |
| show-page  | 是否显示分页器 | Boolean | true/false | true |
| empty-text  | 空数据时的文案提示 | String | - | 暂无数据 |
| height  | 表格高度 | Number/String | - | 200 |




### Table Methods

|  方法名  | 说明  |  参数 |
|  :----:  | ----  | ----  |
| getTableData  | 获取表格所有数据 | - |
| getSelectRow  | 获取表格已选中行的数据 | - |
| getCurPage | 获取当前所在页 | - |
| getAllPage | 获取所有页 | - | 
| getPageSize | 获取当前页数据容量 | - |
| getSort | 获取现有的排序方法与正在排序的列 | - |




### columns Attributes

|  参数  | 说明  |  类型 |  可选值 |  默认值 |
|  :----:  | ----  | ----  | :----: |  ----  | 
| name  | 表头名称 | String | - | - |
| key | 表头键值 | String/Number | - | - |
| sort-able | 是否可排序 | Boolean | true/false | true |
| hidden | 是否隐藏 | Boolean | true/false | false |
| click-able | 该行表体数据是否可点击外发事件 | Boolean | true/false | false |























