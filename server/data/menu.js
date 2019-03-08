let menus = [
    { id: '1', name: '首页', path: '/hello', parentId: 0, order: 1 },
    { id: '2', name: '用户管理', path: '/user', parentId: 0, order: 2 },
    { id: '3', name: '用户列表', path: '/user/list', parentId: 2, order: 3 },
    { id: '4', name: '菜单管理', path: '/menu', parentId: 0, order: 4 },
    { id: '5', name: '菜单列表', path: '/menu/list', parentId: 4, order: 5 },
    { id: '6', name: '一级菜单', path: '/hello', parentId: 0, order: 6 },
    { id: '7', name: '二级菜单', path: '/hello', parentId: 6, order: 7 },
];

module.exports = menus;