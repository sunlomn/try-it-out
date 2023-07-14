<script >

import MyChart from './components/mychart.vue'
import ExcelToChart from './components/ExcelToChart.vue';
export default{
components:{
  MyChart,
  ExcelToChart,
}
}
</script>
<template>
<div class="common-layout">
    <div class="layout-container">
      <el-header class="layout-header">Header</el-header>
      <el-container class="layout-content">
        <el-aside  class="layout-sidebar">Aside</el-aside>
        <el-main >
          <router-view/>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<style scoped>
.layout-container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.layout-header{
 width: 100%;
  height: 120px;
}
.layout-sidebar
{grid-area: sidebar;
width:10%}
.layout-content{
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>
