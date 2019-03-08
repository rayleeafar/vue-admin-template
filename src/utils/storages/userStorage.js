import storage from '../storage';
const TOKEN_KEY='token';
const USER_KEY='userInfo';

class UserStorage{
    constructor(){

    }

    getToken(){
        return storage.get(TOKEN_KEY)||null;
    }
    setToken(token){
        storage.set(TOKEN_KEY,token);
    }
    removeToken(){
        storage.remove(TOKEN_KEY);
    }

    getUser(){
        let user =storage.get(USER_KEY);
        return user?JSON.parse(user):null;
    }

    setUser(user){
        if(user){
            storage.set(USER_KEY,JSON.stringify(user));
        }
    }

    removeUser(){
        storage.remove(USER_KEY);
    }
}

export default new UserStorage();