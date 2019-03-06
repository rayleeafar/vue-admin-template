import Axios from 'axios';
const config = process.env;

// 默认axios配置
const cfg = Axios.create({
    baseURL:config.baseUrl,
    withCredentials:true,
    timeout:15*1000
});

// 拦截错误
cfg.interceptors.response.use(res=>{
    return response;
},err=>{
    return Promise.reject(error);
});

export default cfg;