import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router/index'
import { createHead } from '@vueuse/head'
import './assets/index.postcss'
import 'ant-design-vue/dist/antd.css';
import 'tailwindcss/tailwind.css'

const head = createHead()
const app = createApp(App)

app.use(router)
app.use(head)
app.use(Antd)

app.mount('#app')
