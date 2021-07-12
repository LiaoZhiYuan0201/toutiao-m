// 初始化dayjs配置

import Vue from 'vue'
import dayjs from 'dayjs'

//加载中文语言包

import 'dayjs/locale/zh-cn'


import relativeTime from 'dayjs/plugin/relativeTime'
//配置使用处理相对时间
dayjs.extend(relativeTime)


//配置中文语言包
dayjs.locale('zh-cn')


Vue.filter('relativeTime', value => {
    return dayjs(value).from(dayjs())
})