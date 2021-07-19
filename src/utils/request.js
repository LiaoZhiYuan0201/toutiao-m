//请求模块


import axios from 'axios'

import store from '@/store/index.js'

import jsonBig from 'json-bigint'

import {
    Toast
} from 'vant'

import router from '@/router/index.js'

let refreshTokenReq = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn', //基础路径
})


let request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn', //基础路径
    transformResponse: [function (data) {
        try {
            // 如果转换成功则返回转换的数据结果
            return jsonBig.parse(data)
        } catch (err) {
            // 如果转换失败，则包装为统一数据格式并返回
            return {
                data
            }
        }
    }]
})

//请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    let {
        user
    } = store.state
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

//响应拦截器
request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let status = error.response.status;
    if (status === 400) {
        Toast.fail('客户端请求参数异常')
    } else if (status === 401) {
        let {
            user
        } = store.state;
        if (!user || !user.token) {
            return redirectLogin()
        }

        try {
            let {
                data
            } = await refreshTokenReq({
                method: 'PUT',
                url: '/app/v1_0/authorizations',
                headers: {
                    Authorization: `Bearer ${user.refresh_token}`
                }
            })
            user.token = data.data.token
            store.commit('setUser', user)
            return request(error.config)
        } catch (error) {
            redirectLogin()
        }
    } else if (status === 403) {
        Toast.fail('没有权限操作')
    } else if (status >= 500) {
        Toast.fail('服务器端异常，请稍后重试')
    }

    return Promise.reject(error);
});




function redirectLogin() {
    router.replace({
        name: 'login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}

export default request