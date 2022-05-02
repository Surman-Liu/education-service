function getDate() {
    let date = new Date();
    //年
    let year = new Date().getFullYear();
    //月份是从0月开始获取的，所以要+1;
    let month = new Date().getMonth() + 1;
    //日
    let day = new Date().getDate();
    //时
    let hour = new Date().getHours();
    //分
    let minute = new Date().getMinutes();
    //秒
    let second = new Date().getSeconds();
    let time = year + '-' + month + '-' + day;
    return time;
}

export { getDate };