// 菜单数据管理
import storage from '../storage';
const MENU_KEY='menus';
class MenuStorage{
    constructor(){

    }
    // 获取菜单
    get(){
        let menus = storage.get(MENU_KEY);
        return menus?JSON.parse(menus):[];
    }
    // 设置菜单列表
    set(menus){
        if(menus){
            storage.set(MENU_KEY,JSON.stringify(menus));
        }
    }
    // 移除菜单列表
    remove(){
        storage.remove(MENU_KEY);
    }
}

export default new MenuStorage();