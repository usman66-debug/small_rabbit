import { createApp, onMounted } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { componentPlugin } from '@/components/index'

import App from './App.vue'
import router from './router'


//引入初始化样式文件
import '@/styles/common.scss'

import { lazyPlugin } from './directives'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
//注册懒加载插件
app.use(lazyPlugin)
//注册全局组件
app.use(componentPlugin)
app.mount('#app')

