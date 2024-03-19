import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import router from './router'
import {zhCn} from "element-plus/es/locale/index";


const app = createApp(App).use(router);
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(ElementPlus);
app.mount('#app')