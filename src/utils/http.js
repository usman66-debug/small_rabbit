//axios基础封装
import axios from "axios"
import { useGetUser } from "@/stores/user"
import router from '@/router'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

//axios请求拦截器
httpInstance.interceptors.request.use(
  config => {
    //从pinia中获取token数据
    const getUser = useGetUser()
    const token = getUser.userInfo.token
    //根据后端要求拼接token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, e => Promise.reject(e)
)

//axios响应拦截器
httpInstance.interceptors.response.use(
  res => res.data, e => {
    //用户在使用网站时很多地方都会发生错误，所以直接在全局的响应拦截拦截器统一设置错误提示
    ElMessage({
      type: 'warning',
      message: e.response.data.message
    })

    //当401token失效时，清除用户本地数据并且跳转至登录页面
    if (e.response.status === 401) {
      const getUser = useGetUser()
      getUser.clearUser()
      router.push('/login')
    }

    return Promise.reject(e)
  }
)

export default httpInstance
