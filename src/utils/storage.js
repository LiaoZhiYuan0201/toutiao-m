// 本地存储封装模块



export let getItem = (name) => {
    let data = window.localStorage.getItem(name)

    // data 可能不是字符串 用 try 测试 
    try {
        // 尝试把data转换为对象
        return JSON.parse(data);
    } catch (error) {
        //json 不是 字符串 原样返回
        return data
    }

}
export let setItem = (name, value) => {
    //如果value 是 对象 就把 value转换为字符串
    if (typeof (value) === 'object') {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(name, value);
}
export let removeItem = (name) => {
    window.localStorage.removeItem(name);
}