import date from './dateFilter';

// 返回所有需要注册成全局过滤器的集合，在应用程序启动的时候统一被注册
export default [
    { name: 'date', filter: date }
];