<template>
  <div class="button-wrapper">
    <button v-for="item in buttonArr" class="btn" @click="item.fn" :key="item">{{ item.name }}</button>
  </div>
  <div class="sample-tutorial">
    <gc-spread-sheets
        class="sample-spreadsheets"
        @workbookInitialized="initSpread"
    >
    </gc-spread-sheets>
  </div>
</template>

<script lang="ts" setup>
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css";
import GC from "@grapecity/spread-sheets";
import "@grapecity/spread-sheets-tablesheet";
import '@grapecity/spread-sheets-resources-zh';
import {
  IO
} from "@grapecity/spread-excelio";
import FaverSaver from "file-saver"
//@ts-ignore
import {GcSpreadSheets} from '@grapecity/spread-sheets-vue'
// GC.Spread.Sheets.LicenseKey = "ti.ey.com.cn,445458482469559#B0NN3W88kQ4YnUhR4Y4BXNhZlc65UaNdVRvEXWxsGW4ZkNCBjQvN4d636ZxQjZGJXR7VVT036LPhHdhJzZGZTZVNUViZjbhN6R4skNrFlSyQHVqlzSElmTzZDMtRUdFtSY83UOzNzTa5USYt6bj5kZS5keRlEVUVzdsx4LyVXTtlTNjNlaCBDcBhVSxBDNFlHUhhFdNNzVONEetR4ZJhEauBVW62WeKpXaZ3mYqd4RJJDVyY6RoNDRQFEbXd6aXZGRWNFTNtWVCxGR58WMtVWRyVWei3WaVVWTwp6SkJmZSdFOIdXbrVUTllDc7F7Yv94dal6NZhVRalGdOJiOiMlIsIiN4cjRCJ4MyIiOigkIsAzN5YTO7kjM0IicfJye#4Xfd5nIFVUSWJiOiMkIsICNx8idgAyUKBCZhVmcwNlI0IiTis7W0ICZyBlIsIiMzcTN9ADI6ATMxAjMwIjI0ICdyNkIsIibj9SbvNmL9VmLpRnI0IyctRkIsICuPWOrFWOkZmeicauoviOqSWum8Seg2Sei2+evbWer8SOi2+OuwaeiuWuI0ISYONkIsISO5UTO6QjM8QDO5QTN4QjI0ICZJJCL3V6csFmZ0IiczRmI1pjIs9WQisnOiQkIsISP3c7U9IHbyBnaPhDatlnWrU5Y8gDbntSaOhVSrMjR6ElRz2mMx9WbudjNt3CT9N5TopUS4kDZ0F4dvVkdiBzczYHeRZ7QvlTOVJXcwIEZzcFM4JHOJtSNC3yUg1zd";
GC.Spread.Common.CultureManager.culture("zh-cn");
let spreadVM: any = null
let buttonArr = [
  {
    name: '保存',
    fn: () => {

    }
  }, {
    name: '下载',
    fn: () => {
      let spread = spreadVM;
      let excelIo = new IO();
      let json = spread.toJSON({
        includeBindingSource: true,
        saveAsView: true
      });
      excelIo.save(json, function (blob: any) {
        FaverSaver.saveAs(blob, "export.xlsx");
      }, function (e: any) {
        console.log(e);
      });
    }
  }, {
    name: '重置',
    fn: () => {

    }
  }, {
    name: '刷新',
    fn: () => {

    }
  }, {
    name: '[自定义插槽]',
    fn: () => {

    }
  }
]

function initSpread(spread: any) {
  spreadVM = spread
  spread.suspendPaint();
  spread.clearSheets();
  spread.options.autoFitType = GC.Spread.Sheets.AutoFitType.cellWithHeader;

  let dataManager = spread.dataManager();
  let myTable = dataManager.addTable(
      "myTable",
      {
        remote: {
          read: {
            url: 'https://demodata.grapecity.com/northwind/api/v1/Orders'
          },
        }
      }
  );
  //init a table sheet
  let sheet = spread.addSheetTab(0, "TableSheet1", GC.Spread.Sheets.SheetType.tableSheet);
  // sheet.options.allowAddNew = false; //hide new row

  // let rowActions = GC.Spread.Sheets.TableSheet.BuiltInRowActions;
  // let options = sheet.rowActionOptions();
  // options.push(
  //     rowActions.removeRow,
  //     rowActions.saveRow,
  //     rowActions.resetRow,
  // );
  // sheet.rowActionOptions(options);

  //bind a view to the table sheet
  myTable.fetch().then(function () {
    let view = myTable.addView("myView", [
      {value: "orderId", width: 80},
      {value: "customerId", width: 200, caption: "customer Id"}
    ]);
    sheet.setDataView(view);
  });
  spread.resumePaint();
}

</script>

<style scoped>
.sample-tutorial {
  position: relative;
  height: calc(100% - 30px);
  overflow: hidden;
}

.sample-spreadsheets {
  width: 100%;
  height: 100%;
  overflow: hidden;
  float: left;
}

.button-wrapper {
  height: 20px;
  margin: 5px;
}

.btn {
  margin-right: 5px;
}
</style>
