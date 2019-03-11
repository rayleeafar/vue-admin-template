import Login from '../pages/Login';
import Index from '../pages/Index';
import Hello from '../pages/hello/Hello';

let routes = [

    // 访问登录路径，渲染登录页面
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
        // Index页是一个骨架页，所有的后台页面都应该是Index的子页
        name: 'index',
        path: '/index',
        component: Index,
        children: [
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