const db =require('../data/db');
const uuid =require('uuid/v4');
class AuthService{
    constructor(){

    }
    // 登录
    login(model){
        let {username,password} = model;
        let admin = db.admins.searchOne({username:username,password:password});
        if(admin){
            let token = db.tokens.searchOne({userId:admin.id});
            if(token){
                db.tokens.remove(token.id);
            }
            token = {
                id:db.tokens.length,
                userId:admin.id,
                token:uuid().replace(/\-/g,'')
            };
            db.tokens.add(token);
            return token.token;
        }else{
            throw new Error('用户名或密码错误');
        }
    }
    // 注销登录
    logout(token){
        for(let item of db.tokens.search({token:token})){
            db.tokens.remove(item.id);
        }
    }
    // 验证token
    validateToken(token){
        return db.tokens.searchOne({token:token})!=null;
    }
}

module.exports = new AuthService();