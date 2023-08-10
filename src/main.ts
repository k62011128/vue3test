import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//@ts-ignore
import { GcSpreadSheets, GcWorksheet, GcColumn } from '@grapecity/spread-sheets-vue'
import './assets/main.css'

let app = createApp(App);
app.component('gc-spread-sheets', GcSpreadSheets);
app.component('gc-worksheet', GcWorksheet);
app.component('gc-column', GcColumn);
app.use(store).use(router).mount('#app')
