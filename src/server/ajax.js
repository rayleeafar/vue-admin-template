import axios from './axios.config';
import storage from '../utils/storage';

const ajax = function (options) {
    // 结构参数
    let { url, params = null, type = "GET", loading = true, sendToken = true } = options;

    // loading句柄
    let load = null;
    // 是否遮罩显示loading
    if (loading) {
        load = this.$loading({
            lock: true,
            text: 'Loading',
            background: 'rgba(0,0,0,0.7)'
        });
    }

    return new Promise((resolve, reject) => {
        // 请求参数
        let requestOptions = {
            method: type,
            url: url,
            data: params,
            headers: {},
            params: {}
        };
        if (type.toLowerCase === 'get') {
            requestOptions.params = params;
        }
        // 是否携带token
        if (sendToken) {
            requestOptions.headers['x-token'] = storage.get('token');
        }
        axios(requestOptions)
            .then(res => {
                // 获得请求响应的时候关闭loading
                if (load) {
                    load.close();
                }
                // 200~400并且相应体中的succ=true表示请求成功
                if (res.status >= 200 && res.status < 400 && res.data.succ) {
                    resolve(res.data);
                } else {
                    this.$message({
                        message: res.data.err || "未知错误",
                        type: 'warning',
                        duration: 1500
                    });
                    reject(res.data);
                }
            }).catch(err => {
                // 获得请求响应的时候关闭loading
                if (load) {
                    load.close();
                }
                // 401状态码跳转到登录页
                if (err.status === 401) {
                    this.$message({
                        message: '你还没有登录或者登录已过期',
                        type: 'error',
                        duration: 1500
                    });
                    this.$router.push({
                        name: 'Login'
                    });
                } else {
                    // 其他的错误 弹出详细的错误原因
                    this.$message({
                        message: err.data || "未知错误",
                        type: 'warning',
                        duration: 1500
                    });
                }
                reject(err);
            });
    })
}

export default ajax;