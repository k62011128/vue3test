<template>
  <div class="wrapper">
<!--    <TableSheet :data-source="data" :default-config="defaultConfig"></TableSheet>-->
    <TableSheet :data-source="data"></TableSheet>
<!--        <ey-table-sheet :data-source="data" :default-config="defaultConfig"></ey-table-sheet>-->
<!--        <ey-table-sheet :data-source="data"></ey-table-sheet>-->
  </div>
</template>
<script lang="ts" setup>
import TableSheet from './components/TableSheet.vue'
// import {EyTableSheet} from "kanami-component";
//@ts-ignore
// import EyTableSheet from 'ey-table-sheet'
// import 'ey-table-sheet/dist/ey-table-sheet.css'

// TableSheet.props.defaultConfig.default={
//   buttons:['保存','刷新'],
// }

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
  buttons:['保存','刷新','重置'],
  registerCommands:(spread:any)=>{

  }
}


</script>
<style>
.wrapper{
  height: 500px;
}

</style>
