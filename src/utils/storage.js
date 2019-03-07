
if(!window.localStorage){
    alert('你的浏览器不支持localStorage');
}
let storage = window.localStorage;

export default{
    get(key){
        return storage[key];
    },
    remove(key){
        storage.removeItem(key);
    },
    set(key,val){
        storage[key] =val;
    }
}