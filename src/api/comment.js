// 文章评论相关请求模块


import request from '@/utils/request.js'


// 获取评论或评论回复
export let getComments = (params) => {
    return request({
        method: 'GET',
        url: `/app/v1_0/comments`,
        params
    })
}


// 获取评论或评论回复的点赞
export let addCommentLike = (commentId) => {
    return request({
        method: 'POST',
        url: `/app/v1_0/comment/likings`,
        data: {
            target: commentId
        }
    })
}

// 取消评论或评论回复的点赞
export let deleteCommentLike = (commentId) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/comment/likings/${commentId}`,
    })
}


// 添加评论或评论回复
export let addComment = (data) => {
    return request({
        method: 'POST',
        url: `/app/v1_0/comments`,
        data
    })
}