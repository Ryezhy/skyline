import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import router from './router'
import {zhCn} from "element-plus/es/locale/index";
import store from './store';


const app = createApp(App).use(router);
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(ElementPlus);
app.use(store)
//全局属性
app.mount('#app')