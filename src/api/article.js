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



// 获取文章详情
export let getArticleById = (articleId) => {
    return request({
        method: 'GET',
        url: `/app/v1_0/articles/${articleId}`,
    })
}


//收藏
export let addCollect = (articleId) => {
    return request({
        method: 'POST',
        url: `/app/v1_0/article/collections`,
        data: {
            target: articleId
        }
    })
}
//取消收藏
export let deleteCollect = (articleId) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/collections/${articleId}`,
    })
}

//点赞
export let addLike = (articleId) => {
    return request({
        method: 'POST',
        url: `/app/v1_0/article/likings`,
        data: {
            target: articleId
        }
    })
}
//取消点赞
export let deleteLike = (articleId) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/collections/${articleId}`,
    })
}