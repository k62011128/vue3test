import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css'

//@ts-ignore
// import EyTableSheet from 'ey-table-sheet'
// import 'ey-table-sheet/dist/ey-table-sheet.css'

// import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css";
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css'

// import {EyTableSheet} from "kanami-component";
// import kanami from 'kanami-component'
// import 'kanami-component/dist/style.css'
// EyTableSheet.props.defaultConfig.default={
//     buttons:['保存','刷新'],
//     registerCommands:(spread:any)=>{
//
//     }
// }

let app = createApp(App);

// app.use(kanami);
// app.use(eyTableSheet);
// app.component('ey-table-sheet',EyTableSheet);

app.use(store).use(router).mount('#app')
