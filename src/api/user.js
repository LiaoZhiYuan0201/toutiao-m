// 用户请求模块

import request from '@/utils/request.js'
// import store from '@/store/index.js'

// 登录注册

export let login = (data) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}

//发送短信验证码
export let sendSms = (mobile) => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`,
    })
}


//获取用户登录信息
export let getCurrentUser = () => {
    return request({
        method: 'GET',
        url: `/app/v1_0/user`,
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}