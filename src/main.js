import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { getCategoryApi } from '@/apis/testApi'

const app = createApp(App)

//测试接口函数
getCategoryApi().then(res => {
  console.log(res.result);
})

app.use(createPinia())
app.use(router)

app.mount('#app')
