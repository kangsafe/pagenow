import axios from 'axios'
import { Message } from 'iview'

// 创建 axios 实例
// 这里 export 的原因是方便组件外使用 axios
export const Axios = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000,
});

// POST传参序列化(添加请求拦截器)
// 在发送请求之前做某件事
Axios.interceptors.request.use(config => {
  // 设置以 form 表单的形式提交参数，如果以 JSON 的形式提交表单，可忽略
  if(config.method  === 'post'){

    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    let ret = '';
    for (let it in config.data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(config.data[it]) + '&'
    }
    config.data = ret;

  }

  if (localStorage.token) {

  }
  return config
},error =>{
  return Promise.reject(error)
});

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(res => {

  //对响应数据做些事
  if(res.data.code == 0){
    Message.error(res.data.msg);
    return Promise.reject(res)
  }
  return res
}, error => {
  if(error.response.status === 401) {
    // 401 说明 token 验证失败
    // 可以直接跳转到登录页面，重新登录获取 token

  } else if (error.response.status === 500) {
    // 服务器错误
    // do something
    return Promise.reject(error.response.data)
  }
  // 返回 response 里的错误信息
  return Promise.reject(error.response.data)
});


// 将 Axios 实例添加到Vue的原型对象上
export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', { value: Axios })
  }
}

