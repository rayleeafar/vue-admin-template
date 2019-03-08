const apis = {
    login:'/auth/login',
    logout:'/auth/logout',
    checkToken:'/auth/checktoken',
    userManage:{
        add:'/user/add',
        delete:'/user/remove',
        edit:'/user/update',
        list:'/user/getpagelist'
    },
    menuManager:{
        list:'/menu/list'
    }
    // ...
}

export default apis;