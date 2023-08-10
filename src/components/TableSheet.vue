<template>
  <div class="sample-tutorial">
    123
    <gc-spread-sheets
        class="sample-spreadsheets"
        @workbookInitialized="initSpread"
    >
    </gc-spread-sheets>

<!--        <div class="sample-tutorial">-->
<!--          <div id="ss" class="sample-spreadsheets"></div>-->
<!--          <div id="optionContainer" class="optionContainer">-->
<!--          </div>-->
<!--        </div>-->
  </div>
</template>

<script lang="ts" setup>
import {defineComponent, reactive, toRefs} from "vue";
import Vue from "vue";
import "@grapecity/spread-sheets-vue";
import GC from "@grapecity/spread-sheets";
import "@grapecity/spread-sheets-tablesheet";
import '@grapecity/spread-sheets-resources-zh';

// GC.Spread.Sheets.LicenseKey = "ti.ey.com.cn,445458482469559#B0NN3W88kQ4YnUhR4Y4BXNhZlc65UaNdVRvEXWxsGW4ZkNCBjQvN4d636ZxQjZGJXR7VVT036LPhHdhJzZGZTZVNUViZjbhN6R4skNrFlSyQHVqlzSElmTzZDMtRUdFtSY83UOzNzTa5USYt6bj5kZS5keRlEVUVzdsx4LyVXTtlTNjNlaCBDcBhVSxBDNFlHUhhFdNNzVONEetR4ZJhEauBVW62WeKpXaZ3mYqd4RJJDVyY6RoNDRQFEbXd6aXZGRWNFTNtWVCxGR58WMtVWRyVWei3WaVVWTwp6SkJmZSdFOIdXbrVUTllDc7F7Yv94dal6NZhVRalGdOJiOiMlIsIiN4cjRCJ4MyIiOigkIsAzN5YTO7kjM0IicfJye#4Xfd5nIFVUSWJiOiMkIsICNx8idgAyUKBCZhVmcwNlI0IiTis7W0ICZyBlIsIiMzcTN9ADI6ATMxAjMwIjI0ICdyNkIsIibj9SbvNmL9VmLpRnI0IyctRkIsICuPWOrFWOkZmeicauoviOqSWum8Seg2Sei2+evbWer8SOi2+OuwaeiuWuI0ISYONkIsISO5UTO6QjM8QDO5QTN4QjI0ICZJJCL3V6csFmZ0IiczRmI1pjIs9WQisnOiQkIsISP3c7U9IHbyBnaPhDatlnWrU5Y8gDbntSaOhVSrMjR6ElRz2mMx9WbudjNt3CT9N5TopUS4kDZ0F4dvVkdiBzczYHeRZ7QvlTOVJXcwIEZzcFM4JHOJtSNC3yUg1zd";
GC.Spread.Common.CultureManager.culture("zh-cn");


function initSpread(spread: any) {
  spread.suspendPaint();
  spread.clearSheets();
  spread.options.autoFitType = GC.Spread.Sheets.AutoFitType.cellWithHeader;

  //init a data manager
  // var tableName = "Supplier";
  // var baseApiUrl = getBaseApiUrl();
  // var apiUrl = baseApiUrl + "/" + tableName;
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
  sheet.options.allowAddNew = false; //hide new row
  // console.log(sheet)
  //bind a view to the table sheet
  myTable.fetch().then(function () {
    let view = myTable.addView("myView", [
      {value: "Id", width: 80},
      {value: "CompanyName", width: 200, caption: "Company Name"},
      {value: "ContactName", width: 150, caption: "Contact"},
      {value: "ContactTitle", width: 200, caption: "Title"},
      {value: "Address", width: 200},
      {value: "City", width: 150, caption: "City"},
      {value: "State", width: 100, caption: "State"},
      {value: "Region", width: 100, caption: "Region"}
    ]);
    sheet.setDataView(view);
  });
  // console.log(spread)
  // console.log(spread.getSheetTabCount())
  spread.resumePaint();
}

// let spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss") as any, {sheetCount: 0});
// initSpread(spread);
// console.log(spread)
// console.log(spread.getSheetCount())
</script>

<style scoped>
.sample-tutorial {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.sample-spreadsheets {
  width: 100%;
  height: 100%;
  overflow: hidden;
  float: left;
}

body {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
