const db = require('../data/db');

class MenuService{
    constructor(){

    }
    getList(){
        return db.menus.getList();
    }
}

module.exports=new MenuService();