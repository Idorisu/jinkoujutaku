import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
import mapInit from 'highcharts/modules/map'

mapInit(Highcharts)
//ここまで

const app = createApp(App)
app.use(HighchartsVue)

app.use(router)

app.mount('#app')
