
// 整个站点需要用到的接口地址
const apis = {
    // 登录接口
    login: '/auth/login',
    // 注销登录接口
    logout: '/auth/logout',
    // 检查token是否有效接口
    checkToken: '/auth/checktoken',
    // 用户管理接口
    userManage: {
        // 添加用户
        add: '/user/add',
        // 删除用户
        delete: '/user/delete',
        // 编辑用户
        edit: '/user/update',
        // 用户分页列表
        list: '/user/list'
    },
    // 菜单管理接口
    menuManage: {
        list: '/menu/list'
    }
    // ...
}

export default apis;