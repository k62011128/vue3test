import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css'
import TableSheet from 'ey-table-sheet/src/TableSheet.vue'
// import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css";
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css'
TableSheet.props.defaultConfig.default={
    buttons:['保存','刷新'],
    registerCommands:(spread:any)=>{

    }
}

let app = createApp(App);

app.component('ey-table-sheet', TableSheet);

app.use(store).use(router).mount('#app')
