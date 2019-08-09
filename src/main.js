import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

// AntV
// import AntDesignVue from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'

// iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';

// 引入Echart4.x组件
import echarts from 'echarts'

// 自动扫描组件
import './components/index.js'

// Axios封装类
import AxiosPlugin from './utils/AxiosPlugin'

// 全局工具类
import PnUtil from './utils/PnUtil'
import PnDict from './utils/PnDict'

import PnApi from './api/PnApi'


// 引入自定义指令



// Vue.use(AntDesignVue);
Vue.use(iView, {

});
Vue.use(AxiosPlugin);

Vue.config.productionTip = false;


// 注册全局变量
Vue.prototype.$PnUtil = PnUtil;
Vue.prototype.$PnDict = PnDict;
Vue.prototype.$PnApi = PnApi;
Vue.prototype.$Echarts = echarts;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
