<template>
<!--  <nav>-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </nav>-->
<!--  <router-view/>-->
  <div class="wrapper">
    <TableSheet :data-source="data" :default-config="defaultConfig"></TableSheet>
<!--        <table-sheet :data-source="data"></table-sheet>-->
  </div>
</template>
<script lang="ts" setup>
import TableSheet from './components/TableSheet.vue'

let data={
  tableSheetName:'myTableName',
  addTableParam:{
    remote: {
      read: {
        url: 'https://demodata.grapecity.com/northwind/api/v1/Orders'
      },
    }
  },
  addViewParam:[
    {value: "orderId", width: 80},
    {value: "customerId", width: 200, caption: "customer Id"}
  ],
  buttons:[{
    name:'test',
    fn:(spread:any)=>{
      console.log('test',spread.getSheetTabCount())
    }
  }],
  RowButtons:[]
}
let defaultConfig={
  // buttons:['保存','刷新'],
  registerCommands:(spread:any)=>{

  }
}


</script>
<style>
.wrapper{
  height: 500px;
}

</style>
