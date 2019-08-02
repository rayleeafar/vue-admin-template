import axios from './axios.config';
import storage from '../utils/storage';
// ajax请求封装，返回一个Promise对象。
// 如果请求返回401，自动跳转到登录页
// 如果请求出现错误，自动在页面上展示错误消息
// 如果请求成功，返回后端返回的原始数据
const ajax = function (options) {
    // 结构参数
    let { 
          url, // 请求地址
          params = null, // 请求参数
          type = "GET", // 请求方法
          loading = true, // 是否在请求还没有回来之前展示loading动画
          sendToken = true, // 是否携带token进行请求
          showErr = true // 如果请求出现错误，是否使用this.$message在页面上进行提示
        } = options;
    
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
    // 返回一个Promise对象
    return new Promise((resolve, reject) => {
        // 请求参数
        let requestOptions = {
            method: type,
            url: url,
            data: params,
            headers: {},
            params: {}
        };
        // 如果是get请求，则把传进来的params对象作为queryString的一部分发起请求
        let isGet = type.toLowerCase() === 'get';
        if (isGet) {
            requestOptions.params = params;
        }

        // 是否携带token
        if (sendToken) {
            requestOptions.headers['Authorization'] = 'Bearer '+storage.get('token');
        }

        axios(requestOptions)
            .then(res => {
                // 获得请求响应的时候关闭loading
                if (load) {
                    load.close();
                }
                // 200~400并且相应体中的succ=true表示请求成功
                if (res.status >= 200 && res.status < 400) {
                    resolve(res.data);
                } else {
                    if (showErr) {
                        this.$message({
                            message: res.data.err || "未知错误",
                            type: 'error',
                            duration: 1500,
                            center: true
                        });
                    }
                    this.$router.reload();
                    reject(res.data.err);
                }
            }).catch(err => {
                // 获得请求响应的时候关闭loading
                if (load) {
                    load.close();
                }
                // 401状态码跳转到登录页
                if (err.response.status == 401) {
                    if (showErr) {
                        this.$message({
                            message: '你还没有登录或者登录已过期',
                            type: 'error',
                            duration: 1500,
                            center: true
                        });
                    }
                    // this.$router.go(1);
                    this.$router.push({
                        name: 'login'
                    });
                } else {
                    // 其他的错误 弹出详细的错误原因
                    if (showErr) {
                        this.$message({
                            message: err.response.data.err || "未知错误",
                            type: 'error',
                            duration: 1500,
                            center: true
                        });
                    }
                    reject(err.response.data.err);
                }
            });
    })
}

export default ajax;