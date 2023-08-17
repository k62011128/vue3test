import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css'

// import EyTableSheet from 'ey-table-sheet'
import 'ey-table-sheet/dist/ey-table-sheet.css'

// import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css";
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css'

// TableSheet.props.defaultConfig.default={
//     buttons:['保存','刷新'],
//     registerCommands:(spread:any)=>{
//
//     }
// }

let app = createApp(App);

// app.use(EyTableSheet);
// app.component('ey-table-sheet',EyTableSheet);

app.use(store).use(router).mount('#app')
