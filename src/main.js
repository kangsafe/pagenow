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

import 'animate.css'

// 引入全局样式表
import './assets/css/pnStyle.css'

// JQuery
import $ from 'jquery'
require('webpack-jquery-ui');
require('webpack-jquery-ui/css');

// 引入Echart4.x组件
import echarts from 'echarts'

// 引入UEditor组件
import VueUeditorWrap from 'vue-ueditor-wrap'

// 引入代码编辑器相关依赖库（注意，这段引入不能写在 import './components/index.js' 下面，否则会出现编辑器无法使用的情况）
import ace from 'ace-builds'

// 自动扫描组件
import './components/index.js'

// Axios封装类
import AxiosPlugin from './utils/AxiosPlugin'

// 全局工具类
import PnUtil from './utils/PnUtil'
import PnDict from './utils/PnDict'
import PnDesigner from './utils/PnDesigner'
import EventBus from './utils/EventBus'

import PnApi from './api/PnApi'


// 引入自定义指令
import './directives/directives'

// Vue.use(AntDesignVue);
Vue.use(iView, {

});
Vue.use(AxiosPlugin);
Vue.use(ace);

Vue.config.productionTip = false;

Vue.component('vue-ueditor-wrap', VueUeditorWrap);

// 注册全局变量
Vue.prototype.$PnUtil = PnUtil;
Vue.prototype.$PnDict = PnDict;
Vue.prototype.$PnDesigner = PnDesigner;
Vue.prototype.$EventBus = EventBus;
Vue.prototype.$PnApi = PnApi;
Vue.prototype.$Echarts = echarts;

// 给数组注册去重插入函数
Array.prototype.pushNoRepeat = function () {
  for(let i=0; i < arguments.length; i++) {
    let ele = arguments[i];
    if(this.indexOf(ele) == -1){
      this.push(ele);
    }
  }
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
