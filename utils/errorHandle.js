export const errorHandler = status => {
    switch(status) {
        case -2:
            return '服务器错误'
        case -3:
            return '目标已存在'
        case 1:
            return 
        default:
            return '未知错误'
    }
}