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
import FileSaver from "file-saver"
//@ts-ignore
import {GcSpreadSheets} from '@grapecity/spread-sheets-vue'

GC.Spread.Common.CultureManager.culture("zh-cn");

interface Props {
  tableSheetName?: string;
  addTableParam?: any;
  addViewParam?: any;
  buttons?: any;
  RowButtons?: any;
}

interface dataSource {
  dataSource?: Props;
}

const prop = defineProps({
  dataSource: {
    default: {} as any
  },
  defaultConfig: {
    default: {} as any
  }
})
if (!prop.dataSource.tableSheetName) {
  prop.dataSource.tableSheetName = 'TableSheet1'
}
if (!prop.dataSource.addTableParam) {
  prop.dataSource.addTableParam = {
    remote: {
      read: {
        url: ''
      },
    }
  }
}
if (!prop.dataSource.addViewParam) {
  prop.dataSource.addViewParam = []
}


let spreadVM: any = null
let buttonArr = [
  {
    name: '保存',
    fn: () => {
      // spreadVM.suspendPaint()
      spreadVM.commandManager().SaveAll.execute(spreadVM, { sheetName: prop.dataSource.tableSheetName });
      // spreadVM.resumePaint()
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
        FileSaver.saveAs(blob, `${prop.dataSource.tableSheetName}.xlsx`);
      }, function (e: any) {
        console.log(e);
      });
    }
  }, {
    name: '重置',
    fn: () => {
      spreadVM.suspendPaint()
      let sheetTab=spreadVM.getSheetTab(0)
      let rc=sheetTab.getRowCount()
      for(let i=0;i<rc;i++){
        sheetTab.resetRow(i)
      }
      spreadVM.resumePaint()
    }
  }, {
    name: '刷新',
    fn: () => {
      initSpread(spreadVM)
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
  spread.clearSheetTabs()
  spread.options.autoFitType = GC.Spread.Sheets.AutoFitType.cellWithHeader;

  let dataManager = spread.dataManager();
  let myTable = dataManager.addTable(
      "myTable",
      prop.dataSource.addTableParam
  );
  //init a table sheet
  let sheet = spread.addSheetTab(0, prop.dataSource.tableSheetName, GC.Spread.Sheets.SheetType.tableSheet);
  // sheet.options.allowAddNew = false; //hide new row

  let rowActions = GC.Spread.Sheets.TableSheet.BuiltInRowActions;
  let options = sheet.rowActionOptions();
  options.push(
      rowActions.removeRow,
      // rowActions.saveRow,
      rowActions.resetRow
  );
  sheet.rowActionOptions(options);

  //bind a view to the table sheet
  myTable.fetch().then(function () {
    let view = myTable.addView("myView", prop.dataSource.addViewParam);
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
