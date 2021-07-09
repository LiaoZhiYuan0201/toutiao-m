import Vue from 'vue'
import Vuex from 'vuex'
import {
  getItem,
  setItem,
} from '@/utils/storage.js'


Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    //当前用户登录的状态（token等数据）
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
      //防止页面数据丢失 放在本地存储中， 为了数据持久化
      setItem(USER_KEY, state.user)
    },
  },
  actions: {},
  modules: {}
})