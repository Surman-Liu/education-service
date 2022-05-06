class Storage {
    constructor() {
    }
    //设置缓存
    setItem(params) {
        let obj = {
            name: '',
            value: '',
            expires: "",
            startTime: new Date().getTime()//记录何时将值存入缓存，毫秒级
        }
        let options = {};
        //将obj和传进来的params合并
        Object.assign(options, obj, params);
        localStorage.setItem(options.name, JSON.stringify(options));
    }
    //拿到缓存
    getItem(name) {
        let item = localStorage.getItem(name);
        //先将拿到的试着进行json转为对象的形式
        item = JSON.parse(item);
        //如果有startTime的值，说明设置了失效时间
        if (item.expires) {
            let date = new Date().getTime();
            //何时将值取出减去刚存入的时间，与item.expires比较，如果大于就是过期了，如果小于或等于就还没过期
            if (date - item.startTime > item.expires) {
                //缓存过期，清除缓存，返回false
                localStorage.removeItem(name);
                return null;
            } else {
                //缓存未过期，返回值
                let value = item.value;
                try {
                    value = JSON.parse(value);
                } catch (error) {
                    //如果不行就不是json的字符串，就直接返回
                    value = value;
                }
                return value;
            }
        } else {
            //如果没有设置失效时间，直接返回值
            let value = item.value;
            try {
                value = JSON.parse(value);
            } catch (error) {
                //如果不行就不是json的字符串，就直接返回
                value = value;
            }
            return value;
        }
    }
    //移出缓存
    removeItem(name) {
        localStorage.removeItem(name);
    }
    //移出全部缓存
    clear() {
        localStorage.clear();
    }
}

export { Storage }
