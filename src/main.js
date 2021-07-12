import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



//加载vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'

// 全局样式表
import './styles/index.less'

//自动设置REM基准值 
import 'amfe-flexible'

import './utils/dayjs.js'


Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')