
if (!window.localStorage) {
    alert('你的浏览器不支持localStorage，请使用高级浏览器如：Chrome、Firefox进行浏览');
    throw new Error('浏览器版本过低，请升级你的浏览器');
}
// 采用localStorage来存储数据，也可以更改为sessionStorage
let storage = window.localStorage;

// 对外暴露数据操作方法，而不是直接在应用程序中使用localStorage或者sessionStorage
// 这样如果以后需要换成其他的方式来管理数据，只需要在这里更改具体的实现即可
export default {
    get(key) {
        return storage[key];
    },
    remove(key) {
        storage.removeItem(key);
    },
    set(key, val) {
        storage[key] = val;
    }
}