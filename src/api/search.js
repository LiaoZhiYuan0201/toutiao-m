// 搜索相关请求模块

import request from '@/utils/request.js'


// 获取搜索联想建议
export let getSearchSuggestions = (q) => {
    return request({
        method: 'GET',
        url: `/app/v1_0/suggestion`,
        params: {
            q //联想建议关键词
        }
    })
}


// 获取搜索结果
export let getSearchResult = (params) => {
    return request({
        method: 'GET',
        url: `/app/v1_0/search`,
        params
    })
}



// 获取用户搜索历史
export let getSearchHistories = () => {
    return request({
        method: 'GET',
        url: `/app/v1_0/search/histories`,
    })
}