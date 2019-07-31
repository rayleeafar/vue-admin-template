import Login from '../pages/Login';
import Index from '../pages/Index';
import Hello from '../pages/hello/Hello';
import ArbitrageList from '../pages/arbitrage/list';

let routes = [
    // 直接访问跟地址时，跳转到登录页面，引导登录
    {
        path: '/',
        redirect: 'login'
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        // Index页是一个骨架页，所有的后台页面都是Index的子页
        name: 'index',
        path: '/index',
        component: Index,
        children: [
            {
                name:'arbitrageList',
                path:'/arbitrage/list',
                component:ArbitrageList,
                meta:{
                    // 面包屑数据
                    // navBar:['用户管理','用户列表']
                }
            },
            {
                name: 'hello',
                path: '/hello',
                component: Hello,
                meta: {
                    keepAlive: true
                }
            }
        ]
    }
];

export default routes;