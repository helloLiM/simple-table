

<template>
  <!-- <SimpleTable /> -->
  <SimpleTable
    :table-data="tableList"
    :columns="columns">
  </SimpleTable>
</template>

<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import SimpleTable from "./components/SimpleTable";
import { defineComponent, ref } from "vue";
import { DATA } from "./static/data";
import '../src/assets/icon/iconfont.css'

export default defineComponent({
  name: 'App',
  components: {
    SimpleTable
  },
  setup() {
    const tableList = ref(DATA)
    const columns = ref([{
      key: 'id',
      label: 'ID',
      sortable: true,
    },{
      key: 'name',
      label: '名称',
      sortable: true,
    },{
      key: 'sex',
      label: '性别',
    },{
      key: 'age',
      label: '年龄',
      sortable: true,
    }]);

    return {
      tableList,
      columns,
    };
  },
})

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px;
}
</style>
