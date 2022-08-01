

<template>
  <SimpleTable
    :table-data="tableList"
    :columns="columns"
    :show-header="true"
    :sortParams="sortParams"
    :pageLimit="pageLimit"
    :pageJump="pageJump">
  </SimpleTable>
</template>

<script lang="ts">

import SimpleTable from "./components/SimpleTable";
import { defineComponent, ref } from "vue";
import { DATA, COLUMN } from "./static/data";
import '../src/assets/icon/iconfont.css'

export default defineComponent({
  name: 'App',
  components: {
    SimpleTable
  },
  setup() {
    const tableList = ref(DATA)
    const columns = ref(COLUMN);
    const sortParams = ref({
      field: '',
      direction: '',
    });
    const pageLimit = ref<number>(10);
    const pageJump = ref<number>(1);

    return {
      tableList,
      columns,
      sortParams,
      pageLimit,
      pageJump,
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
