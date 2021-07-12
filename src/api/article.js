//文章相关请求模块


import request from '@/utils/request.js'


// 获取频道新闻列表
export let getArticle = (params) => {
    return request({
        method: 'GET',
        url: `/app/v1_1/articles`,
        params
    })
}