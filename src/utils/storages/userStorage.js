// 登录用户数据管理
import storage from '../storage';
const TOKEN_KEY='token';
const USER_KEY='userInfo';

class UserStorage{
    constructor(){

    }
    // 获取当前登录用户的stoken
    getToken(){
        return storage.get(TOKEN_KEY)||null;
    }
    // 设置当前登录用户的token
    setToken(token){
        storage.set(TOKEN_KEY,token);
    }
    // 移除当前登录用户的token
    removeToken(){
        storage.remove(TOKEN_KEY);
    }
    // 获取当前登录用户的信息
    getUser(){
        let user =storage.get(USER_KEY);
        return user?JSON.parse(user):null;
    }
    // 设置当前登录用户的信息
    setUser(user){
        if(user){
            storage.set(USER_KEY,JSON.stringify(user));
        }
    }
    // 移除当前登录用户的信息
    removeUser(){
        storage.remove(USER_KEY);
    }
}

export default new UserStorage();