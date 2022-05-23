import axios from 'axios'
import React from 'react'

// 全局配置
if (process.env.NODE_ENV === 'development'){
    axios.defaults.baseURL = '/api'
} else {
    axios.defaults.baseURL = 'http://localhost:4000'
}


// 响应拦截器
axios.interceptors.response.use(function(response){
    return response.data
})

// 挂载到react原型对象
React.Component.prototype.$http = axios
export default axios