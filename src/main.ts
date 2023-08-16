import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css'
import TableSheet from 'ey-table-sheet/src/TableSheet.vue'

// TableSheet.props.defaultConfig.default={
//     buttons:['保存','刷新'],
//     registerCommands:(spread:any)=>{
//
//     }
// }

let app = createApp(App);

app.component('table-sheet', TableSheet);

app.use(store).use(router).mount('#app')
