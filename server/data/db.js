const users = require('./user');
const menus = require('./menu');

let tables = {
    'user': users,
    'menu': menus
};

class Database {
    constructor(tbl) {
        this.table = tables[tbl];
    }

    getById(id) {
        return this.table.filter(x => x.id == id)[0];
    }
    getList() {
        return this.table.filter(x => true);
    }
    remove(id){
        return this.table = this.table.filter(x=>x.id!=id);
    }
    add(obj){
        obj.id = this.table.length;
        this.table.push(obj);
    }
    update(id,obj){
        let entity = this.getById(id);
        if(entity==null)
            throw new Error(`未找到id为${id}的记录`);
        for(entity of this.table){
            if(entity.id==id){
                for(key in obj){
                    entity[key] = obj[key];
                }
            }
        }
    }

}

// 模拟数据库操作
module.exports = {
    users:new Database('user'),
    menus:new Database('menu')
};