import storage from '../storage';
const MENU_KEY='menus';
class MenuStorage{
    constructor(){

    }

    get(){
        let menus = storage.get(MENU_KEY);
        return menus?JSON.parse(menus):[];
    }
    set(menus){
        if(menus){
            storage.set(MENU_KEY,JSON.stringify(menus));
        }
    }
    remove(){
        storage.remove(MENU_KEY);
    }
}

export default new MenuStorage();