// 频道相关请求模块

import request from '@/utils/request.js'


// 获取所有频道新闻列表
export let getAllChannels = () => {
    return request({
        method: 'GET',
        url: `/app/v1_0/channels`,
    })
}



export let addUserChannel = (data) => {
    return request({
        method: 'PATCH',
        url: `/app/v1_0/user/channels`,
        data
    })
}


// 删除用户指定频道
export let deleteUserChannel = (channelId) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/channels/${channelId}`,
    })
}