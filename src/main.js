import { createApp } from 'vue'
import App from './App.vue'
// import VueUIPlus from "view-ui-plus"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'
import './styles/index.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Router from "./router/index.js"
const app=createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(Router).use(ElementPlus).mount('#app')
