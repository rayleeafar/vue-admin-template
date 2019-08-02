import Axios from 'axios';
//const config = process.env;

// 默认axios配置
const opt = {
    // baseURL: 'http://vscode.awayfar.top:8006',//config.baseUrl,
    baseURL: 'http://raylee.5166.info:8006',//config.baseUrl,
    withCredentials: false,
    timeout: 5000
};
const cfg = Axios.create(opt);
export default cfg;