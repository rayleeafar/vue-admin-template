import Axios from 'axios';
//const config = process.env;

// 默认axios配置
const opt = {
    baseURL: 'http://localhost:8001',//config.baseUrl,
    withCredentials: false,
    timeout: 5000
};
const cfg = Axios.create(opt);

// 拦截错误
cfg.interceptors.response.use(res => {
    return res;
}, err => {
    return Promise.reject(err);
});

export default cfg;