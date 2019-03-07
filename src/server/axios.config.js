import Axios from 'axios';
//const config = process.env;

// 默认axios配置
const opt ={
    baseURL:'http://localhost:8001/',//config.baseUrl,
    withCredentials:false,
    timeout:15*1000
};
const cfg = Axios.create(opt);

// 拦截错误
cfg.interceptors.response.use(res=>{
    return Promise.resolve(res);
},err=>{
    return Promise.reject(error);
});

export default cfg;