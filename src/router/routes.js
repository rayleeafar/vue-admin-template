import Login from '../pages/Login';
import Index from '../pages/Index';
import Hello from '../pages/hello/Hello';

let routes = [
    // 直接访问根目录，渲染登录页面
    {
        name: '/',
        path: '/Login',
        component: Login
    },
    // 访问登录路径，渲染登录页面
    {
        name: 'Login',
        path: '/Login',
        component: Login
    },
    {
        // Index页是一个骨架页，所有的后台页面都应该是Index的子页
        name: 'Index',
        path: '/Index',
        component: Index,
        children: [
            {
                name: 'Hello',
                path: '/',
                component: Hello
            }
        ]
    }
];

export default routes;